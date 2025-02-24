const { pool } = require("../db");

const createTasksTable = async () => {
  const queryTxt = `
        CREATE TABLE IF NOT EXISTS tasks (
            id SERIAL PRIMARY KEY NOT NULL UNIQUE, 
            title VARCHAR(255) NOT NULL,
            description TEXT,
            isComplete BOOLEAN DEFAULT FALSE,
            userId INTEGER NOT NULL,
            FOREIGN KEY (userId) REFERENCES users(id)
        )
    `;
  try {
    await pool.query(queryTxt);
    console.log("Tasks table created successfully");
  } catch (err) {
    console.error("Error creating tasks table", err);
  }
};

const getTasks = async (userId) => {
  const queryTxt = `
        SELECT * FROM tasks WHERE userId = $1
    `;
  try {
    const { rows } = await pool.query(queryTxt, [userId]);
    return rows;
  } catch (err) {
    console.error("Error getting tasks", err);
  }
};

const createTask = async (title, description, userId) => {
  const queryTxt = `
        INSERT INTO tasks (title, description, userId) 
        VALUES ($1, $2, $3)
        RETURNING * 
    `;
  try {
    const { rows } = await pool.query(queryTxt, [title, description, userId]);
    return rows[0];
  } catch (err) {
    console.error("Error creating task", err);
  }
};

const updateTask = async (id, title, description, isComplete) => {
  const queryTxt = `
        UPDATE tasks 
        SET title = $1, description = $2, isComplete = $3
        WHERE id = $4
        RETURNING *
    `;
  try {
    const { rows } = await pool.query(queryTxt, [
      title,
      description,
      isComplete,
      id,
    ]);
    return rows[0];
  } catch (err) {
    console.error("Error updating task", err);
  }
};

const deleteTask = async (id) => {
  const queryTxt = `
        DELETE FROM tasks
        WHERE id = $1
    `;
  try {
    await pool.query(queryTxt, [id]);
  } catch (err) {
    console.error("Error deleting task", err);
  }
};

module.exports = {
  createTasksTable,
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
