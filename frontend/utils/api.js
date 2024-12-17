// Import the axios library for making HTTP requests
import axios from "axios";
// Import the access token constant from constants file
import { ACCESS_TOKEN } from "../src/constants";

// Define the default API base URL for the backend services
// This appears to be a Choreo API endpoint
const apiUrl = "https://my-fullsctack-web.onrender.com";

// Create an axios instance with custom configuration
// Uses VITE_API_URL from environment variables if available, otherwise falls back to apiUrl
const api = axios.create({
  // The baseURL will be prepended to all request URLs
  // import.meta.env.VITE_API_URL is a Vite environment variable
  // The ternary operator checks if VITE_API_URL exists, if not uses apiUrl
  baseURL: import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : apiUrl,
});

// Add a request interceptor
// Interceptors run before every request
api.interceptors.request.use(
  // Success handler - called on every successful request configuration
  (config) => {
    // Get the access token from localStorage
    const token = localStorage.getItem(ACCESS_TOKEN);
    
    // If a token exists, add it to the request headers
    // Uses Bearer authentication scheme
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Return the modified config to be used by the request
    return config;
  },
  
  // Error handler - called when request configuration fails
  (error) => {
    // Return a rejected promise to be handled by the calling function
    return Promise.reject(error);
  }
);

// Add these payment-specific functions
api.getStripeConfig = () => api.get('/api/payments/config/');
api.createPaymentIntent = (data) => api.post('/api/payments/create-payment-intent/', data);
api.confirmPayment = (paymentId) => api.post(`/api/payments/confirm-payment/${paymentId}/`);

// Export the configured axios instance for use in other files
export default api;