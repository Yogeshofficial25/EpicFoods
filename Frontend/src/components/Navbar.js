


import { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaBars, FaTimes } from "react-icons/fa";
import Login from "./Login";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <>
      <nav className="bg-gray-50/90 shadow-md p-4 fixed w-full top-0 z-50 border-b border-gray-200 backdrop-blur-md">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-extrabold text-amber-600 flex items-center">
            <span className="mr-2 animate-pulse"></span> MunchMates
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-gray-700 hover:text-amber-600 text-2xl transition-transform duration-300 transform hover:scale-110"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* Navigation Links */}
          <ul
            className={`lg:flex lg:space-x-8 absolute lg:static top-16 left-0 w-full lg:w-auto bg-gray-50/95 lg:bg-transparent p-4 lg:p-0 transition-all duration-300 ease-in-out ${
              menuOpen ? "block shadow-lg" : "hidden"
            }`}
          >
            <li>
              <Link
                to="/"
                className="block py-2 text-gray-700 font-medium hover:text-amber-600 transition duration-300 relative group"
              >
                Home
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-amber-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link
                to="/menu"
                className="block py-2 text-gray-700 font-medium hover:text-amber-600 transition duration-300 relative group"
              >
                Menu
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-amber-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="block py-2 text-gray-700 font-medium hover:text-amber-600 transition duration-300 relative group"
              >
                About
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-amber-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="block py-2 text-gray-700 font-medium hover:text-amber-600 transition duration-300 relative group"
              >
                Contact
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-amber-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
          </ul>

          {/* Login Button */}
          <button
            onClick={() => setIsLoginOpen(true)}
            className="flex items-center px-4 py-2 bg-amber-600 text-white rounded-full hover:bg-amber-700 transition duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
          >
            <FaUser className="mr-2" /> Login
          </button>
        </div>
      </nav>

      {/* Login Popup */}
      {isLoginOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <Login setIsLoginOpen={setIsLoginOpen} />
        </div>
      )}
    </>
  );
};

export default Navbar;