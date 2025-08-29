
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const USERS_KEY = "users";
const CURRENT_USER_KEY = "currentUser";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Hydrate user on refresh
  useEffect(() => {
    try {
      const raw = localStorage.getItem(CURRENT_USER_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch (_) {}
  }, []);

  const loadUsers = () => {
    try {
      return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    } catch {
      return [];
    }
  };

  const saveUsers = (list) => {
    localStorage.setItem(USERS_KEY, JSON.stringify(list));
  };

  const saveCurrentUser = (u) => {
    setUser(u);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(u));
  };

  const register = async (name, email, password, role) => {
    const normalizedEmail = email.trim().toLowerCase();
    const users = loadUsers();
    const exists = users.some((u) => u.email === normalizedEmail);
    if (exists) return { ok: false, message: "Email is already registered." };

    const newUser = { name, email: normalizedEmail, password, role };
    users.push(newUser);
    saveUsers(users);
    return { ok: true, message: "Registered successfully. Please log in." };
  };

  const login = async (email, password, roleSelected) => {
    const normalizedEmail = email.trim().toLowerCase();
    const users = loadUsers();
    const found = users.find((u) => u.email === normalizedEmail);

    if (!found) throw new Error("No account found for this email.");
    if (found.password !== password) throw new Error("Incorrect password.");


    if (roleSelected && roleSelected !== found.role) {
      throw new Error(`Role mismatch. This account is registered as "${found.role}".`);
    }

    const loggedInUser = { name: found.name, email: found.email, role: found.role };
    saveCurrentUser(loggedInUser);
    return loggedInUser;
  };

  const logout = () => {
    localStorage.removeItem(CURRENT_USER_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user,login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
