import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";

const Sidenav = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path ? 'text-green-500 font-bold underline bg-slate-300' : 'text-black font-bold';
  const isDropdownActive = (paths) =>
    paths.some((path) => location.pathname.startsWith(path)) ? 'text-red-500 font-bold underline' : 'text-black font-bold';

  return (
    <div>
      <ul className="flex flex-col items-center h-screen rounded-xl gap-1  ">
      
        
        <li>
          <Link to="/Agecalc" className={`inline-block  text-center py-2 px-4 rounded-md hover:bg-gray-300 ${isActive('/Agecalc')}`}>
            AGE CALCULATOR
          </Link>
        </li>
        <li>
          <Link to="/FuelConvertor" className={`inline-block text-center py-2 px-4 rounded-md hover:bg-gray-300 ${isActive('/FuelConvertor')}`}>
          FUEL COST CALCULATOR
          </Link>
        </li>
        <li>
          <Link to="/CalculateBTU" className={`inline-block py-2 text-center px-4 rounded-md hover:bg-gray-300 ${isActive('/CalculateBTU')}`}>
           BTU CALCULATOR 
          </Link>
        </li>
        <li>
          <Link to="/Gpacalc" className={`inline-block py-2 text-center px-4 rounded-md hover:bg-gray-300 ${isActive('/Gpacalc')}`}>
            GPA CALCULATOR
          </Link>
        </li>
        <li>
          <Link to="/VoltageDropCalculator" className={`inline-block py-2 text-center px-4 rounded-md hover:bg-gray-300 ${isActive('/VoltageDropCalculator')}`}>
          VOLTAGE DROP CALCULATOR
          </Link>
        </li>
        <li>
          <Link to="/Tabsrouter" className={`inline-block py-2 text-center px-4 rounded-md hover:bg-gray-300 ${isActive('/Tabsrouter')}`}>
          UNIT CONVERTOR
          </Link>
        </li>
        <li className="mt-4"> {/* Added mt-4 here */}
          <Link to="/about" className={`inline-block text-center py-2 px-4 rounded-md hover:bg-gray-300 ${isActive('/about')}`}>
            ABOUT US
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidenav;
