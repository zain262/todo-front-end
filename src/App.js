import React, { useState, createContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import AdminRegister from "./Pages/AdminRegister";

export const RoleContext = createContext();

function App() {
  const [role, setRole] = useState(null);

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/dashboard"
            element={role ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/admin"
            element={
              role === "admin" ? <AdminRegister /> : <Navigate to="/login" />
            }
          />
        </Routes>
      </BrowserRouter>
    </RoleContext.Provider>
  );
}

export default App;
