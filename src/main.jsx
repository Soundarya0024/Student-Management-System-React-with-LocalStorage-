import React from 'react'   // This imports the React library
import { createRoot } from 'react-dom/client' //API in React 18 for rendering your app to the DOM.
import { BrowserRouter } from 'react-router-dom' //router component from React Router
import App from './App' // main app
import './index.css' //global css styles

// Render the App component wrapped in BrowserRouter to enable routing

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
