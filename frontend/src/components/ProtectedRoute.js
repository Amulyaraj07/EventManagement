// // src/components/ProtectedRoute.jsx
// import React from "react";
// import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// function ProtectedRoute({ element, allowedRoles }) {
//   const { user } = useAuth();

//   if (!user) return <Navigate to="/login" replace />;
//   if (!allowedRoles.includes(user.role)) return <Navigate to="/" replace />;

//   return element;
// }

// export default ProtectedRoute;

// import React from "react";
// import { Navigate, Outlet } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// /*
//  This will work for both MOCK and REAL backend
//  No changes needed later – only AuthContext changes.
// */
// export default function ProtectedRoute({ roles }) {
//   const { user } = useAuth();

//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   if (roles && !roles.includes(user.role)) {
//     return <Navigate to="/" replace />;
//   }

//   return <Outlet />;
// }





// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ allowedRoles = [] }) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  if (allowedRoles.length && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}
