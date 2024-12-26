import React from "react";
import Calendar from "../components/Calendar";

const UserPortal = () => {
    return (
    <div style={{ padding: "2rem" }}>
        <h2>User Portal</h2>
        <Calendar />
        <div>
        <h3>Request a Seminar Hall</h3>
        <form>
            <label>
            Seminar Hall: 
            <select>
                <option value="cse">CSE</option>
                <option value="mech">Mechanical</option>
                <option value="civil">Civil</option>
            </select>
            </label>
            <label>
            Date: 
            <input type="date" />
            </label>
            <label>
            Time: 
            <input type="time" />
            </label>
            <label>
            Purpose: 
            <input type="text" />
            </label>
            <button type="submit">Submit Request</button>
        </form>
        </div>
    </div>
    );
};

export default UserPortal;
