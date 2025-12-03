import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateTodo = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [todo, setTodo] = useState({
    title: "",
    priority: "Medium",
    category: "Personal",
    status: "Pending",
    dueDate: ""
  });

  
  // Fetch existing todo
  // const fetchTodoById = async () => {
  //   try {
  //     const res = await axios.get(`http://localhost:5159/api/ToDo/${id}`);
  //     if (res.status === 200) {
  //       setTodo(res.data);
  //     }
  //   } catch (err) {
  //     console.error("Error fetching todo:", err);
  //   }
  // };

  const fetchTodoById = async () => {
  try {
    const res = await axios.get(`http://localhost:5159/api/ToDo/${id}`);
    if (res.status === 200) {
      const data = res.data;

      const formattedDate = data.dueDate
        ? new Date(data.dueDate).toISOString().split("T")[0]
        : "";

      setTodo({
        ...data,
        dueDate: formattedDate
      });
    }
  } catch (err) {
    console.error("Error fetching todo:", err);
  }
};


  useEffect(() => {
    fetchTodoById();
  }, []);

  const handleChange = (e) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        `http://localhost:5159/api/ToDo/${id}`,
        todo
      );

      if (res.status === 200) {
        toast.success("Todo updated successfully!");
        navigate("/");
      }
    } catch (err) {
      console.error("Error updating todo:", err);
      alert("Failed to update task");
    }
  };

  return (
    <div style={pageContainer}>
      <div style={formCard}>
        <h2 style={titleStyle}>Update Todo</h2>

        <form onSubmit={handleUpdate}>
          <label style={label}>Title</label>
          <input
            type="text"
            name="title"
            value={todo.title}
            onChange={handleChange}
            required
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

          <label style={label}>Status</label>
          <select
            name="status"
            value={todo.status}
            onChange={handleChange}
            style={input}
          >
            <option>Pending</option>
            <option>Completed</option>
          </select>

          <label style={label}>Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={todo.dueDate?.split("T")[0]}
            onChange={handleChange}
            style={input}
          />

          <div style={buttonRow}>
            <button type="submit" style={btnPrimary}>
              Update Todo
            </button>
           
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateTodo;

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
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "15px"
};

const btnCancel = {
  flex: 1,
  padding: "10px",
  background: "#777",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "15px"
};
