import { Pool } from "pg";

const pool = new Pool({
  user: process.env.DB_USER as string,
  host: process.env.DB_HOST as string,
  database: process.env.DB_NAME as string,
  password: process.env.DB_PASSWORD as string,
  port: parseInt(process.env.DB_PORT || "5432", 10),
});

export default pool;
