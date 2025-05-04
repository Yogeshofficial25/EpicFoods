
import { useState, useEffect, useRef, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaUser, FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";
import UserLocation from './UserLocation';
import Login from "./Auth/Login";
import { AuthContext } from "./Auth/AuthContext";

const Navbar = () => {
  const { isLoggedIn, userName, handleLoginSuccess, handleLogout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const handleLoginClick = () => {
    setIsLoginOpen(true);
    setMenuOpen(false);
  };

  const isHome = location.pathname === "/";

  return (
    <>
      <nav
        className={`fixed w-full top-0 z-50 transition-all duration-500 ${
          isHome && !isScrolled
            ? "bg-transparent text-white"
            : "bg-white/90 backdrop-blur-md text-gray-700 shadow-md"
        } p-4 border-b border-gray-200`}
      >
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-3xl font-extrabold text-indigo-600 flex items-center">
            <span className="mr-2 text-amber-500">Epic</span>
            <span className="animate-pulse">Foods</span>
          </Link>

          {/* User Location */}
          <UserLocation />

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden text-2xl transition-transform duration-300 transform hover:scale-110 ${
              isHome && !isScrolled ? "text-white" : "text-fuchsia-700 hover:text-purple-600"
            }`}
            onClick={toggleMenu}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* Nav Links */}
          <ul
            className={`lg:flex lg:space-x-8 lg:items-center absolute lg:static top-16 left-0 w-full lg:w-auto z-50 ${
              isHome && !isScrolled ? "bg-black/60" : "bg-white"
            } lg:bg-transparent p-4 lg:p-0 transition-all duration-300 ${
              menuOpen ? "block shadow-lg" : "hidden lg:flex"
            }`}
          >
            {["Home", "Menu", "Services", "About", "Contact"].map((item, idx) => (
              <li key={idx}>
                <Link
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className={`block py-2 font-medium transition duration-300 relative group ${
                    isHome && !isScrolled
                      ? "text-white"
                      : "text-fuchsia-800 hover:text-purple-600"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-fuchsia-600 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
            ))}

            {/* Mobile Login/Profile */}
            <li className="lg:hidden">
              {isLoggedIn ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={toggleDropdown}
                    className="block w-full text-left py-2 font-medium flex items-center text-fuchsia-700"
                  >
                    <FaUser className="mr-2" /> {userName || "Profile"}
                  </button>
                  {dropdownOpen && (
                    <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-50">
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-rose-100 flex items-center"
                      >
                        <FaSignOutAlt className="mr-2" /> Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={handleLoginClick}
                  className="block w-full text-left py-2 font-medium text-fuchsia-800"
                >
                  <FaUser className="mr-2" /> Login
                </button>
              )}
            </li>
          </ul>

          {/* Desktop Login/Profile */}
          <div className="hidden lg:block relative" ref={dropdownRef}>
            {!isLoggedIn ? (
              <button
                onClick={handleLoginClick}
                className="flex items-center px-4 py-2 bg-gradient-to-br from-fuchsia-500 to-purple-600 text-white rounded-full hover:from-fuchsia-600 hover:to-purple-700 transition duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                <FaUser className="mr-2" /> Login
              </button>
            ) : (
              <>
                <button
                  onClick={toggleDropdown}
                  className="flex items-center px-4 py-2 bg-gradient-to-br from-fuchsia-500 to-purple-600 text-white rounded-full hover:from-fuchsia-600 hover:to-purple-700 transition duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  <FaUser className="mr-2" /> {userName || "Profile"}
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-50">
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-rose-100 flex items-center"
                    >
                      <FaSignOutAlt className="mr-2" /> Logout
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Login Modal */}
      {isLoginOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 overflow-y-auto">
          <Login setIsLoginOpen={setIsLoginOpen} onLoginSuccess={handleLoginSuccess} />
        </div>
      )}
    </>
  );
};

export default Navbar;
