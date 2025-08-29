// src/components/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";   // Import external CSS

function AppNavbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div>
        <Link to="/" className="brand">Campus Events</Link>
      </div>

      <div className="links">
      
          {user?.role === "student" && (
          <Link to="/HomePage" className="nav-link">Events</Link>
        )}
   
        {user ? (
          <>
            <span className="user">Hi, {user.name}</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link logout-btn" >Login</Link>
            <Link to="/register" className="nav-link logout-btn">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default AppNavbar;
