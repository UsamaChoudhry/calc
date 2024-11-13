// import './App.css';
import { BrowserRouter as Router, Routes, Route, Link,useLocation  } from "react-router-dom";
import Home from "./pages/About";
import About from "./pages/About";
import Agecalc from "./pages/Agecalc";
import NotFound from "./pages/NotFound";
import Gpacalc from "./pages/Gpacacl";
import CalculateBTU  from "./pages/CalculateBTU";
import VoltageDropCalculator  from "./pages/VoltageDropCalculator";
import FuelConvertor from "./pages/FuelCostCalculator";
import Navbar from './Navbar';
import Tabsrouter from './Tabsrouter';
import Sidenav from './components/Sidenav';
import React, { useState } from 'react';

function App() {

  return (

    <Router>
    <Navbar />
    <div className="flex flex-col min-h-screen ">
     
     <div className='flex sm:mt-1 gap-2 '>
     <nav className="w-[20vw] h-screen mt-6 rounded-xl hidden md:ml-1 sm:block">
      <Sidenav/>  
     </nav>
      <div className="flex-grow w-[80vw] shadow-lg rounded-lg">
        <Routes>
        
          <Route path="/about" element={<About />} />
          <Route path="/" element={<Home />} />
          <Route path="/Agecalc" element={<Agecalc />} />
          <Route path="/FuelConvertor" element={<FuelConvertor />} />
          <Route path="/CalculateBTU" element={<CalculateBTU />} />
          <Route path="/VoltageDropCalculator" element={<VoltageDropCalculator />} />
          <Route path="/Gpacalc" element={<Gpacalc />} />
          <Route path="/Gpacalc" element={<Gpacalc />} />
          <Route path="/Tabsrouter" element={<Tabsrouter />} />
         
          
          <Route path="*" element={<NotFound />} />
         

        </Routes>
      </div>
      {/* <nav className="bg-gray-800 w-[30vw] h-screen text-white hidden md:block">
      <Adv/>  
     </nav> */}
     </div>
      
      <footer className="bg-blue-600 p-4 text-center text-white">
        &copy; 2024 My App
      </footer>
    </div>
  </Router>
  );
}

export default App;
