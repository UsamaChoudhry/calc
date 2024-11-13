import React, { useState } from 'react';

// Conversion factors for length units
const conversionRates = {
    meters: 1,
    kilometers: 0.001,
    feet: 3.28084,
    miles: 0.000621371,
    centimeters: 100,
    millimeters: 1000,
    micrometers: 1e6,
    nanometers: 1e9,
    yards: 1.09361,
    inches: 39.3701,
};

const LengthConverter = () => {
    const [value, setValue] = useState('');
    const [fromUnit, setFromUnit] = useState('meters');
    const [toUnit, setToUnit] = useState('feet');
    const [fromSearch, setFromSearch] = useState('');
    const [toSearch, setToSearch] = useState('');

    // Function to handle length conversion
    const convertLength = (inputValue, from, to) => {
        const baseValue = inputValue / conversionRates[from];
        const result = baseValue * conversionRates[to];
        return isNaN(result) ? 0 : result;
    };

    // Handle input change for the length value
    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        setValue(inputValue);
    };

    // Handle "From Unit" selection change
    const handleFromUnitChange = (unit) => {
        setFromUnit(unit);
    };

    // Handle "To Unit" selection change
    const handleToUnitChange = (unit) => {
        setToUnit(unit);
    };

    // Get conversion result based on selected units and input value
    const conversionResult = value
        ? convertLength(parseFloat(value), fromUnit, toUnit).toFixed(4)
        : '0.0000';

    return (
    <div className="min-h-screen w-full flex  gap-4 items-center lg:items-start   flex-col lg:flex-col justify-center  ">
<div className="max-w-md w-full bg-gray-200 p-4 rounded-xl shadow-lg  ">
<h2 className="text-2xl font-bold mb-4 text-center">Length Converter</h2>

            {/* Input value for length conversion */}
            <div className="mb-4">
                <label className="mb-2">From Length Value:</label>
                <input
                    type="number"
                    value={value}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-lg p-2 w-full"
                    placeholder="Enter length value"
                />
            </div>

            <div className="flex flex-col sm:flex-row sm:space-x-4 mb-4">
                {/* From Unit List with Search */}
                <div className="flex flex-col w-full sm:w-1/2 mb-4 sm:mb-0">
                    <label className="mb-2">From Unit:</label>
                    <input
                        type="text"
                        value={fromSearch}
                        onChange={(e) => setFromSearch(e.target.value)}
                        className="border border-gray-300 rounded-lg p-2 mb-2"
                        placeholder="Search from unit"
                    />
                    <ul className="border border-gray-300 rounded-lg p-2 h-40 overflow-y-scroll">
                        {Object.keys(conversionRates)
                            .filter((unit) => unit.toLowerCase().includes(fromSearch.toLowerCase()))
                            .map((unit) => (
                                <li
                                    key={unit}
                                    className={`cursor-pointer hover:bg-gray-200 ${fromUnit === unit ? 'font-bold' : ''}`}
                                    onClick={() => handleFromUnitChange(unit)}
                                >
                                    {unit}
                                </li>
                            ))}
                    </ul>
                </div>

                {/* To Unit List with Search and Click to Update Conversion Summary */}
                <div className="flex flex-col w-full sm:w-1/2">
                    <label className="mb-2">To Unit (Results):</label>
                    <input
                        type="text"
                        value={toSearch}
                        onChange={(e) => setToSearch(e.target.value)}
                        className="border border-gray-300 rounded-lg p-2 mb-2"
                        placeholder="Search to unit"
                    />
                    <ul className="border border-gray-300 rounded-lg p-2 h-40 overflow-y-scroll">
                        {Object.keys(conversionRates)
                            .filter((unit) => unit.toLowerCase().includes(toSearch.toLowerCase()))
                            .map((unit) => {
                                const result = value
                                    ? convertLength(parseFloat(value), fromUnit, unit).toFixed(4)
                                    : '0.0000';
                                return (
                                    <li
                                        key={unit}
                                        className="flex justify-between cursor-pointer hover:bg-gray-200"
                                        onClick={() => handleToUnitChange(unit)}
                                    >
                                        <span>{unit}</span>
                                        <span>{result}</span>
                                    </li>
                                );
                            })}
                    </ul>
                </div>
            </div>

            {/* Display of the final conversion result */}
            <div className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded-lg text-center">
                <h3 className="text-xl font-semibold">Conversion Summary</h3>
                <p className="text-lg">
                    {value || '0'} {fromUnit} = {conversionResult} {toUnit}
                </p>
            </div>
        </div>

        <div className=" w-full  p-4 rounded-xl shadow-lg bg-gray-200">
  <div className="space-y-4">
    <h2 className="text-xl font-semibold">Length Converter</h2>
    <p>A length converter is a tool or device that helps users convert one unit of length to another. It is especially useful when working with measurements in different systems, such as the metric system and the imperial system. Length conversion is a common task in various fields, such as construction, engineering, science, and everyday activities, like cooking or travel.</p>

    <h3 className="text-lg font-medium">Key Concepts of Length Conversion:</h3>
    <ul className="list-disc pl-5">
      <li><strong>Units of Length:</strong> 
        <ul className="list-inside list-disc">
          <li><strong>Metric System:</strong> Common metric units of length include millimeters (mm), centimeters (cm), meters (m), and kilometers (km).</li>
          <li><strong>Imperial System:</strong> In the imperial system, units such as inches (in), feet (ft), yards (yd), and miles (mi) are commonly used.</li>
        </ul>
      </li>
      <li><strong>Conversion Factors:</strong> To convert between units, specific numerical factors are used. For example:
        <ul className="list-inside list-disc">
          <li>1 inch = 2.54 cm</li>
          <li>1 foot = 12 inches</li>
          <li>1 meter = 100 cm</li>
          <li>1 mile = 1.60934 kilometers</li>
        </ul>
      </li>
      <li><strong>Types of Converters:</strong> 
        <ul className="list-inside list-disc">
          <li><strong>Manual Conversion:</strong> Involves using formulas and conversion factors to manually perform the conversion.</li>
          <li><strong>Online or Digital Converters:</strong> These are tools that automatically convert between different units of length when you input a value.</li>
        </ul>
      </li>
      <li><strong>Applications of Length Conversion:</strong> 
        <ul className="list-inside list-disc">
          <li><strong>Travel:</strong> Converting miles to kilometers or vice versa when traveling between countries using different systems.</li>
          <li><strong>Construction and Design:</strong> Converting between feet and meters when working with blueprints or architectural plans.</li>
          <li><strong>Scientific Research:</strong> Converting units of length in experiments or measurements.</li>
          <li><strong>Everyday Activities:</strong> For example, converting inches to centimeters when buying clothes, or converting kilometers to miles for a road trip.</li>
        </ul>
      </li>
    </ul>

    <h3 className="text-lg font-medium">Example Conversion:</h3>
    <p>Suppose you need to convert 5 kilometers to miles. Using the conversion factor:
      <ul className="list-inside list-disc">
        <li>1 kilometer = 0.621371 miles.</li>
        <li>Therefore, 5 kilometers = 5 × 0.621371 = 3.106855 miles.</li>
      </ul>
    </p>

    <h3 className="text-lg font-medium">Conclusion:</h3>
    <p>Length converters make it easy to switch between different units of length, ensuring accuracy and saving time in both professional and daily tasks. With both manual and digital methods available, anyone can quickly perform these conversions with ease.</p>
  </div>
</div>

     </div>
    );
};

export default LengthConverter;
