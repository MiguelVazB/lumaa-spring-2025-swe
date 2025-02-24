const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

const connectDB = async () => {
  try {
    await pool.connect();
    console.log("Connected to the PostgreSQL database");
  } catch (err) {
    console.error("Error connecting to the database", err);
    process.exit(1);
  }
};

module.exports = { connectDB, pool };
