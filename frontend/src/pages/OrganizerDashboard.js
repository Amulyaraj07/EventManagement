// src/pages/organizer/OrganizerDashboard.jsx
import React, { useState } from "react";
import "./OrganizerDashboard.css";

function OrganizerDashboard() {
  const [events, setEvents] = useState([
    {
      id: 1,
      name: "Tech Fest 2025",
      date: "2025-09-15",
      description: "Annual Tech Fest with workshops, hackathons, and keynote talks.",
      registrations: [
        { id: 101, name: "Alice", email: "alice@gmail.com", status: "Pending" },
        { id: 102, name: "Bob", email: "bob@gmail.com", status: "Pending" },
      ],
    },
    {
      id: 2,
      name: "Sports Meet",
      date: "2025-10-05",
      description: "Annual sports meet with competitions across multiple games.",
      registrations: [
        { id: 103, name: "Charlie", email: "charlie@gmail.com", status: "Approved" },
        { id: 104, name: "Diana", email: "diana@gmail.com", status: "Pending" },
      ],
    },
  ]);

  const [selectedEventId, setSelectedEventId] = useState(null);

  const handleDecision = (eventId, studentId, decision) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === eventId
          ? {
              ...event,
              registrations: event.registrations.map((reg) =>
                reg.id === studentId ? { ...reg, status: decision } : reg
              ),
            }
          : event
      )
    );
  };

  const selectedEvent = events.find((e) => e.id === selectedEventId);

  return (
    <div className="organizer-dashboard">
      <h1>Organizer Dashboard</h1>

      {/* Event List */}
      {!selectedEventId && (
        <div className="events-list">
          {events.map((event) => (
            <div
              key={event.id}
              className="event-card"
              onClick={() => setSelectedEventId(event.id)}
            >
              <h2>{event.name}</h2>
              <p><strong>Date:</strong> {event.date}</p>
              <p>{event.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Registrations for selected event */}
      {selectedEventId && selectedEvent && (
        <div className="registrations-section">
          {/* <button className="back-btn" onClick={() => setSelectedEventId(null)}>
            ← Back to Events
          </button> */}

          <h2>{selectedEvent.name} - Registrations</h2>
          {selectedEvent.registrations.length > 0 ? (
            <table className="registration-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {selectedEvent.registrations.map((reg) => (
                  <tr key={reg.id}>
                    <td>{reg.id}</td>
                    <td>{reg.name}</td>
                    <td>{reg.email}</td>
                    <td>{reg.status}</td>
                    <td>
                      {reg.status === "Pending" ? (
                        <>
                          <button
                            className="btn approve"
                            onClick={() => handleDecision(selectedEvent.id, reg.id, "Approved")}
                          >
                            Approve
                          </button>
                          <button
                            className="btn reject"
                            onClick={() => handleDecision(selectedEvent.id, reg.id, "Rejected")}
                          >
                            Reject
                          </button>
                        </>
                      ) : (
                        <em>No Action</em>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No registrations yet.</p>
          )}
        </div>
      )}
      <div id="backBtn">
         <button className="back-btn" onClick={() => setSelectedEventId(null)}>
            ← Back to Events
          </button>
      </div>
    </div>
  );
}

export default OrganizerDashboard;
