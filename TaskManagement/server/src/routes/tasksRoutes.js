const express = require("express");

const jwt = require("jsonwebtoken");

const router = express.Router();
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require("../models/Task");

router.get("/", async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.decode(token);
  const userId = decoded.id;
  try {
    const tasks = await getTasks(userId);
    if (tasks === undefined || tasks.length === 0) {
      return res.status(404).json({ message: "No tasks found" });
    }
    res.status(200).json(tasks);
  } catch (err) {
    console.error("Error getting tasks:", err);
    res.status(500).json({ message: "Error getting tasks" });
  }
});

router.post("/", async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.decode(token);
  const userId = decoded.id;
  const { title, description } = req.body;
  try {
    const newTask = await createTask(title, description, userId);
    res.status(201).json(newTask);
  } catch (err) {
    console.error("Error creating task:", err);
    res.status(500).json({ message: "Error creating task" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, isComplete } = req.body;
  try {
    const updatedTask = await updateTask(id, title, description, isComplete);
    res.status(200).json(updatedTask);
  } catch (err) {
    console.error("Error updating task:", err);
    res.status(500).json({ message: "Error updating task" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await deleteTask(id);
    res.status(204).json({ message: "Task deleted" });
  } catch (err) {
    console.error("Error deleting task:", err);
    res.status(500).json({ message: "Error deleting task" });
  }
});

module.exports = router;
