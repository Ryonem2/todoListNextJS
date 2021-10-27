import React from "react";

export default function Navbar() {
  return (
    <>
      <nav className="bg-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between">
            <div className="flex space-x-7">
              {/* Website Logo */}
              <div>
                <a href="#" className="flex items-center py-4 px-2">
                  <span className="font-semibold text-gray-500 text-lg">
                    TODOLIST
                  </span>
                </a>
              </div>
              {/* Primary Navbar items */}
              <div className="hidden md:flex items-center space-x-1">
                <a
                  href="#"
                  className="py-4 px-2 text-green-500 border-b-4 border-green-500 font-semibold "
                >
                  Home
                </a>
                {/* <a
                  href="#"
                  className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300"
                >
                  Services
                </a>
                <a
                  href="#"
                  className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300"
                >
                  About
                </a>
                <a
                  href="#"
                  className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300"
                >
                  Contact Us
                </a> */}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
