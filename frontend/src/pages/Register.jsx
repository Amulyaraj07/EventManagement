
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setError("");

    const res = await register(name, email, password, role);
    if (res.ok) {
      setMsg(res.message);
      setTimeout(() => navigate("/login"), 1200);
    } else {
      setError(res.message);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "#f7f7f7" }}>
      <div style={{ width: 420, background: "#fff", padding: 24, borderRadius: 12, boxShadow: "0 6px 24px rgba(0,0,0,0.08)" }}>
        <h2 style={{ marginTop: 0, textAlign: "center" }}>Register</h2>

        {msg && (
          <div style={{ background: "#e9fbe9", color: "#0f6b0f", padding: 10, borderRadius: 8, marginBottom: 12 }}>
            {msg}
          </div>
        )}
        {error && (
          <div style={{ background: "#ffe8e8", color: "#b00020", padding: 10, borderRadius: 8, marginBottom: 12 }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #ddd", marginTop: 6, marginBottom: 12 }}
          />

          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #ddd", marginTop: 6, marginBottom: 12 }}
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #ddd", marginTop: 6, marginBottom: 12 }}
          />

          <fieldset style={{ border: "1px solid #eee", borderRadius: 8, padding: 10, marginBottom: 12 }}>
            <legend style={{ padding: "0 6px" }}>Role</legend>
            <label style={{ marginRight: 12 }}>
              <input type="radio" name="role" value="student" checked={role === "student"} onChange={(e) => setRole(e.target.value)} />
              &nbsp;Student
            </label>
            <label style={{ marginRight: 12 }}>
              <input type="radio" name="role" value="organizer" checked={role === "organizer"} onChange={(e) => setRole(e.target.value)} />
              &nbsp;Organizer
            </label>
            <label>
              <input type="radio" name="role" value="admin" checked={role === "admin"} onChange={(e) => setRole(e.target.value)} />
              &nbsp;Admin
            </label>
          </fieldset>

          <button type="submit" style={{ width: "100%", padding: 12, border: "none", borderRadius: 8, background: "#2C3E50", color: "#fff", cursor: "pointer" }}>
            Register
          </button>

          <p style={{ textAlign: "center", marginTop: 12 }}>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
