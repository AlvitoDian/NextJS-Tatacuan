import { sanitizeInput } from "@/utils/sanitizeInput";
import pool from "../db";

export async function getAllCategory() {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `SELECT 
        * 
        FROM 
      m_catgr
        `,
      []
    );
    return result.rows;
  } finally {
    client.release();
  }
}

export async function getAllCategoryByUser(session) {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `SELECT 
    * 
        FROM 
    m_catgr 
        WHERE 
    usrid = ?
        `,
      [session.user.usrid]
    );
    return result.rows;
  } finally {
    client.release();
  }
}

export async function createCategory(session, name1: string) {
  const client = await pool.connect();
  try {
    const prepare_usrid = sanitizeInput(session.user.usrid, "number");
    const prepare_name1 = sanitizeInput(name1, "string");

    const result = await client.query(
      `INSERT INTO m_catgr (usrid, name1)
       VALUES ($1, $2)
       RETURNING *`,
      [prepare_usrid, prepare_name1]
    );
    return result.rows[0];
  } finally {
    client.release();
  }
}

export async function updateCategory(session, catid: number, name1: string) {
  const client = await pool.connect();
  try {
    const prepare_catid = sanitizeInput(catid, "number");
    const prepare_usrid = sanitizeInput(session.user.usrid, "number");
    const prepare_name1 = sanitizeInput(name1, "string");

    const result = await client.query(
      `UPDATE m_catgr 
       SET name1 = $1 
       WHERE catid = $2 AND usrid = $3
       RETURNING *`,
      [prepare_name1, prepare_catid, prepare_usrid]
    );
    return result.rows[0];
  } finally {
    client.release();
  }
}

export async function deleteCategory(session, catid: number) {
  const client = await pool.connect();
  try {
    const prepare_catid = sanitizeInput(catid, "number");
    const prepare_usrid = sanitizeInput(session.user.usrid, "number");

    const result = await client.query(
      `DELETE FROM m_catgr 
       WHERE catid = $1 AND usrid = $2
       RETURNING *`,
      [prepare_catid, prepare_usrid]
    );
    return result.rows[0];
  } finally {
    client.release();
  }
}
