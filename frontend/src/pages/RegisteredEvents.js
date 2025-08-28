// src/components/RegisteredEvents.jsx
import React from "react";
import EventCard from "./EventCard"; // Use the same EventCard component
import "./HomePage.css";

function RegisteredEvents({ events }) {
  return (
    <div className="registered-events">
      <h2>My Registered Events</h2>
      {events.length > 0 ? (
        <div className="events-list">
          {events.map((event) => (
            <EventCard
              key={event.id}
              name={event.name}
              date={event.date}
              description={event.description}
              footerContent={<p>Status: {event.status || "Registered"}</p>}
            />
          ))}
        </div>
      ) : (
        <p>You have not registered for any events yet.</p>
      )}
    </div>
  );
}

export default RegisteredEvents;
