import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student"); // role radio
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const user = await login(email, password, role);
      const go = {
        student: "/HomePage",
        organizer: "/organizer",
        admin: "/admin",
      };
      navigate(go[user.role] || "/");
    } catch (err) {
      setError(err.message || "Invalid credentials");
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "#f7f7f7" }}>
      <div style={{ width: 360, background: "#fff", padding: 24, borderRadius: 12, boxShadow: "0 6px 24px rgba(0,0,0,0.08)" }}>
        <h2 style={{ marginTop: 0, textAlign: "center" }}>Login</h2>

        {error && (
          <div style={{ background: "#ffe8e8", color: "#b00020", padding: 10, borderRadius: 8, marginBottom: 12 }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
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
            Login
          </button>

          <p style={{ textAlign: "center", marginTop: 12 }}>
            Don’t have an account? <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
