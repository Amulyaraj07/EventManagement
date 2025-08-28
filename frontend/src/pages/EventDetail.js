// src/pages/student/EventDetail.jsx
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./EventDetail.css";

function EventDetail() {
  const { id } = useParams();

  // Mock event details (later fetch from API using id)
  const event = {
    id,
    name: "Tech Fest 2025",
    date: "2025-09-15",
    description:
      "Join the annual Tech Fest with workshops, hackathons, and keynote talks.",
    registeredCount: 10,
  };

  const [isRegistered, setIsRegistered] = useState(false);

  const handleRegister = () => {
    setIsRegistered(true);
    // Later: Call API POST /events/:id/register
  };

  return (
    <div className="event-detail">
      <h1>{event.name}</h1>
      <p><strong>Date:</strong> {event.date}</p>
      <p>{event.description}</p>
      <p><strong>Currently Registered:</strong> {event.registeredCount} students</p>

      {isRegistered ? (
        <button className="btn disabled">Already Registered</button>
      ) : (
        <button className="btn" onClick={handleRegister}>
          Register
        </button>
      )}
    </div>
  );
}

export default EventDetail;
