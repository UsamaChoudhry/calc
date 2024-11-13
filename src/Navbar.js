import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown
  const location = useLocation();
  const isActive = (path) => location.pathname === path ? 'text-green-500 font-bold underline bg-gray-600 rounded-xl' : 'text-black font-bold';
  const isDropdownActive = (paths) =>
    paths.some((path) => location.pathname.startsWith(path)) ? 'text-green-500 font-bold underline' : 'text-black font-bold';

  const menuRef = useRef(null); // Reference to the menu
  const buttonRef = useRef(null); // Reference to the hamburger button
  const dropdownRef = useRef(null); // Reference to the dropdown

  // Toggle the menu on button click
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Toggle the dropdown on hover or click (mobile)
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  // Close the menu if clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click is outside the menu, button, or dropdown
      if (
        menuRef.current && !menuRef.current.contains(event.target) &&
        buttonRef.current && !buttonRef.current.contains(event.target) &&
        dropdownRef.current && !dropdownRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false); // Close the hamburger menu
        setIsDropdownOpen(false); // Close the dropdown
      }
    };

    // Add event listener for clicks outside
    document.addEventListener("click", handleClickOutside);

    // Clean up event listener on component unmount
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <header className="text-black rounded-xl bg-purple-200 px-2">
      <nav className="flex items-center justify-between p-2">
        <div className="text-2xl font-bold">
          <Link to="/" className={`hover:text-gray-400 ${isActive('/')}`}>
            HOME
          </Link>
        </div>
        <div className="sm:block hidden">
          <h1 className="font-bold font-serif text-3xl ">EASY CONVERTOR</h1>
        </div>
        {/* Desktop Menu */}
        <div className="hidden sm:flex space-x-6 ">
          
          {/* Dropdown Menu for Desktop */}
          <div
            className="relative"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button
              className={`text-green hover:text-gray-400 ${isDropdownActive([
                '/FuelConvertor',
                '/Agecalc',
                '/CalculateBTU',
                '/GPA CALCULATOR',
                '/VOLTAGE DROP CALCULATOR',
                '/UNIT CONVERTOR',
              ])}`}
              onClick={toggleDropdown} // Added onClick for dropdown toggle
            >
              SERVICES
            </button>
            {isDropdownOpen && (
              <div className="absolute bg-slate-100 text-black p-2 rounded-xl mt-[-12px] w-40">
                <Link
                  to="/Agecalc"
                  className={`block py-1 px-2 hover:bg-gray-600 hover:rounded-xl ${isActive('/Agecalc')}`}
                  onClick={() => setIsMenuOpen(false)} // Close hamburger menu on mobile
                >
                  AGE CALCULATOR
                </Link>
                <Link
                  to="/FuelConvertor "
                  className={`block py-1 px-2 hover:bg-gray-600 hover:rounded-xl ${isActive('/FuelConvertor')}`}
                  onClick={() => setIsMenuOpen(false)} // Close hamburger menu on mobile
                >
                  FUEL COST CALCULATOR
                </Link>

                <Link
                  to="/CalculateBTU"
                  className={`block py-1 px-2 hover:bg-gray-600 hover:rounded-xl ${isActive('/CalculateBTU')}`}
                  onClick={() => setIsMenuOpen(false)} // Close hamburger menu on mobile
                >
                  BTU CALCULATOR
                </Link>
                <Link
                  to="/VOLTAGE DROP CALCULATOR"
                  className={`block py-1 px-2 hover:bg-gray-600 hover:rounded-xl ${isActive('/VOLTAGE DROP CALCULATOR')}`}
                  onClick={() => setIsMenuOpen(false)} // Close hamburger menu on mobile
                >
                  VOLTAGE DROP CALCULATOR
                </Link>
                <Link
                  to="/GPA CALCULATOR"
                  className={`block py-1 px-2 hover:bg-gray-600 hover:rounded-xl ${isActive('/GPA CALCULATOR')}`}
                  onClick={() => setIsMenuOpen(false)} // Close hamburger menu on mobile
                >
                  GPA CALCULATOR
                </Link>
                <Link
                  to="/UNIT CONVERTOR"
                  className={`block py-1 px-2 hover:bg-gray-600 hover:rounded-xl ${isActive('/UNIT CONVERTOR')}`}
                  onClick={() => setIsMenuOpen(false)} // Close hamburger menu on mobile
                >
                  UNIT CONVERTOR
                </Link>
              </div>
            )}
          </div>
          <Link
            to="/about"
            className={`hover:text-gray-400 ${isActive('/about')}`}
          >
            About
          </Link>
        </div>
          

        {/* Hamburger Icon */}
        <button
          ref={buttonRef}
          onClick={toggleMenu}
          className="sm:hidden space-y-1"
        >
          <div className={`w-6 h-1 bg-black transform transition-all ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`}></div>
          <div className={`w-6 h-1 bg-black transition-all ${isMenuOpen ? "opacity-0" : ""}`}></div>
          <div className={`w-6 h-1 bg-black transform transition-all ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}></div>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className={`sm:hidden fixed inset-0 bg-gray-800 bg-opacity-90 z-10 transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleMenu} className="text-black text-3xl">×</button>
        </div>
        <div className="flex flex-col items-center">
          <Link
            to="/"
            className={`py-2 text-xl hover:text-gray-400 ${isActive('/')}`}
            onClick={() => setIsMenuOpen(false)} // Close hamburger menu on mobile
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`py-2 text-xl hover:text-gray-400 ${isActive('/about')}`}
            onClick={() => setIsMenuOpen(false)} // Close hamburger menu on mobile
          >
            About
          </Link>

          {/* Dropdown for Mobile */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className={`text-green uppercase hover:text-gray-400 ${isDropdownActive([
                '/FuelConvertor',
                '/Agecalc',
                '/CalculateBTU',
                '/GPA CALCULATOR',
                '/VOLTAGE DROP CALCULATOR',
                '/UNIT CONVERTOR',
              ])}`}
            >
              Services
            </button>
            {isDropdownOpen && (
              <div ref={dropdownRef} className="bg-gray-700 text-black p-2 rounded-lg mt-[-12px] w-40">
                <Link
                  to="/Agecalc"
                  className={`block py-1 px-2 hover:bg-gray-600 ${isActive('/Agecalc')}`}
                  onClick={() => setIsMenuOpen(false)} // Close hamburger menu on mobile
                >
                  AGE CALCULATOR
                </Link>
                <Link
                  to="/FuelConvertor"
                  className={`block py-1 px-2 hover:bg-gray-600 ${isActive('/FuelConvertor')}`}
                  onClick={() => setIsMenuOpen(false)} // Close hamburger menu on mobile
                >
                  FUEL COST CALCULATOR
                </Link>

                <Link
                  to="/CalculateBTU"
                  className={`block py-1 px-2 hover:bg-gray-600 ${isActive('/CalculateBTU')}`}
                  onClick={() => setIsMenuOpen(false)} // Close hamburger menu on mobile
                >
                  BTU CALCULATOR
                </Link>
                <Link
                  to="/Gpacalc"
                  className={`block py-1 px-2 hover:bg-gray-600 ${isActive('/Gpacalc')}`}
                  onClick={() => setIsMenuOpen(false)} // Close hamburger menu on mobile
                >
                  GPA CALCULATOR
                </Link>
                <Link
                  to="/VoltageDropCalculator"
                  className={`block py-1 px-2 hover:bg-gray-600 ${isActive('/VoltageDropCalculator')}`}
                  onClick={() => setIsMenuOpen(false)} // Close hamburger menu on mobile
                >
                  VOLTAGE DROP CALCULATOR
                </Link>
                <Link
                  to="/Tabsrouter"
                  className={`block py-1 px-2 hover:bg-gray-600 ${isActive('/Tabsrouter')}`}
                  onClick={() => setIsMenuOpen(false)} // Close hamburger menu on mobile
                >
                  UNIT CONVERTOR
                </Link>
              </div>
            )}
          </div>

         
        </div>
      </div>
    </header>
  );
};

export default Navbar;
