
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./EventDetail.css";

function EventDetail() {
  const { id } = useParams();

  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    // Simulate fetch registered events of the student
    const studentRegistrations = [2, 3,4]; // registered event IDs
    if (studentRegistrations.includes(Number(id))) {
      setIsRegistered(true);
    }
  }, [id]);

  // Mock event details
  const event = {
    id,
    name: "Tech Fest 2025",
    date: "2025-09-15",
    description:
      "Join the annual Tech Fest with workshops, hackathons, and keynote talks.",
    registeredCount: 10,
  };

  const handleRegister = () => {
    setIsRegistered(true);
    // TODO: Call API POST /events/:id/register
  };

  return (
    <div className="event-detail">
      <h1>{event.name}</h1>
      <p>
        <strong>Date:</strong> {event.date}
      </p>
      <p>{event.description}</p>
      <p>
        <strong>Currently Registered:</strong> {event.registeredCount} students
      </p>

      {isRegistered ? (
        <button className="btn disabled" disabled>
          Already Registered
        </button>
      ) : (
        <button className="btn" onClick={handleRegister}>
          Register
        </button>
      )}
    </div>
  );
}

export default EventDetail;
