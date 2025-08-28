// src/pages/admin/AdminDashboard.jsx
import React, { useState } from "react";
import "./AdminDashboard.css";

function AdminDashboard() {
  // Mock Event Data (replace with API later)
  const [events, setEvents] = useState([
    {
      id: 1,
      name: "Tech Fest 2025",
      date: "2025-09-15",
      students: [
        { id: 101, name: "Alice", email: "alice@gmail.com" },
        { id: 102, name: "Bob", email: "bob@gmail.com" },
      ],
    },
    {
      id: 2,
      name: "Sports Meet",
      date: "2025-10-05",
      students: [{ id: 103, name: "Charlie", email: "charlie@gmail.com" }],
    },
  ]);

  const [newEvent, setNewEvent] = useState({ name: "", date: "" });
  const [editEvent, setEditEvent] = useState(null);

  // For switching tabs
  const [activeTab, setActiveTab] = useState("crud");

  // Add new event
  const handleAddEvent = () => {
    if (!newEvent.name || !newEvent.date) return;
    setEvents([...events, { id: Date.now(), ...newEvent, students: [] }]);
    setNewEvent({ name: "", date: "" });
  };

  // Delete event
  const handleDeleteEvent = (id) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  // Edit event
  const handleEditEvent = (event) => {
    setEditEvent(event);
  };

  // Save edited event
  const handleSaveEdit = () => {
    setEvents(
      events.map((e) => (e.id === editEvent.id ? editEvent : e))
    );
    setEditEvent(null);
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      {/* Navigation Tabs */}
      <div className="tabs">
        <button
          className={activeTab === "crud" ? "active" : ""}
          onClick={() => setActiveTab("crud")}
        >
          Manage Events
        </button>
        <button
          className={activeTab === "view" ? "active" : ""}
          onClick={() => setActiveTab("view")}
        >
          View Registrations
        </button>
      </div>

      {/* CRUD Operations Tab */}
      {activeTab === "crud" && (
        <div className="card">
          <h2>Manage Events</h2>

          {/* Add New Event */}
          <div className="form-group">
            <input
              type="text"
              placeholder="Event Name"
              value={newEvent.name}
              onChange={(e) =>
                setNewEvent({ ...newEvent, name: e.target.value })
              }
            />
            <input
              type="date"
              value={newEvent.date}
              onChange={(e) =>
                setNewEvent({ ...newEvent, date: e.target.value })
              }
            />
            <button className="btn" onClick={handleAddEvent}>
              Add Event
            </button>
          </div>

          {/* Event List Table */}
          <table className="event-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id}>
                  <td>
                    {editEvent?.id === event.id ? (
                      <input
                        type="text"
                        value={editEvent.name}
                        onChange={(e) =>
                          setEditEvent({ ...editEvent, name: e.target.value })
                        }
                      />
                    ) : (
                      event.name
                    )}
                  </td>
                  <td>
                    {editEvent?.id === event.id ? (
                      <input
                        type="date"
                        value={editEvent.date}
                        onChange={(e) =>
                          setEditEvent({ ...editEvent, date: e.target.value })
                        }
                      />
                    ) : (
                      event.date
                    )}
                  </td>
                  <td>
                    {editEvent?.id === event.id ? (
                      <>
                        <button className="btn save" onClick={handleSaveEdit}>
                          Save
                        </button>
                        <button
                          className="btn cancel"
                          onClick={() => setEditEvent(null)}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="btn edit"
                          onClick={() => handleEditEvent(event)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn delete"
                          onClick={() => handleDeleteEvent(event.id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* View Registrations Tab */}
      {activeTab === "view" && (
        <div className="card">
          <h2>Event Registrations</h2>
          {events.map((event) => (
            <div key={event.id} className="event-details">
              <h3>
                {event.name} ({event.date}) —{" "}
                <span className="count">
                  {event.students.length} Registered
                </span>
              </h3>
              {event.students.length > 0 ? (
                <table className="student-table">
                  <thead>
                    <tr>
                      <th>Student ID</th>
                      <th>Name</th>
                      <th>Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {event.students.map((student) => (
                      <tr key={student.id}>
                        <td>{student.id}</td>
                        <td>{student.name}</td>
                        <td>{student.email}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No students registered yet.</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
