// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

// Add authorization header if token exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add these payment-specific API functions
api.getStripeConfig = () => api.get('/api/payments/config/');
api.createPaymentIntent = (data) => api.post('/api/payments/create-payment-intent/', data);
api.confirmPayment = (paymentId) => api.post(`/api/payments/confirm-payment/${paymentId}/`);

export default api;