import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function CreateTodoForm() {
  const navigate = useNavigate();
  const API_URL = "http://localhost:5159/api/ToDo";

  const [todo, setTodo] = useState({
    title: "",
    priority: "Medium",
    category: "Personal",
    dueDate: "",
    status: "Pending",
  });

  function handleChange(e) {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

  if (!todo.title.trim()) {
    toast.error("Title is required!");
    return;
  }

  if (!todo.priority) {
    toast.error("Please select a priority!");
    return;
  }

  if (!todo.category) {
    toast.error("Please select a category!");
    return;
  }

  if (!todo.dueDate) {
    toast.error("Please select a due date!");
    return;
  }

    const payload = {
      title: todo.title,
      priority: todo.priority,
      category: todo.category,
      status: "Pending",
      createdAt: new Date().toISOString(),
      dueDate: todo.dueDate ? new Date(todo.dueDate).toISOString() : null,
    };

    try {
      await axios.post(API_URL, payload);

      toast.success("Todo created successfully!");

      setTimeout(() => {
        navigate("/");
      }, 1200);
    } catch (error) {
      console.error("Error creating todo:", error);

      if (error.response?.status === 400) {
        toast.error("Invalid input. Please check your data.");
      } else {
        toast.error("Failed to create todo. Try again!");
      }
    }
  }

const handleCancel = () => {
  
  setTodo({
    title: "",
    priority: "Medium",
    category: "Personal",
    status: "Pending",
    dueDate: ""
  });

  // navigate("/");
};


  return (
    <div style={pageContainer}>
      <div style={formCard}>
        <h2 style={titleStyle}>Create New Todo</h2>

        <form onSubmit={handleSubmit}>
          <label style={label}>Title</label>
          <input
            type="text"
            name="title"
            value={todo.title}
            onChange={handleChange}
            
            style={input}
          />

          <label style={label}>Priority</label>
          <select
            name="priority"
            value={todo.priority}
            onChange={handleChange}
            style={input}
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>

          <label style={label}>Category</label>
          <select
            name="category"
            value={todo.category}
            onChange={handleChange}
            style={input}
          >
            <option>Work</option>
            <option>Personal</option>
          </select>

          <label style={label}>Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={todo.dueDate}
            onChange={handleChange}
            style={input}
          />

          <div style={buttonRow}>
            <button type="submit" style={btnPrimary}>
              Save Todo
            </button>
            <button type="button" onClick={handleCancel} style={btnCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateTodoForm;

/* ---------- Styles ---------- */
const pageContainer = {
  width: "100%",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #f0f4ff, #dfe9ff)"
};

const formCard = {
  width: "400px",
  padding: "30px",
  background: "white",
  borderRadius: "14px",
  boxShadow: "0 8px 25px rgba(0,0,0,0.15)"
};

const titleStyle = {
  textAlign: "center",
  marginBottom: "20px",
  fontSize: "22px",
  fontWeight: "bold"
};

const label = {
  marginTop: "10px",
  display: "block",
  fontWeight: "bold"
};

const input = {
  width: "100%",
  padding: "10px",
  marginBottom: "15px",
  borderRadius: "6px",
  border: "1px solid #ccc"
};

const buttonRow = {
  display: "flex",
  gap: "10px",
  marginTop: "15px"
};

const btnPrimary = {
  flex: 1,
  padding: "10px",
  background: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: "6px"
};

const btnCancel = {
  flex: 1,
  padding: "10px",
  background: "#777",
  color: "white",
  border: "none",
  borderRadius: "6px"
};
