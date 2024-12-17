import React from 'react';
import { BrowserRouter } from 'react-router-dom';
// Import the routes configuration
import AppRoutes from './AppRoutes';

function App() {
  return (
    // BrowserRouter enables routing functionality in your app
    <BrowserRouter>
      {/* AppRoutes contains all your route definitions */}
      <AppRoutes />
    </BrowserRouter>
  );
}

// Export App so it can be imported in main.jsx
export default App;