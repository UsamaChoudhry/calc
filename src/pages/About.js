// src/components/AboutUs.js
import React from 'react';

const AboutUs = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-6 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-semibold text-center text-gray-800 mb-6">About Us</h1>
        <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6">
          Welcome to <span className="font-bold text-indigo-600">[EASY CONVERTOR]</span>, the ultimate online tool for all your unit conversion needs!
        </p>
        <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6">
          Our mission is simple: to provide a fast, reliable, and user-friendly platform for converting units of measurement across various categories—whether it's length, weight, temperature, volume, area, or currency.
        </p>
        <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6">
          Whether you're a student, engineer, scientist, or someone in need of quick and accurate conversions, we've got you covered. Our goal is to make unit conversion as simple and accurate as possible so you can focus on what matters most.
        </p>
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">Key Features:</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
          <li>Wide Range of Units: From metric to imperial systems, we have all the common units covered.</li>
          <li>Simple Interface: Just input your value, select the units, and get the result instantly.</li>
          <li>Accuracy: Our calculations are based on the most reliable conversion formulas.</li>
          <li>No Registration Required: Use the converter freely without needing to sign up.</li>
        </ul>
        <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6">
          We're constantly improving our tool to meet the growing needs of our users. Our priority is to ensure that every conversion is fast, accurate, and easy to use.
        </p>
        <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
          Thank you for visiting <span className="font-bold text-indigo-600">[EASY CONVERTOR]</span>—your trusted unit converter. If you have any questions or feedback, feel free to contact us!
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
