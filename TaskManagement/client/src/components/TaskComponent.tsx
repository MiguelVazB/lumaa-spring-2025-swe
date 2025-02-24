import { useState, useEffect } from "react";

interface Task {
  id: number;
  title: string;
  description: string;
  isComplete: boolean;
}

interface TaskComponentProps {
  task: Task;
  fetchTasks: () => void;
}

const TaskComponent: React.FC<TaskComponentProps> = ({ task, fetchTasks }) => {
  const [isComplete, setIsComplete] = useState<boolean>(task.iscomplete);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(task.title);
  const [description, setDescription] = useState<string>(task.description);

  useEffect(() => {
    setIsComplete(task.iscomplete);
    setTitle(task.title);
    setDescription(task.description);
  }, [task]);

  const handleButtonClick = () => {
    const newStatus = !isComplete;
    setIsComplete(newStatus);
    handleTaskCompletion(newStatus);
  };

  const handleTaskCompletion = async (isComplete: boolean) => {
    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL + "/tasks/" + task.id,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            title: task.title,
            description: task.description,
            isComplete: isComplete,
          }),
        }
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleSaveClick = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/tasks/${task.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            title: title,
            description: description,
            isComplete: isComplete,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to update task");

      setIsEditing(false);
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleTaskDelete = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/tasks/${task.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.ok) {
        fetchTasks();
      } else {
        console.error("Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <li className="taskContainer" key={task.id}>
      <button className="completeButton" onClick={handleButtonClick}>
        {isComplete ? "Mark as Incomplete" : "Mark as Complete"}
      </button>
      <div className={`taskDetails ${isComplete ? "taskCompleted" : ""}`}>
        {isEditing ? (
          <>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button onClick={handleSaveClick}>Save</button>
          </>
        ) : (
          <>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
          </>
        )}
      </div>
      <div className="taskActions">
        <button className="editButton" onClick={() => setIsEditing(true)}>
          Edit
        </button>
        <button className="deleteButton" onClick={handleTaskDelete}>
          Delete
        </button>
      </div>
    </li>
  );
};

export default TaskComponent;
