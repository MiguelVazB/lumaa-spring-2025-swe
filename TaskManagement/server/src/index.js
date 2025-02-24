const express = require("express");
const cors = require("cors");
const { connectDB } = require("./db");
const { Client } = require("pg");
const { createUserTable } = require("./models/User");
const { createTasksTable } = require("./models/Task");
const authRoutes = require("./routes/authRoutes");
const tasksRoutes = require("./routes/tasksRoutes");
const verifyToken = require("./middleware/authMiddleware");
require("dotenv").config();

const app = express();

const port = 3000;

connectDB();

createUserTable();
createTasksTable();

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/tasks", verifyToken, tasksRoutes);

app.listen(port, () => console.log(`App listening on port ${port}!`));
