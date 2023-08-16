import React from 'react';
import "./NotFound.css";
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="container">
    <h2 className="error-heading">404 - Page Not Found</h2>
    <p className="error-message">The page you are looking for does not exist.</p>
    <Link className="home-link" to="/">Go to Home Page</Link>
  </div>
  )
}

export default NotFound