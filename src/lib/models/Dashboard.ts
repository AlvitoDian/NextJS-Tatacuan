import pool from "../db";

export async function getDashboard(session) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const viewCountResult = await client.query(
      `
      SELECT COUNT(*) AS total_views
      FROM t_view v
      JOIN m_card c ON v.card_link = c.card_link
      WHERE c.crtby = $1
      `,
      [session.user.usrid]
    );

    const cardCountResult = await client.query(
      `
      SELECT COUNT(*) AS total_cards
      FROM m_card
      WHERE crtby = $1
      `,
      [session.user.usrid]
    );

    const hotCardsResult = await client.query(
      `
      SELECT 
        c.card_link, 
        c.title, 
        COUNT(v.id) AS total_views, 
        TO_CHAR(
          MAX(v.crtdt), 
          'YYYY-MM-DD HH24:MI:SS'
        ) AS last_view 
      FROM 
        m_card c 
        LEFT JOIN t_view v ON c.card_link = v.card_link 
      WHERE 
        c.crtby = $1 
      GROUP BY 
        c.card_link, 
        c.title 
      ORDER BY 
        MAX(v.crtdt) DESC NULLS LAST 
      LIMIT 
        5
      `,
      [session.user.usrid]
    );

    await client.query("COMMIT");

    return {
      total_views: parseInt(viewCountResult.rows[0].total_views, 10),
      total_cards: parseInt(cardCountResult.rows[0].total_cards, 10),
      hot_cards: hotCardsResult.rows.map((row) => ({
        card_link: row.card_link,
        title: row.title,
        total_views: row.total_views,
        last_view: row.last_view,
      })),
    };
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}

export async function getDashboardViewsByMonth(session) {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const client = await pool.connect();
  try {
    const result = await client.query(
      `
      SELECT
        EXTRACT(MONTH FROM v.crtdt) AS month,
        COUNT(*) AS views
      FROM t_view v
      JOIN m_card c ON v.card_link = c.card_link
      WHERE c.crtby = $1
      GROUP BY month
      ORDER BY month
      `,
      [session.user.usrid]
    );

    const monthlyData = Array.from({ length: 12 }, (_, i) => {
      const month = i + 1;
      const row = result.rows.find((r) => parseInt(r.month) === month);
      return {
        name: monthNames[i],
        views: row ? parseInt(row.views, 10) : 0,
      };
    });

    return monthlyData;
  } finally {
    client.release();
  }
}
