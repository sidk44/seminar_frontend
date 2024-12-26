import React from "react";

const Table = ({ requests, onApprove, onReject }) => {
    return (
    <table className="min-w-full bg-white border">
        <thead>
        <tr>
            <th className="px-4 py-2 border">ID</th>
            <th className="px-4 py-2 border">Date</th>
            <th className="px-4 py-2 border">User</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="px-4 py-2 border">Actions</th>
        </tr>
        </thead>
        <tbody>
        {requests.map((req) => (
            <tr key={req.id}>
            <td className="px-4 py-2 border">{req.id}</td>
            <td className="px-4 py-2 border">{req.date}</td>
            <td className="px-4 py-2 border">{req.userId}</td>
            <td className="px-4 py-2 border">{req.status}</td>
            <td className="px-4 py-2 border">
                <button onClick={() => onApprove(req.id)} className="px-2 bg-green-500 text-white rounded">
                Approve
                </button>
                <button onClick={() => onReject(req.id)} className="px-2 bg-red-500 text-white rounded ml-2">
                Reject
                </button>
            </td>
            </tr>
        ))}
        </tbody>
    </table>
    );
};

export default Table;
