import React, { useState } from "react";

const FuelCalculator = () => {
  // State for form inputs
  const [distance, setDistance] = useState("");
  const [fuelPrice, setFuelPrice] = useState("");
  const [avgPerLiter, setAvgPerLiter] = useState("");
  const [unit, setUnit] = useState("km");
  const [fuelPriceUnit, setFuelPriceUnit] = useState("liters");
  const [avgUnit, setAvgUnit] = useState("liters");
  const [result, setResult] = useState("Result will be shown here");
  const [errorFields, setErrorFields] = useState({ distance: false, fuelPrice: false, avgPerLiter: false });

  // Calculate fuel cost
  const calculateFuelCost = () => {
    // Reset error states
    setErrorFields({ distance: false, fuelPrice: false, avgPerLiter: false });

    if (!distance || !fuelPrice || !avgPerLiter) {
      // Highlight empty fields
      setErrorFields({
        distance: !distance,
        fuelPrice: !fuelPrice,
        avgPerLiter: !avgPerLiter,
      });

      // Blink effect for empty fields
      blinkEmptyFields();
      
      setResult("Please fill in all fields");
      return;
    }

    // Convert distance to kilometers if it's in miles
    const distanceInKm = unit === "miles" ? distance * 1.60934 : distance;

    // Adjust fuel price based on selected unit
    const pricePerLiter = fuelPriceUnit === "gallons" ? fuelPrice * 3.78541 : fuelPrice; // Convert gallons to liters

    // Adjust average consumption based on selected unit
    const averageConsumption = avgUnit === "gallons" ? avgPerLiter * 3.78541 : avgPerLiter; // Convert gallons to liters

    // Calculate the fuel required
    const fuelRequired = distanceInKm / averageConsumption;

    // Calculate the cost
    const totalCost = fuelRequired * pricePerLiter;

    setResult(`Total Fuel Cost: $${totalCost.toFixed(2)}`);
  };

  const blinkEmptyFields = () => {
    const fieldsToBlink = ['distance', 'fuelPrice', 'avgPerLiter'].filter(field => errorFields[field]);
    
    fieldsToBlink.forEach(field => {
      const inputElement = document.getElementById(field);
      if (inputElement) {
        inputElement.classList.add('bg-red-200');
        setTimeout(() => inputElement.classList.remove('bg-red-200'), 300);
        setTimeout(() => inputElement.classList.add('bg-red-200'), 600);
        setTimeout(() => inputElement.classList.remove('bg-red-200'), 900);
      }
    });
  };

  return (
    <div className="min-h-screen  flex gap-4 items-center lg:items-start flex-col lg:flex-col justify-center py-6 px-4">
      <div className="max-w-md  lg:max-w-fit w-full bg-gray-200 p-4 rounded-xl shadow-lg">
        <h2 className="text-xl font-bold text-center text-gradient bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-600 mb-4">
          Fuel Cost Calculator
        </h2>

        <div className="space-y-4">
          {/* Distance Input */}
          <div className="flex items-center flex-col md:flex-row ">
            <label className="block  text-md font-medium text-blue-800 mr-2" htmlFor="distance">
              Distance Traveled
            </label>
            <input
              type="number"
              id="distance"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              className={`mt-2 w-full p-3 border-2 ${errorFields.distance ? 'border-red-500' : 'border-green-400'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500`}
              placeholder="Enter distance"
            />
          </div>

          {/* Fuel Price Input */}
          <div className="flex lg:gap-2 items-center flex-col md:flex-row ">
            <label className="block w-36 text-md font-medium text-blue-800 mr-2" htmlFor="fuelPrice">
              Fuel Price
            </label>
            <input
              type="number"
              id="fuelPrice"
              value={fuelPrice}
              onChange={(e) => setFuelPrice(e.target.value)}
              className={`mt-2 w-full p-3 border-2 ${errorFields.fuelPrice ? 'border-red-500' : 'border-yellow-400'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500`}
              placeholder="Enter fuel price"
            />
            <select
              value={fuelPriceUnit}
              onChange={(e) => setFuelPriceUnit(e.target.value)}
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg"
            >
              <option value="liters">Liters</option>
              <option value="gallons">Gallons</option>
            </select>
          </div>

          {/* Average per Liter Input */}
          <div className="flex lg:gap-2 items-center flex-col md:flex-row">
            <label className="block text-start text-md font-medium text-blue-800 mr-2" htmlFor="avgPerLiter">
              Average Consumption
            </label>
            <input
              type="number"
              id="avgPerLiter"
              value={avgPerLiter}
              onChange={(e) => setAvgPerLiter(e.target.value)}
              className={`mt-2 w-full p-3 border-2 ${errorFields.avgPerLiter ? 'border-red-500' : 'border-teal-400'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500`}
              placeholder="Enter average consumption"
            />
            <select
              value={avgUnit}
              onChange={(e) => setAvgUnit(e.target.value)}
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg"
            >
              <option value="liters">Liters</option>
              <option value="gallons">Gallons</option>
            </select>
          </div>

          {/* Unit Select Dropdown */}
          <div>
            <label className="block text-md font-medium text-center text-blue-800" htmlFor="unit">
              Select Distance Unit
            </label>
            <select
              id="unit"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg"
            >
              <option value="km">Kilometers</option>
              <option value="miles">Miles</option>
            </select>
          </div>

          {/* Calculate Button */}
          <div>
            <button
              onClick={calculateFuelCost}
              className="w-full p-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-md font-semibold rounded-lg shadow-md hover:bg-gradient-to-l hover:from-blue-600 hover:to-indigo-500 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              Calculate
            </button>
          </div>

          {/* Result Display */}
          <div className={`mt-4 text-center text-lg font-semibold ${result.includes("Please fill") ? 'text-red-600' : 'text-green-600'} min-h-[40px]`}>
            {result}
          </div>
        </div>
      </div>

      {/* Informative Section */}
    
<div className=" w-full   p-6 rounded-2xl shadow-xl bg-gray-200">
  <div className="space-y-6">
    {/* Title of the section with a bold and colorful gradient */}
    <h2 className="text-3xl font-extrabold text-center tracking-wide uppercase">
      Fuel Cost Calculator
    </h2>
    
    {/* Description with softer colors but still engaging */}
    <p className="text-base">
      A Fuel Average Calculator helps you track your vehicle's fuel efficiency by calculating the
      distance you can travel per unit of fuel. It helps you understand your car's fuel consumption
      and make more informed decisions about your driving habits and fuel usage.
    </p>

    {/* Instructions with vibrant bullet points */}
    <div className="space-y-3">
      <p className="text-sm -300 font-medium">To calculate fuel efficiency:</p>
      <ul className="list-inside list-disc -100 space-y-2 pl-5">
        <li>Enter the total distance traveled in miles or kilometers.</li>
        <li>Enter the amount of fuel consumed in gallons or liters.</li>
        <li>Use the formula: <strong className="-200">Distance Traveled ÷ Fuel Consumed = Fuel Efficiency</strong>.</li>
      </ul>
    </div>

    {/* Example calculation with a colorful background */}
    <div className="bg-yellow-50 p-4 rounded-lg border ">
      <p className="text-sm text-gray-800">
        For example, if you traveled 500 kilometers and used 40 liters of fuel:
        <br />
        <strong className="text-green-600">Fuel Efficiency = 500 ÷ 40 = 12.5 KPL (Kilometers per Liter)</strong>
      </p>
    </div>
    
    {/* Additional call to action with gradient text */}
    <p className="text-sm text-black uppercase font-bold underline text-center">
      Start tracking your fuel efficiency today and make smarter driving decisions!
    </p>
    
  </div>
</div>

    </div>
  );
};

export default FuelCalculator;