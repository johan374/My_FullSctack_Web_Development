// Import necessary hooks and components
import { useState } from "react";              // Hook for managing state
import api from "../api";                      // Custom API module for making HTTP requests
import { useNavigate } from "react-router-dom"; // Hook for programmatic navigation
import LoadingIndicator from "../components/LoadingIndicator"; // Loading spinner component
import "../styles/Form.css"                    // Import CSS styles for the form

function Register() {
    // State declarations using useState hook
    const [username, setUsername] = useState("");   // State for username input
    const [email, setEmail] = useState("");        // State for email input
    const [password, setPassword] = useState("");   // State for password input
    const [loading, setLoading] = useState(false); // State for tracking loading status

    // Get the navigate function for redirecting users
    const navigate = useNavigate();

    // Form submission handler
    const handleSubmit = async (e) => {
        e.preventDefault();    // Prevent default form submission behavior
        setLoading(true);     // Start loading state

        try {
            // Send POST request to register endpoint with user data
            await api.post("/api/user/register/", {
                username,     // Send username from state
                email,       // Send email from state
                password     // Send password from state
            });

            // If registration is successful
            alert("Registration successful! Please login.");  // Show success message
            navigate("/login");  // Redirect to login page

        } catch (error) {
            // If registration fails
            console.error("Registration error:", error);  // Log error for debugging
            
            // Show error message to user
            // If there's an error response from server, show that, otherwise show generic message
            alert(JSON.stringify(error.response?.data) || "Registration failed");

        } finally {
            // This runs whether registration succeeds or fails
            setLoading(false);  // Stop loading state
        }
    };


    return (
      // Main form element with onSubmit handler and CSS class
      <form onSubmit={handleSubmit} className="form-container">
          {/* Form title */}
          <h1>Register</h1>
          
          {/* Username input field */}
          <input
              className="form-input"            // CSS styling class
              type="text"                       // Text input field
              value={username}                  // Controlled input - value from state
              onChange={(e) => setUsername(e.target.value)}  // Update username state when typing
              placeholder="Username"            // Placeholder text when empty
              required                          // Makes field mandatory
          />
  
          {/* Email input field */}
          <input
              className="form-input"            // CSS styling class
              type="email"                      // Email input type (includes validation)
              value={email}                     // Controlled input - value from state
              onChange={(e) => setEmail(e.target.value)}  // Update email state when typing
              placeholder="Email"               // Placeholder text when empty
              required                          // Makes field mandatory
          />
  
          {/* Password input field */}
          <input
              className="form-input"            // CSS styling class
              type="password"                   // Password input (hides characters)
              value={password}                  // Controlled input - value from state
              onChange={(e) => setPassword(e.target.value)}  // Update password state when typing
              placeholder="Password"            // Placeholder text when empty
              required                          // Makes field mandatory
          />
  
          {/* Show loading indicator when loading is true */}
          {loading && <LoadingIndicator />}
          
          {/* Submit button */}
          <button
              className="form-button"           // CSS styling class
              type="submit"                     // Makes it submit the form
              disabled={loading}                // Disable when loading
          >
              {/* Show "Loading..." when loading, otherwise show "Register" */}
              {loading ? "Loading..." : "Register"}
          </button>
  
          {/* Link to login page */}
          <div className="form-footer">
              Already have an account? <a href="/login">Login here</a>
          </div>
      </form>
  );
}
  // Export the Register component so it can be imported elsewhere
  export default Register;