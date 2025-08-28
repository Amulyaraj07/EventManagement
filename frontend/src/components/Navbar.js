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
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/" className="nav-link">Events</Link>

        {user?.role === "organizer" && (
          <Link to="/organizer" className="nav-link">Organizer Dashboard</Link>
        )}

        {user?.role === "admin" && (
          <Link to="/admin" className="nav-link">Admin Dashboard</Link>
        )}

        {user ? (
          <>
            <span className="user">Hi, {user.name}</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        ) : (
          <Link to="/login" className="nav-link">Login</Link>
        )}
      </div>
    </nav>
  );
}

export default AppNavbar;
