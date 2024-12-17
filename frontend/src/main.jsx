import React from 'react'
import ReactDOM from 'react-dom/client'
// Import the main App component from App.jsx
import App from './App.jsx'
// Import your global styles
import './index.css'

// ReactDOM.createRoot creates a React root to render your app
// document.getElementById('root') finds the div with id="root" from your index.html
ReactDOM.createRoot(document.getElementById('root')).render(
  // StrictMode is a development tool to highlight potential problems
  <React.StrictMode>
    {/* This is where your App component gets rendered */}
    <App />
  </React.StrictMode>,
)