// import React, { useState, useEffect } from "react";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import axios from "axios";

// const UserPortal = () => {
//     // State to manage form inputs
//     const [seminarHall, setSeminarHall] = useState("");
//     const [date, setDate] = useState("");
//     const [time, setTime] = useState("");
//     const [purpose, setPurpose] = useState("");
//     const [events, setEvents] = useState([]);

//     // Fetch approved events for the calendar
//     useEffect(() => {
//         const fetchApprovedEvents = async () => {
//             try {
//                 const response = await axios.get(
//                     "http://localhost:8080/api/requests/approved"
//                 );
//                 const eventsData = response.data.map((event) => ({
//                     title: event.purpose, // Replace with the correct field name
//                     date: event.requestedDateTime, // Replace with the correct field name
//                 }));
//                 setEvents(eventsData);
//             } catch (error) {
//                 console.error("Error fetching approved events:", error);
//             }
//         };

//         fetchApprovedEvents();
//     }, []);

//     // Handle form submission
//     const handleSubmit = async (e) => {
//         e.preventDefault();
    
//         const requestData = {
//             userId: 123, // Replace with actual user ID
//             seminarHallId: seminarHall, // Seminar hall ID
//             requestedDateTime: `${date}T${time}`, // Combine date and time
//             purpose: purpose,
//             status: "PENDING", // Default status
//         };
    
//         try {
//             const response = await axios.post("http://localhost:8080/api/requests/submit", requestData, {
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//             });
//             console.log("Request submitted successfully:", response.data);
//             alert("Request submitted successfully!");
//         } catch (error) {
//             console.error("Error submitting request:", error);
//             alert("Failed to submit the request.");
//         }
//     };

//     return (
//         <div style={{ padding: "2rem" }}>
//             <h2>User Portal</h2>
            
//             {/* Full Calendar Display */}
//             <div className="calendar-container">
//                 <FullCalendar
//                     plugins={[dayGridPlugin, interactionPlugin]}
//                     initialView="dayGridMonth"
//                     events={events}
//                     height="auto"
//                 />
//             </div>

//             <div>
//                 <h3>Request a Seminar Hall</h3>
//                 <form onSubmit={handleSubmit}>
//                     <label>
//                         Seminar Hall: 
//                         <select
//                             value={seminarHall}
//                             onChange={(e) => setSeminarHall(e.target.value)}
//                         >
//                             <option value="">Select</option>
//                             <option value="1">CSE</option> {/* Replace with actual IDs */}
//                             <option value="2">Mechanical</option>
//                             <option value="3">Civil</option>
//                         </select>
//                     </label>
//                     <label>
//                         Date: 
//                         <input
//                             type="date"
//                             value={date}
//                             onChange={(e) => setDate(e.target.value)}
//                         />
//                     </label>
//                     <label>
//                         Time: 
//                         <input
//                             type="time"
//                             value={time}
//                             onChange={(e) => setTime(e.target.value)}
//                         />
//                     </label>
//                     <label>
//                         Purpose: 
//                         <input
//                             type="text"
//                             value={purpose}
//                             onChange={(e) => setPurpose(e.target.value)}
//                         />
//                     </label>
//                     <button type="submit">Submit Request</button>
//                 </form>
//             </div>
//         </div>
//     );
// };


// export default UserPortal;
import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import logo from "../assets/logo2.png"; // Adjust the path if needed
import { app } from "../services/firebase"; // Create separate firebase config file
import { motion } from "framer-motion"; // For animations


// Import Firebase Storage functions
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const UserPortal = () => {
    const [seminarHall, setSeminarHall] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [purpose, setPurpose] = useState("");
    const [pdfFile, setPdfFile] = useState(null); //  PDF file
    const [events, setEvents] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    

    // Initialize Firebase Storage
    const storage = getStorage(app);


    // Fetch approved events for the calendar
    useEffect(() => {
        const fetchApprovedEvents = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/requests/approved");
                const eventsData = response.data.map((event) => ({
                    title: event.purpose,
                    date: event.requestedDateTime,
                }));
                setEvents(eventsData);
            } catch (error) {
                console.error("Error fetching approved events:", error);
            }
        };

        fetchApprovedEvents();
    }, []);


  // Function to upload PDF to Firebase Storage and return the download URL
    const uploadPdfToFirebase = async (file) => {
        if (!file) return null;
        
        try {
            const storageRef = ref(storage, `seminar-requests/${Date.now()}-${file.name}`);
            const snapshot = await uploadBytes(storageRef, file);
            return await getDownloadURL(snapshot.ref);
        } catch (error) {
            console.error("PDF upload failed:", error);
            throw error;
        }
    };



    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        const requestData = {
            userId: 123,
            seminarHallId: seminarHall,
            requestedDateTime: `${date}T${time}`,
            purpose: purpose,
            status: "PENDING",
        };

        try {
            if (pdfFile) {
                const pdfUrl = await uploadPdfFile(pdfFile);
                requestData.pdfUrl = pdfUrl;
            }
            const response = await axios.post("http://localhost:8080/api/requests/submit", requestData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log("Request submitted successfully:", response.data);
            alert("Request submitted successfully!");
        } catch (error) {
            console.error("Error submitting request:", error);
            alert("Failed to submit the request.");
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 p-8"
    >

        <div className="max-w-7xl mx-auto">

            <h1 className="text-5xl font-bold text-gray-900 mb-8 text-center">User Portal</h1>
            <div style={{ borderTop: "1px solid white", margin: "20px 0" }}></div>

            {/* Calendar Section */}
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="bg-white rounded-xl shadow-2xl p-6 mb-8"
            >
                
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Event Calendar</h2>
                <div style={{ borderTop: "1px solid white", margin: "20px 0" }}></div>

                <div className="calendar-container">
                    <FullCalendar
                        plugins={[dayGridPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        events={events}
                        height="auto"
                        eventColor="#4F46E5"
                        eventTextColor="#FFFFFF"
                    />
                </div>
            </motion.div>

            {/* Request Seminar Hall Section */}
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="bg-white/30 backdrop-blur-lg rounded-xl shadow-2xl p-8 border border-white/20 relative overflow-hidden"
            >
                {/* Floating Background Animation */}
                <div className="absolute inset-0 z-0">
                    <div className="w-64 h-64 bg-purple-300/30 rounded-full absolute -top-16 -left-16 animate-float"></div>
                    <div className="w-48 h-48 bg-blue-300/30 rounded-full absolute -bottom-16 -right-16 animate-float-reverse"></div>
                </div>

                <div className="relative z-10">
                <div style={{ borderTop: "1px solid white", margin: "20px 0" }}></div>

                    <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Request a Seminar Hall</h3>
                    <div style={{ borderTop: "1px solid white", margin: "20px 0" }}></div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Seminar Hall Dropdown */}
                        <div className="relative">
                            <select
                                value={seminarHall}
                                onChange={(e) => setSeminarHall(e.target.value)}
                                className="w-full p-4 bg-white/50 backdrop-blur-sm border border-white/30 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all appearance-none"
                            >
                                <option value="">Select Seminar Hall</option>
                                <option value="1">CSE Seminar Hall</option>
                                <option value="2">Mechanical Seminar Hall</option>
                                <option value="3">ISE Seminar Hall</option>
                                <option value="4">IEM Seminar Hall</option>
                                <option value="5">Civil Seminar Hall</option>
                                <option value="6">ECE Seminar Hall</option>
                                <option value="7">MCA Seminar Hall</option>
                            </select>

                        </div>

                        {/* Date Input */}
                        <div className="relative">
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full p-4 bg-white/50 backdrop-blur-sm border border-white/30 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                            />
                        </div>

                        {/* Time Input */}
                        <div className="relative">
                            <input
                                type="time"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                className="w-full p-4 bg-white/50 backdrop-blur-sm border border-white/30 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                            />
                        </div>

                        {/* Purpose Input */}
                        <div className="relative">
                            <input
                                type="text"
                                value={purpose}
                                onChange={(e) => setPurpose(e.target.value)}
                                placeholder="Purpose of Booking"
                                className="w-full p-4 bg-white/50 backdrop-blur-sm border border-white/30 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                            />
                        </div>

                        {/* PDF File Input */}
                        <div className="relative">
                            <label className="block mb-2 font-semibold text-gray-800">
                            Upload PDF (optional):
                            </label>
                            <input
                            type="file"
                            accept="application/pdf"
                            onChange={(e) => setPdfFile(e.target.files[0])}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-6 rounded-lg 
                                ${isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:from-indigo-700 hover:to-purple-700"}
                                transition-all flex items-center justify-center`}
                        >
                            {isSubmitting ? (
                                <svg
                                    className="animate-spin h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    {/* Spinner icon */}
                                </svg>
                            ) : (
                                "Submit Request"
                            )}
                        </button>                        
                    </form>
                    </div>
                    </motion.div>
                    </div>
                </motion.div>
    );
};

export default UserPortal;