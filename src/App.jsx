import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminPortal from "./pages/AdminPortal";
import UserPortal from "./pages/UserPortal";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminPortal />} />
        <Route path="/user" element={<UserPortal />} />
      </Routes>
    </Router>
  );
};

export default App;