const { pool } = require("../db");

const createUserTable = async () => {
  const queryTxt = `
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY NOT NULL UNIQUE, 
            username VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL
        )
    `;
  try {
    await pool.query(queryTxt);
    console.log("User table created successfully");
  } catch (err) {
    console.error("Error creating user table", err);
  }
};

const createUser = async (username, password) => {
  const checkUserQuery = `
    SELECT * FROM users WHERE username = $1
  `;
  const queryTxt = `
        INSERT INTO users (username, password) 
        VALUES ($1, $2)
        RETURNING * 
    `;
  try {
    // check if username exists
    const { rows: existing } = await pool.query(checkUserQuery, [username]);
    if (existing.length > 0) {
      console.log("User already exists");
      throw new Error("User already exists");
    }

    // create user
    const { rows } = await pool.query(queryTxt, [username, password]);
    return rows[0];
  } catch (err) {
    console.error("Error creating user", err);
  }
};

const getUser = async (username) => {
  const queryTxt = `
        SELECT * FROM users WHERE username = $1
    `;
  try {
    const { rows } = await pool.query(queryTxt, [username]);
    return rows[0];
  } catch (err) {
    console.error("Error getting user", err);
  }
};

module.exports = { createUserTable, createUser, getUser };
