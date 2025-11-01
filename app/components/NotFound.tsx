import React from "react";
import { Compass } from "lucide-react";

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-b from-blue-50 to-white text-gray-800 px-4">
      {/* Illustration */}
      <div className="relative mb-6">
       
        <div className="absolute inset-0 flex items-center justify-center">
          <Compass className="text-blue-500 w-10 h-10 animate-spin-slow" />
        </div>
      </div>

      {/* Text */}
      <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-3">
        Oops! Page Not Found
      </h1>
      <p className="text-gray-600 text-center max-w-md mb-6">
        Looks like you’ve taken a wrong turn on your journey.  
        Let’s get you back on the right path to explore Thailand again!
      </p>

      {/* Button */}
      <a
        href="/"
        className="px-6 py-3 bg-[var(--primary-color,#16a34a)] text-white rounded-lg shadow transition-colors duration-200"
      >
     Back to Home
      </a>

      {/* Extra visual touch */}
      <p className="mt-10 text-sm text-gray-400">
        © {new Date().getFullYear()} ThaiTour Explorer. All rights reserved.
      </p>
    </div>
  );
};

export default NotFound;
