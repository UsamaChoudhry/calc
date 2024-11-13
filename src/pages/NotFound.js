import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <h1 className="text-4xl font-bold text-red-600">404 - Page Not Found</h1>
    <p className="mt-4 text-lg text-gray-700">Oops! The page you are looking for does not exist.</p>
    <Link to="/" className="mt-4 px-4 py-2 text-white bg-blue-600 rounded">
      Go Back Home
    </Link>
  </div>
);

export default NotFound;
