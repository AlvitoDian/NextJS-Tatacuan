import pool from "../db";

export async function getDashboard(session) {
  const client = await pool.connect();

  try {
    const balanceResult = await client.query(
      `SELECT amount FROM t_balance WHERE usrid = $1`,
      [session.user.usrid]
    );

    const balanceRow = balanceResult.rows[0];
    const total_saldo = parseFloat(balanceRow?.amount) || 0;

    const transResult = await client.query(
      `
      SELECT
        SUM(CASE WHEN dcind = 'C' THEN amount ELSE 0 END) AS total_income,
        SUM(CASE WHEN dcind = 'D' THEN amount ELSE 0 END) AS total_expense,
        ABS(SUM(CASE
        WHEN dcind = 'C' AND date_trunc('month', date) = date_trunc('month', CURRENT_DATE) THEN amount
        WHEN dcind = 'D' AND date_trunc('month', date) = date_trunc('month', CURRENT_DATE) THEN -amount
        ELSE 0
      END)) AS this_month_balance
      FROM t_trans
      WHERE usrid = $1
      `,
      [session.user.usrid]
    );

    const row = transResult.rows[0];

    const total_pemasukan = parseFloat(row.total_income) || 0;
    const total_pengeluaran = parseFloat(row.total_expense) || 0;
    const saldo_bulan_ini = parseFloat(row.this_month_balance) || 0;

    return {
      total_saldo,
      total_pemasukan,
      total_pengeluaran,
      saldo_bulan_ini,
    };
  } finally {
    client.release();
  }
}

export async function getTransactionAmountByMonth(session) {
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
        EXTRACT(MONTH FROM date) AS month,
        SUM(CASE WHEN dcind = 'D' THEN amount ELSE 0 END) AS expense,
        SUM(CASE WHEN dcind = 'C' THEN amount ELSE 0 END) AS income
      FROM t_trans
      WHERE usrid = $1
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
        income: row ? parseFloat(row.income) : 0,
        expense: row ? parseFloat(row.expense) : 0,
      };
    });

    return monthlyData;
  } finally {
    client.release();
  }
}

export async function getLatestTransactions(session) {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `
      SELECT
        t.amount,
        t.date,
        t.dcind,
        c.name1 AS category
      FROM t_trans t
      LEFT JOIN m_catgr c ON c.catid = t.catid
      WHERE t.usrid = $1
      ORDER BY t.date DESC
      LIMIT 5
      `,
      [session.user.usrid]
    );

    const now = new Date();

    const rtf = new Intl.RelativeTimeFormat("id", { numeric: "auto" });

    const getRelativeTime = (dateString: string): string => {
      const date = new Date(dateString);
      const diff = (now.getTime() - date.getTime()) / 1000;

      if (diff < 60) {
        return rtf.format(-Math.floor(diff), "second");
      } else if (diff < 3600) {
        return rtf.format(-Math.floor(diff / 60), "minute");
      } else if (diff < 86400) {
        return rtf.format(-Math.floor(diff / 3600), "hour");
      } else if (diff < 604800) {
        return rtf.format(-Math.floor(diff / 86400), "day");
      } else {
        return rtf.format(-Math.floor(diff / 604800), "week");
      }
    };

    const transactions = result.rows.map((row) => {
      const isIncome = row.dcind === "C";
      return {
        category: row.category || "Tanpa Kategori",
        amount: isIncome ? parseFloat(row.amount) : -parseFloat(row.amount),
        time: getRelativeTime(row.date),
        type: row.dcind,
      };
    });

    return transactions;
  } finally {
    client.release();
  }
}
