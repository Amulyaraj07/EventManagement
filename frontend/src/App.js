import React from "react";
import { Routes, Route } from "react-router-dom";
import AppNavbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import EventDetail from "./pages/EventDetail";
import OrganizerDashboard from "./pages/OrganizerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div>
      <AppNavbar />
      <Routes>
        {/* Public */}
        <Route path="/" element={<HomePage />} />
        <Route path="/event/:id" element={<EventDetail />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Role-Based */}
        <Route
          path="/organizer"
          // element={<ProtectedRoute element={<OrganizerDashboard />} allowedRoles={["organizer"]} />}
            element={<OrganizerDashboard />}
        />
        <Route
          path="/admin"
           element={<AdminDashboard />}
        />
      </Routes>
    </div>
  );
}

export default App;
