// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import HomePage from './pages/HomePage';
// import EventDetail from './pages/EventDetail';
// import OrganizerDashboard from './pages/OrganizerDashboard';
// import AdminDashboard from './pages/AdminDashboard';  
// import LoginPage from './pages/LoginPage';
// import AppNavbar from './components/Navbar';

// function App() {
//   return (
//     <div>
//       <AppNavbar />
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/event/:id" element={<EventDetail />} />
//         <Route path="/organizer" element={<OrganizerDashboard />} />
//         <Route path="/admin" element={<AdminDashboard />} /> 
//         <Route path="/login" element={<LoginPage />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;

import React from "react";
import { Routes, Route } from "react-router-dom";
import AppNavbar from "./components/Navbar";

// Temporary inline pages so nothing breaks
function HomePage() {
  return <h1>Home Page</h1>;
}
function EventDetail() {
  return <h1>Event Detail</h1>;
}
function OrganizerDashboard() {
  return <h1>Organizer Dashboard</h1>;
}
function AdminDashboard() {
  return <h1>Admin Dashboard</h1>;
}
function LoginPage() {
  return <h1>Login Page</h1>;
}

function App() {
  return (
    <div>
      <AppNavbar />   {/* Navbar visible on all pages */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/event/:id" element={<EventDetail />} />
        <Route path="/organizer" element={<OrganizerDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
