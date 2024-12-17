// Import necessary hooks and components
import { useState } from "react";              // Hook for managing state in React
import api from '../utils/api'                     // Custom API module for HTTP requests
import { useNavigate } from "react-router-dom"; // Hook for navigation
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants"; // Constants for token storage
import LoadingIndicator from "../components/LoadingIndicator"; // Loading spinner component
import "../styles/Form.css"                    // Import form styles

function Login() {
    // State declarations using useState hook
    const [username, setUsername] = useState("");   // State for username input
    const [password, setPassword] = useState("");   // State for password input
    const [loading, setLoading] = useState(false); // State for loading status

    // Get navigate function for routing
    const navigate = useNavigate();

    // Form submission handler
    const handleSubmit = async (e) => {
        e.preventDefault();    // Prevent default form submission
        setLoading(true);     // Start loading state

        try {
            // Send POST request to get authentication tokens
            const res = await api.post("/api/token/", { 
                username,    // Send username from state
                password    // Send password from state
            });

            // Store tokens in localStorage for future authenticated requests
            localStorage.setItem(ACCESS_TOKEN, res.data.access);     // Save access token
            localStorage.setItem(REFRESH_TOKEN, res.data.refresh);   // Save refresh token
            
            // Redirect to home page after successful login
            navigate("/dashboard");

        } catch (error) {
            // Handle login errors
            console.error("Login error:", error);  // Log error for debugging
            
            // Show error message to user
            // Use backend error message if available, otherwise show generic message
            alert(error.response?.data?.detail || "Login failed");

        } finally {
            // Always stop loading state whether login succeeds or fails
            setLoading(false);
        }
    };

    return (
        // Main form container with submit handler and styling
        <form onSubmit={handleSubmit} className="form-container">
            {/* Form title */}
            <h1>Login</h1>
            
            {/* Username input field */}
            <input
                className="form-input"            // CSS styling class
                type="text"                       // Text input type
                value={username}                  // Controlled input - value from state
                onChange={(e) => setUsername(e.target.value)}  // Update username state when typing
                placeholder="Username"            // Placeholder text when empty
                required                          // Makes field mandatory
            />
    
            {/* Password input field */}
            <input
                className="form-input"            // CSS styling class
                type="password"                   // Password input type (hides characters)
                value={password}                  // Controlled input - value from state
                onChange={(e) => setPassword(e.target.value)}  // Update password state when typing
                placeholder="Password"            // Placeholder text when empty
                required                          // Makes field mandatory
            />
    
            {/* Conditional rendering of loading indicator */}
            {loading && <LoadingIndicator />}     {/* Shows loading spinner when loading is true*/}
            
            {/* Submit button */}
            <button
                className="form-button"           // CSS styling class
                type="submit"                     // Button type for form submission
                disabled={loading}                // Disable button while loading
            >
                {/* Dynamic button text based on loading state */}
                {loading ? "Loading..." : "Login"}
            </button>
    
            {/* Registration link */}
            <div className="form-footer">
                Don't have an account? <a href="/register">Create an account</a>
            </div>
        </form>
    );
}
    
// Export the Login component for use in other files
export default Login;