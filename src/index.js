import 'bootstrap/dist/css/bootstrap.min.css';
// Importing core dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';  // Optional global styles

// Importing the root App component
import App from './App';

// Rendering the App component inside the 'root' div in index.html
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')  // Ensure this matches the div in public/index.html
);