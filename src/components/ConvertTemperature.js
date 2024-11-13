import React, { useState } from 'react';

// Conversion functions for temperature
const convertTemperature = (value, fromUnit, toUnit) => {
    let celsius;

    // Convert input value to Celsius
    switch (fromUnit) {
        case 'Celsius':
            celsius = value;
            break;
        case 'Fahrenheit':
            celsius = (value - 32) * (5 / 9);
            break;
        case 'Kelvin':
            celsius = value - 273.15;
            break;
        default:
            return null;
    }

    // Convert Celsius to target unit
    switch (toUnit) {
        case 'Celsius':
            return celsius;
        case 'Fahrenheit':
            return celsius * (9 / 5) + 32;
        case 'Kelvin':
            return celsius + 273.15;
        default:
            return null;
    }
};

const TemperatureConverter = () => {
    const [value, setValue] = useState('');
    const [fromUnit, setFromUnit] = useState('Celsius');
    const [toUnit, setToUnit] = useState('Fahrenheit');
    const [fromSearch, setFromSearch] = useState('');
    const [toSearch, setToSearch] = useState('');

    // Function to handle input value change
    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        setValue(inputValue);
    };

    // Function to handle "From Unit" selection change
    const handleFromUnitChange = (unit) => {
        setFromUnit(unit);
    };

    // Function to handle "To Unit" selection change
    const handleToUnitChange = (unit) => {
        setToUnit(unit);
    };

    // Get the conversion result
    const conversionResult = value
        ? convertTemperature(parseFloat(value), fromUnit, toUnit).toFixed(4)
        : '0.0000';

    return (
        <div className="min-h-screen w-full flex  gap-4 items-center lg:items-start   flex-col lg:flex-col justify-center  ">

        <div className="max-w-md w-full bg-gray-200 p-4 rounded-xl shadow-lg  ">
                    <h2 className="text-2xl font-bold mb-4 text-center">Temperature Converter</h2>

            {/* Input for value */}
            <div className="mb-4">
                <label className="mb-2">From Temperature Value:</label>
                <input
                    type="number"
                    value={value}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-lg p-2 w-full"
                    placeholder="Enter temperature value"
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
                        {['Celsius', 'Fahrenheit', 'Kelvin']
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
                        {['Celsius', 'Fahrenheit', 'Kelvin']
                            .filter((unit) => unit.toLowerCase().includes(toSearch.toLowerCase()))
                            .map((unit) => {
                                const result = value
                                    ? convertTemperature(parseFloat(value), fromUnit, unit).toFixed(4)
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

            {/* Final Conversion Result */}
            <div className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded-lg text-center">
                <h3 className="text-xl font-semibold">Conversion Summary</h3>
                <p className="text-lg">
                    {value || '0'} {fromUnit} = {conversionResult} {toUnit}
                </p>
            </div>
        </div>
                                {/* ABOUT */}

   <div className="w-full  p-4 rounded-xl shadow-lg bg-gray-200">
  <div className="space-y-4">
    <h2 className="text-xl font-semibold">Temperature Converter</h2>
    <p>A temperature converter is a tool used to convert one unit of temperature to another. This is especially useful when dealing with different temperature measurement systems such as Celsius, Fahrenheit, and Kelvin. Temperature conversion is important in many fields, such as science, engineering, weather forecasting, and cooking.</p>

    <h3 className="text-lg font-medium">Key Concepts of Temperature Conversion:</h3>
    <ul className="list-disc pl-5">
      <li><strong>Units of Temperature:</strong>
        <ul className="list-inside list-disc">
          <li><strong>Celsius (°C):</strong> A temperature scale based on the freezing and boiling points of water. 0°C is the freezing point, and 100°C is the boiling point at standard atmospheric pressure.</li>
          <li><strong>Fahrenheit (°F):</strong> A temperature scale primarily used in the United States, where 32°F is the freezing point of water, and 212°F is the boiling point.</li>
          <li><strong>Kelvin (K):</strong> A temperature scale used in scientific work, where 0 K represents absolute zero (the lowest possible temperature), and the scale increments the same as Celsius. To convert between Celsius and Kelvin, simply add or subtract 273.15.</li>
        </ul>
      </li>
      <li><strong>Conversion Formulas:</strong> Specific formulas are used to convert between different temperature scales. The most common conversion formulas are:
        <ul className="list-inside list-disc">
          <li>From Celsius to Fahrenheit: <strong>°F = (°C × 9/5) + 32</strong></li>
          <li>From Fahrenheit to Celsius: <strong>°C = (°F - 32) × 5/9</strong></li>
          <li>From Celsius to Kelvin: <strong>K = °C + 273.15</strong></li>
          <li>From Kelvin to Celsius: <strong>°C = K - 273.15</strong></li>
          <li>From Fahrenheit to Kelvin: <strong>K = (°F - 32) × 5/9 + 273.15</strong></li>
          <li>From Kelvin to Fahrenheit: <strong>°F = (K - 273.15) × 9/5 + 32</strong></li>
        </ul>
      </li>
      <li><strong>Types of Converters:</strong> 
        <ul className="list-inside list-disc">
          <li><strong>Manual Conversion:</strong> This method involves using the formulas to manually calculate temperature conversions.</li>
          <li><strong>Online or Digital Converters:</strong> These are convenient tools where users input the temperature value and select the conversion units to automatically get the result.</li>
        </ul>
      </li>
      <li><strong>Applications of Temperature Conversion:</strong>
        <ul className="list-inside list-disc">
          <li><strong>Science and Engineering:</strong> Converting temperatures between units for experiments, research, and technical calculations.</li>
          <li><strong>Weather Forecasting:</strong> Converting temperature measurements between Celsius and Fahrenheit for weather reports.</li>
          <li><strong>Cooking:</strong> Converting oven temperatures from Fahrenheit to Celsius or vice versa for recipes that use different temperature scales.</li>
          <li><strong>International Travel:</strong> Converting temperature readings when traveling between countries that use different units for temperature.</li>
        </ul>
      </li>
    </ul>

    <h3 className="text-lg font-medium">Example Conversion:</h3>
    <p>Suppose you need to convert 25°C to Fahrenheit. Using the conversion formula:
      <ul className="list-inside list-disc">
        <li>°F = (°C × 9/5) + 32</li>
        <li>°F = (25 × 9/5) + 32 = 77°F</li>
      </ul>
    </p>

    <h3 className="text-lg font-medium">Conclusion:</h3>
    <p>Temperature converters are essential tools for quickly and accurately converting temperatures between different scales. Whether you're working in science, cooking, or simply need to understand weather reports from different parts of the world, a temperature converter helps make the process easier and more precise.</p>
  </div>
</div>

        </div>
    );
};

export default TemperatureConverter;
