import pool from "../db";

export async function getAllCategory(session) {
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
