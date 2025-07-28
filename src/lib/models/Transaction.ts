import pool from "../db";
import { sanitizeInput } from "@/utils/sanitizeInput";

export async function postTransaction(payload) {
  const client = await pool.connect();

  try {
    const { usrid, catid, notes, amount, dcind, date } = payload;

    const prepare_usrid = sanitizeInput(usrid, "number");
    const prepare_catid = sanitizeInput(catid, "number");
    const prepare_notes = sanitizeInput(notes, "string");
    const prepare_amount = sanitizeInput(amount, "number");
    const prepare_dcind = sanitizeInput(dcind, "string");
    const prepare_date = sanitizeInput(date, "string");

    console.log(
      {
        prepare_usrid,
        prepare_catid,
        prepare_notes,
        prepare_amount,
        prepare_dcind,
        prepare_date,
      },
      "blogg"
    );

    const result = await client.query(
      `INSERT INTO t_trans (usrid, catid, notes, amount, dcind, date)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        prepare_usrid,
        prepare_catid,
        prepare_notes,
        prepare_amount,
        prepare_dcind,
        prepare_date,
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
