import { useState } from "react";

interface CreateTaskFormProps {
  setTaskCreated: (created: boolean) => void;
}

const CreateTaskForm: React.FC<CreateTaskFormProps> = ({ setTaskCreated }) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    if (id === "title") {
      setTitle(value);
    } else if (id === "description") {
      setDescription(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + "/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          title,
          description,
        }),
      });
      const data = await response.json();
      setTaskCreated(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        id="title"
        value={title}
        onChange={handleInputChange}
      />
      <textarea
        rows={4}
        cols={30}
        placeholder="Description"
        id="description"
        value={description}
        onChange={handleInputChange}
      />
      <button type="submit">Create Task</button>
    </form>
  );
};

export default CreateTaskForm;
