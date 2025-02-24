import { useState, useEffect } from "react";
import CreateTaskForm from "./CreateTaskForm";
import TaskComponent from "./TaskComponent";

interface Task {
  id: number;
  title: string;
  description: string;
  isComplete: boolean;
}

const TasksManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskCreated, setTaskCreated] = useState<boolean>(false);
  const [showCreateTaskForm, setShowCreateTaskForm] = useState<boolean>(false);

  const fetchTasks = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + "/tasks", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    if (taskCreated) {
      fetchTasks();
      setTaskCreated(false);
    }
  }, [taskCreated]);

  return (
    <div className="tasksManager">
      <h1>Tasks</h1>
      {tasks.length > 0 ? (
        <ul className="tasksList">
          {tasks.map((task) => (
            <TaskComponent key={task.id} task={task} fetchTasks={fetchTasks} />
          ))}
        </ul>
      ) : (
        <p>No tasks available</p>
      )}
      <button onClick={() => setShowCreateTaskForm(!showCreateTaskForm)}>
        {showCreateTaskForm ? "Hide" : "Create Task"}
      </button>
      {showCreateTaskForm && <CreateTaskForm setTaskCreated={setTaskCreated} />}
    </div>
  );
};

export default TasksManager;
