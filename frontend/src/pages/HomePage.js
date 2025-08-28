// // src/pages/student/HomePage.jsx
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import "./HomePage.css";

// function HomePage() {
//   // Mock data (replace with API later)
//   const [events] = useState([
//     { id: 1, name: "Tech Fest 2025", date: "2025-09-15", registeredCount: 10 },
//     { id: 2, name: "Sports Meet", date: "2025-10-05", registeredCount: 7 },
//     { id: 3, name: "Cultural Night", date: "2025-11-01", registeredCount: 15 },
//   ]);

//   return (
//     <div className="student-home">
//       <h1>Upcoming Events</h1>
//       <div className="event-list">
//         {events.map((event) => (
//           <div key={event.id} className="event-card">
//             <h2>{event.name}</h2>
//             <p>Date: {event.date}</p>
//             <p>Registered: {event.registeredCount} students</p>
//             <Link to={`/event/${event.id}`} className="btn">
//               View Details
//             </Link>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default HomePage;
// src/pages/student/HomePage.jsx
// src/pages/student/HomePage.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

function HomePage({ studentId }) {
  // Mock upcoming events
  const [events, setEvents] = useState([
    { id: 1, name: "Tech Fest 2025", date: "2025-09-15", registeredCount: 10 },
    { id: 2, name: "Sports Meet", date: "2025-10-05", registeredCount: 7 },
    { id: 3, name: "Cultural Night", date: "2025-11-01", registeredCount: 15 },
  ]);

  // Mock registered events for the logged-in student
  const [registeredEvents, setRegisteredEvents] = useState([]);

  useEffect(() => {
    // Simulate fetching registered events for this student
    const studentRegistrations = [
      { id: 2, name: "Sports Meet", date: "2025-10-05", status: "Approved" },
      { id: 3, name: "Cultural Night", date: "2025-11-01", status: "Pending" },
      { id: 3, name: "Cultural Night", date: "2025-11-01", status: "Pending" }
    ];
    setRegisteredEvents(studentRegistrations);
  }, [studentId]);

  const isRegistered = (eventId) => registeredEvents.some((e) => e.id === eventId);
  const getRegistrationStatus = (eventId) => {
    const reg = registeredEvents.find((e) => e.id === eventId);
    return reg ? reg.status : "";
  };

  return (
    <div className="student-home">
      {/* Registered Events */}
      { registeredEvents.length > 0 && (
        <>
          <h1>My Registered Events</h1>
          <div className="event-list">
            {registeredEvents.map((event) => (
              <div key={event.id} className="event-card">
                <h2>{event.name}</h2>
                <p>Date: {event.date}</p>
                <p>
                  Status:{" "}
                  <span className={`status-badge status-${event.status.toLowerCase()}`}>
                    {event.status}
                  </span>
                </p>
                <Link to={`/event/${event.id}`} className="btn">
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Upcoming Events */}
      <h1>Upcoming Events</h1>
      <div className="event-list">
        {events.map((event) => {
          const registered = isRegistered(event.id);
          const status = getRegistrationStatus(event.id);
          return (
            <div key={event.id} className="event-card">
              <h2>{event.name}</h2>
              <p>Date: {event.date}</p>
              <p>Registered: {event.registeredCount} students</p>
              {registered ? (
                <span className={`status-badge status-${status.toLowerCase()}`}>
                  {status}
                </span>
              ) : (
                <Link to={`/event/${event.id}`} className="btn">
                  Register
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HomePage;
