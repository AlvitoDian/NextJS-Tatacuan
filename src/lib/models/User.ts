import bcrypt from "bcrypt";
import pool from "../db";
import { sanitizeInput } from "@/utils/sanitizeInput";
import { UserUpdatePayload } from "@/types/user";

export async function getAllUsers() {
  const client = await pool.connect();
  try {
    const result = await client.query("SELECT * FROM m_user");
    return result.rows[0];
  } finally {
    client.release();
  }
}

export async function findUserByEmail(email: string) {
  const client = await pool.connect();
  try {
    const result = await client.query(
      "SELECT usrid, email, primg FROM m_user WHERE email = $1",
      [email]
    );
    return result.rows[0];
  } finally {
    client.release();
  }
}

export async function createUser(email: string, password: string) {
  const client = await pool.connect();
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const prepare_email = sanitizeInput(email, "string");
    const prepare_usrpw = sanitizeInput(hashedPassword, "string");

    const result = await client.query(
      "INSERT INTO m_user (email, usrpw) VALUES ($1, $2)",
      [prepare_email, prepare_usrpw]
    );
    return result.rows[0];
  } finally {
    client.release();
  }
}

export async function checkOldPassword(
  data: UserUpdatePayload
): Promise<boolean> {
  const client = await pool.connect();
  try {
    const prepare_usrid = sanitizeInput(data.usrid, "string");

    const result = await client.query(
      "SELECT usrpw FROM m_user WHERE usrid = $1",
      [prepare_usrid]
    );

    if (result.rows.length === 0) {
      return false;
    }

    const hashedPassword = result.rows[0].usrpw;
    const isMatch = await bcrypt.compare(data.curpw, hashedPassword);
    return isMatch;
  } catch (error) {
    console.error("Error checking password:", error);
    return false;
  } finally {
    client.release();
  }
}

export async function updateUser(data: UserUpdatePayload, usrid: string) {
  const client = await pool.connect();
  try {
    const prepare_usrid = sanitizeInput(usrid, "string");
    const prepare_email = sanitizeInput(data.email, "string");
    const prepare_primg = sanitizeInput(data.primg, "string");

    const values = [prepare_email, prepare_primg, prepare_usrid];
    let query = `
      UPDATE m_user 
      SET email = $1, primg = $2
    `;

    if (data.newpw && data.newpw.trim() !== "") {
      const hashedPassword = await bcrypt.hash(data.newpw, 10);
      const prepare_usrpw = sanitizeInput(hashedPassword, "string");
      values.splice(1, 0, prepare_usrpw);
      query = `
        UPDATE m_user 
        SET email = $1, usrpw = $2, primg = $3
      `;
    }

    query += ` WHERE usrid = $${values.length} RETURNING *`;

    const result = await client.query(query, values);
    return result.rows[0];
  } finally {
    client.release();
  }
}

export async function verifyUser(email: string, password: string) {
  const client = await pool.connect();

  try {
    const sanitizedEmail = sanitizeInput(email, "string");
    const sanitizedPassword = sanitizeInput(password, "string");

    const result = await client.query(
      "SELECT usrid, email, usrpw FROM m_user WHERE email = $1",
      [sanitizedEmail]
    );

    const user = result.rows[0];
    if (!user) return null;

    const isMatch = await bcrypt.compare(sanitizedPassword, user.usrpw);
    if (!isMatch) return null;

    delete user.usrpw;

    return user;
  } catch (error) {
    console.error("Login error:", error);
    return null;
  } finally {
    client.release();
  }
}
