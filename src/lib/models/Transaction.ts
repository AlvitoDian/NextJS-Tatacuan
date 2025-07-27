import pool from "../db";
import { sanitizeInput } from "@/utils/sanitizeInput";

export async function postTransaction(payload) {
  const client = await pool.connect();

  try {
    const { usrid, catid, notes, amount, dcind, date } = payload;

    const sanitizedPayload = {
      usrid: sanitizeInput(usrid, "number"),
      catid: sanitizeInput(catid, "number"),
      notes: sanitizeInput(notes, "string"),
      amount: sanitizeInput(amount, "number"),
      dcind: sanitizeInput(dcind, "string"),
      date: sanitizeInput(date, "string"),
    };

    const result = await client.query(
      `INSERT INTO t_trans (usrid, catid, notes, amount, dcind, date)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        sanitizedPayload.usrid,
        sanitizedPayload.catid,
        sanitizedPayload.notes,
        sanitizedPayload.amount,
        sanitizedPayload.dcind,
        sanitizedPayload.date,
      ]
    );

    return result.rows[0];
  } catch (error) {
    console.error("Failed to post transaction:", error);
    throw error;
  } finally {
    client.release();
  }
}
