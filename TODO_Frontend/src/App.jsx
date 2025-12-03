import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import CreateTodo from "./components/CreateTodoForm";
import Navbar from "./components/Navbar";
import Update from "./components/UpdateTodo";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateTodo />} />
        <Route path="/update/:id" element={<Update />} />
        

      </Routes>
    </Router>
  );
}

export default App;
