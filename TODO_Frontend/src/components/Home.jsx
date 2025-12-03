import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
  const navigate = useNavigate();
  const API_URL = "http://localhost:5159/api/ToDo";

  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);

  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => {
        setTodos(res.data);
      })
      .catch((err) => {
        console.error("Error fetching todos:", err);
      });
  }, []);

  useEffect(() => {
  fetchTodos();
}, []);



const fetchTodos = async () => {
  try {
    const res = await axios.get("http://localhost:5159/api/ToDo");

    if (res.status === 200) {
      const allTodos = res.data;

      const pendingList = allTodos.filter(t => t.status === "Pending");
      const completedList = allTodos.filter(t => t.status === "Completed");

      setTodos(pendingList);
      setCompletedTodos(completedList);
    }
  } catch (error) {
    console.error("Error fetching todos:", error);
  }
};

const updateTask = (id) => {
  navigate(`/update/${id}`);
};


const markCompleted = async (todo) => {
  try {
    const updatedTodo = {
      title: todo.title,
      priority: todo.priority,
      category: todo.category,
      status: "Completed",
      dueDate: todo.dueDate
    };

    const res = await axios.put(
      `http://localhost:5159/api/ToDo/${todo.id}`,
      updatedTodo
    );

    if (res.status === 200) {

      const newPending = todos.filter((t) => t.id !== todo.id);
      setTodos(newPending);

      const updatedCompleted = { ...todo, status: "Completed" };
      setCompletedTodos([...completedTodos, updatedCompleted]);
    }
  } catch (error) {
    console.error("Error marking completed:", error);
  }
};

  // // DELETE TASK
  // const deleteTask = (id, completed = false) => {
  //   if (!completed) {
  //     setTodos(todos.filter((t) => t.id !== id));
  //   } else {
  //     setCompletedTodos(completedTodos.filter((t) => t.id !== id));
  //   }
  // };

const deleteTask = async (id, completed = false) => {
  try {
    const res = await axios.delete(`http://localhost:5159/api/ToDo/${id}`);

    if (res.status === 200) {
      if (!completed) {
        setTodos(todos.filter(t => t.id !== id));
      } else {
        setCompletedTodos(completedTodos.filter(t => t.id !== id));
      }
    }
  } catch (err) {
    console.error("Error deleting todo:", err);
  }
};


  // FILTER LOGIC
  const filteredTodos = todos.filter((todo) => {
    const matchesSearch =
      todo.title.toLowerCase().includes(search.toLowerCase());

    const matchesPriority =
      priorityFilter === "All" || todo.priority === priorityFilter;

    const matchesCategory =
      categoryFilter === "All" || todo.category === categoryFilter;

    return matchesSearch && matchesPriority && matchesCategory;
  });

  return (
    <div style={{ padding: "40px", fontFamily: "Arial", marginTop: "100px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        Todo Management App
      </h1>

      {/* SEARCH + FILTERS */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginBottom: "30px",
          alignItems: "center",
        }}
      >
        <button
          style={{
            padding: "10px 18px",
            backgroundColor: "orange",
            color: "white",
            fontWeight: "bold",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={() => navigate("/create")}
        >
          + Create Todo
        </button>

        <input
          type="text"
          placeholder="Search todos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "10px",
            width: "250px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />

        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          style={{ padding: "10px", borderRadius: "5px" }}
        >
          <option value="All">All Priority</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          style={{ padding: "10px", borderRadius: "5px" }}
        >
          <option value="All">All Categories</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
        </select>
      </div>

      {/* ACTIVE TASKS TABLE */}
      <h2 style={{ textAlign: "center" }}>Active Tasks</h2>

      <table style={tableStyle}>
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2" }}>
            <th style={th}>Title</th>
            <th style={th}>Priority</th>
            <th style={th}>Category</th>
            <th style={th}>Due Date</th>
            <th style={th}>Status</th>
            <th style={th}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredTodos.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>
                No active todos found
              </td>
            </tr>
          ) : (
            filteredTodos.map((todo) => (
              <tr key={todo.id}>
                <td style={td}>{todo.title}</td>
                <td style={td}>{todo.priority}</td>
                <td style={td}>{todo.category}</td>
                {/* <td style={td}>{todo.dueDate}</td> */}
                <td style={td}>
  {new Date(todo.dueDate).toLocaleDateString("en-GB")}
</td>
                {/* <td style={td}>{new Date().toLocaleDateString()}</td> */}
                <td style={td}>{todo.status}</td>
                <td style={td}>
                  <button
                    onClick={() => markCompleted(todo)}
                    style={btnGreen}
                  >
                    Completed
                  </button>

                  <button
                    onClick={() => deleteTask(todo.id, false)}
                    style={btnRed}
                  >
                    Delete
                  </button>

                    <button
                    onClick={() => updateTask(todo.id)}
                    style={btnOrange}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* COMPLETED TASKS TABLE */}
      <h2 style={{ textAlign: "center", marginTop: "50px" }}>
        Completed Tasks
      </h2>

      <table style={tableStyle}>
        <thead>
          <tr style={{ backgroundColor: "#e6ffe6" }}>
            <th style={th}>Title</th>
            <th style={th}>Priority</th>
            <th style={th}>Category</th>
            {/* <th style={th}>Completed On</th> */}
            <th style={th}>Status</th>
            <th style={th}>Action</th>
          </tr>
        </thead>

        <tbody>
          {completedTodos.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>
                No completed tasks yet
              </td>
            </tr>
          ) : (
            completedTodos.map((todo) => (
              <tr key={todo.id}>
                <td style={td}>{todo.title}</td>
                <td style={td}>{todo.priority}</td>
                <td style={td}>{todo.category}</td>
                {/* <td style={td}>{new Date().toLocaleDateString()}</td> */}
                <td style={td}>Completed</td>

                <td style={td}>
                  <button
                    onClick={() => deleteTask(todo.id, true)}
                    style={btnRed}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

// STYLES
const tableStyle = {
  width: "90%",
  margin: "20px auto",
  borderCollapse: "collapse",
};

const th = {
  padding: "12px",
  border: "1px solid #ddd",
  textAlign: "left",
};

const td = {
  padding: "10px",
  border: "1px solid #ddd",
};

const btnGreen = {
  backgroundColor: "green",
  padding: "6px 12px",
  color: "white",
  marginRight: "10px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

const btnRed = {
  backgroundColor: "red",
  padding: "6px 12px",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

const btnOrange = {
    backgroundColor: "orange",
  padding: "6px 12px",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  marginLeft: "10px",
};

export default Home;
