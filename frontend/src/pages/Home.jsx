import { useState, useEffect } from "react";
import api from "../utils/api";
import Note from "../components/Note";
// Import additional components and assets
import Single from "../assets/single.png";
import Double from "../assets/double.png";
import Triple from "../assets/triple.png";
import { useNavigate } from 'react-router-dom';
import "../styles/Home.css";

function Home() {
    // ... your existing state and functions ...
     // States
     const [notes, setNotes] = useState([]);
     const [content, setContent] = useState("");
     const [title, setTitle] = useState("");
     const [username, setUsername] = useState("");
     const navigate = useNavigate();
 
     // useEffect for initial data load
     useEffect(() => {
         getNotes();
         getCurrentUser();
     }, []);
 
     // Get current user
     const getCurrentUser = () => {
         api.get("/api/user/current/")
             .then((res) => {
                 setUsername(res.data.username);
             })
             .catch((err) => {
                 console.error("Error fetching user:", err);
             });
     };
 
     // Get notes
     const getNotes = () => {
         api.get("/api/notes/")
             .then((res) => res.data)
             .then((data) => {
                 setNotes(data);
             })
             .catch((err) => {
                 console.error(err);
             });
     };
 
     // Delete note
     const deleteNote = (id) => {
         api.delete(`/api/notes/delete/${id}/`)
             .then((res) => {
                 if (res.status === 204) alert("Note deleted!");
                 else alert("Failed to delete note");
                 getNotes();
             })
             .catch((error) => alert(error));
     };
     
     // Create note
     const createNote = (e) => {
         e.preventDefault();
         api.post("/api/notes/", { content, title })
             .then((res) => {
                 if (res.status === 201) {
                     alert("Note created!");
                     getNotes();
                 } else {
                     alert("Failed to make note.");
                 }
             })
             .catch((err) => {
                 console.error("Full error:", err);
                 console.error("Error response:", err.response);
                 alert(err.response 
                     ? JSON.stringify(err.response.data) 
                     : "Note creation failed"
                 );
             });
     };
 
     // Payment handling
     const handlePayment = (planType, amount) => {
         navigate('/payment', { 
             state: { 
                 planType: planType,
                 amount: amount 
             }
         });
     };
    return (
        <div>
            {/* Welcome section */}
            <div className="welcome-section">
                {username && <h2>Welcome, {username}!</h2>}
            </div>

            {/* Subscription Plans Section */}
            <div className="w-full py-[5rem] px-4 bg-white">
                <h2 className="text-3xl font-bold text-center mb-8">Choose Your Plan</h2>
                <div className="max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8">
                    {/* Single User Card */}
                    <div className="w-full shadow-xl flex flex-col p-4 md:my-0 my-8 rounded-lg hover:scale-105 duration-300">
                        <img className="w-20 mx-auto mt-[-3rem] bg-white" src={Single} alt="/" />
                        <h2 className="text-2xl font-bold text-center py-8">Single User</h2>
                        <div className="text-center">
                            <p className="text-4xl font-bold">$149</p>
                            <p className="text-gray-500 mt-2">Billed monthly</p>
                        </div>
                        
                        <div className="text-center font-medium">
                            <p className="py-2 border-b mx-8 mt-8">500 GB Storage</p>
                            <p className="py-2 border-b mx-8">1 Granted User</p>
                            <p className="py-2 border-b mx-8">Send up to 2 GB</p>
                        </div>

                        <div className="space-y-4 mt-6">
                            <button 
                                onClick={() => handlePayment('single', 149)}
                                className="bg-[#00df9a] w-[200px] rounded-md font-medium mx-auto px-6 py-3 flex items-center justify-center gap-2 hover:bg-[#00c589] transition-colors duration-300"
                            >
                                <span>Pay with Card</span>
                                <span className="text-sm">($149)</span>
                            </button>
                        </div>
                    </div>

                    {/* Partnership Card */}
                    <div className="w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300">
                        <img className="w-20 mx-auto mt-[-3rem] bg-transparent" src={Double} alt="/" />
                        <h2 className="text-2xl font-bold text-center py-8">Partnership</h2>
                        <div className="text-center">
                            <p className="text-4xl font-bold">$199</p>
                            <p className="text-gray-500 mt-2">Billed monthly</p>
                        </div>
                        
                        <div className="text-center font-medium">
                            <p className="py-2 border-b mx-8 mt-8">1TB Storage</p>
                            <p className="py-2 border-b mx-8">3 Granted Users</p>
                            <p className="py-2 border-b mx-8">Send up to 10 GB</p>
                        </div>

                        <div className="space-y-4 mt-6">
                            <button 
                                onClick={() => handlePayment('partnership', 199)}
                                className="bg-black text-[#00df9a] w-[200px] rounded-md font-medium mx-auto px-6 py-3 flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors duration-300"
                            >
                                <span>Pay with Card</span>
                                <span className="text-sm">($199)</span>
                            </button>
                        </div>
                    </div>

                    {/* Group Account Card */}
                    <div className="w-full shadow-xl bg-gray-100 flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300">
                        <img className="w-20 mx-auto mt-[-3rem] bg-white" src={Triple} alt="/" />
                        <h2 className="text-2xl font-bold text-center py-8">Group Account</h2>
                        <div className="text-center">
                            <p className="text-4xl font-bold">$299</p>
                            <p className="text-gray-500 mt-2">Billed monthly</p>
                        </div>
                        
                        <div className="text-center font-medium">
                            <p className="py-2 border-b mx-8 mt-8">5 TB Storage</p>
                            <p className="py-2 border-b mx-8">10 Granted Users</p>
                            <p className="py-2 border-b mx-8">Send up to 20 GB</p>
                        </div>

                        <div className="space-y-4 mt-6">
                            <button 
                                onClick={() => handlePayment('group', 299)}
                                className="bg-[#00df9a] w-[200px] rounded-md font-medium mx-auto px-6 py-3 flex items-center justify-center gap-2 hover:bg-[#00c589] transition-colors duration-300"
                            >
                                <span>Pay with Card</span>
                                <span className="text-sm">($299)</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Your existing notes section */}
            <div>
                <h2>Notes</h2>
                {notes.map((note) => (
                    <Note 
                        note={note} 
                        onDelete={deleteNote} 
                        key={note.id} 
                    />
                ))}
            </div>

            {/* Your existing note creation form */}
            <h2>Create a Note</h2>
            <form onSubmit={createNote}>
                {/* ... rest of your form ... */}
            </form>
        </div>
    );
}

export default Home;