import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={navBar}>
      <div style={navContent}>
        
        {/* Left Logo / Title */}
        <Link to="/" style={logoText}>
          Todo App
        </Link>

        {/* Right Side Buttons */}
        <div style={rightMenu}>
          <Link to="/" style={navLink}>Home</Link>
          <Link to="/create" style={createBtn}>
            + Create Todo
          </Link>
        </div>

      </div>
    </nav>
  );
}

// Styles

const navBar = {
  width: "100%",
  position: "fixed",
  top: 0,
  left: 0,
  backgroundColor: "#3f51b5",
  padding: "15px 0",
  color: "white",
  zIndex: 1000,
  boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
};

const navContent = {
  maxWidth: "1200px",
  margin: "0 auto",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 20px"
};

const logoText = {
  fontSize: "24px",
  fontWeight: "bold",
  color: "white",
  textDecoration: "none"
};

const rightMenu = {
  display: "flex",
  alignItems: "center",
  gap: "20px"
};

const navLink = {
  color: "white",
  fontSize: "16px",
  textDecoration: "none",
  cursor: "pointer",
  transition: "0.3s"
};

const createBtn = {
  padding: "8px 16px",
  backgroundColor: "orange",
  color: "white",
  borderRadius: "6px",
  fontWeight: "bold",
  textDecoration: "none",
  cursor: "pointer"
};
