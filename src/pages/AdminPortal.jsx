import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

const AdminPortal = () => {
    const [requests, setRequests] = useState([]);
    const [newUser, setNewUser] = useState({ name: "", email: "", role: "" });

    const handleRequestAction = (id, action) => {
    // Placeholder for accept/reject logic
    console.log(`${action} request with ID: ${id}`);
    };

    const handleCreateUser = () => {
    // Placeholder for user creation logic
    console.log("Creating user:", newUser);
    setNewUser({ name: "", email: "", role: "" });
    };

    return (
    <div className="admin-portal">
        <h1>Admin Portal</h1>
        <div className="calendar-container">
        <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={[]}
            height="auto"
        />
        </div>

        <h2>Pending Requests</h2>
        <table>
        <thead>
            <tr>
            <th>ID</th>
            <th>User</th>
            <th>Seminar Hall</th>
            <th>Date</th>
            <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {requests.map((request) => (
            <tr key={request.id}>
                <td>{request.id}</td>
                <td>{request.user}</td>
                <td>{request.hall}</td>
                <td>{request.date}</td>
                <td>
                <button
                    className="accept-btn"
                    onClick={() => handleRequestAction(request.id, "accept")}
                >
                    Accept
                </button>
                <button
                    className="reject-btn"
                    onClick={() => handleRequestAction(request.id, "reject")}
                >
                    Reject
                </button>
                </td>
            </tr>
            ))}
        </tbody>
        </table>

        <h2>Create User</h2>
        <form
        className="create-user-form"
        onSubmit={(e) => {
            e.preventDefault();
            handleCreateUser();
        }}
        >
        <label>
            Name:
            <input
            type="text"
            value={newUser.name}
            onChange={(e) =>
                setNewUser((prev) => ({ ...prev, name: e.target.value }))
            }
            />
        </label>
        <label>
            Email:
            <input
            type="email"
            value={newUser.email}
            onChange={(e) =>
                setNewUser((prev) => ({ ...prev, email: e.target.value }))
            }
            />
        </label>
        <label>
            Role:
            <select
            value={newUser.role}
            onChange={(e) =>
                setNewUser((prev) => ({ ...prev, role: e.target.value }))
            }
            >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
            </select>
        </label>
        <button type="submit" className="submit-btn">
            Create User
        </button>
        </form>
    </div>
    );
};

export default AdminPortal;
