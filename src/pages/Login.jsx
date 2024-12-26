import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css"; // Import the new login.css file

const Login = () => {
    const [role, setRole] = useState("user");
    const navigate = useNavigate();

    const handleLogin = () => {
    if (role === "admin") {
        navigate("/admin");
    } else {
        navigate("/user");
    }
    };

    return (
    <div className="login-container">
        <div className="login-form">
        <h2>Login</h2>
        <label>
            Select Role:
            <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
            </select>
        </label>
        <button onClick={handleLogin}>Login</button>
        </div>
    </div>
    );
};

export default Login;
