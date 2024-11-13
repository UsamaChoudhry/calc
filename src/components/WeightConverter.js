import React, { useState } from 'react';

// Conversion factors for various weight units to grams
const weightConversionRates = {
    kilogram: 1000, // 1 kilogram = 1000 grams
    gram: 1,        // 1 gram = 1 gram
    milligram: 0.001, // 1 milligram = 0.001 grams
    'metric ton': 1e6, // 1 metric ton = 1,000,000 grams
    'long ton': 1.016e6, // 1 long ton (UK) = 1,016,046.91 grams
    'short ton': 907185, // 1 short ton (US) = 907,185 grams
    pound: 453.592, // 1 pound = 453.592 grams
    ounce: 28.3495, // 1 ounce = 28.3495 grams
    carat: 0.2,     // 1 carat = 0.2 grams
    'atomic mass unit': 1.6605390666e-24, // 1 atomic mass unit = 1.6605390666e-24 grams
};

const WeightConverter = () => {
    const [value, setValue] = useState('');
    const [fromUnit, setFromUnit] = useState('kilogram');
    const [toUnit, setToUnit] = useState('gram');
    const [fromSearch, setFromSearch] = useState('');
    const [toSearch, setToSearch] = useState('');

    // Function to handle weight conversion
    const convertWeight = (inputValue, from, to) => {
        const baseValue = parseFloat(inputValue) * (weightConversionRates[from] || 1);
        const result = baseValue / (weightConversionRates[to] || 1);
        return isNaN(result) ? 0 : result;
    };

    // Handle input change
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
        ? convertWeight(parseFloat(value), fromUnit, toUnit).toFixed(4)
        : '0.0000';

    return (
        <div className="min-h-screen w-full flex  gap-4 items-center lg:items-start   flex-col lg:flex-col justify-center  ">
        <div className="max-w-md w-full bg-gray-200 p-4 rounded-xl shadow-lg  ">
                    <h2 className="text-2xl font-bold mb-4 text-center">Weight Converter</h2>

            {/* Input value for weight conversion */}
            <div className="mb-4">
                <label className="mb-2">From Weight Value:</label>
                <input
                    type="number"
                    value={value}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-lg p-2 w-full"
                    placeholder="Enter weight value"
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
                        {Object.keys(weightConversionRates)
                            .filter((unit) => unit.toLowerCase().includes(fromSearch.toLowerCase()))
                            .map((unit) => (
                                <li
                                    key={unit}
                                    className={`cursor-pointer hover:bg-gray-200 ${
                                        fromUnit === unit ? 'font-bold' : ''
                                    }`}
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
                        {Object.keys(weightConversionRates)
                            .filter((unit) => unit.toLowerCase().includes(toSearch.toLowerCase()))
                            .map((unit) => {
                                const result = value
                                    ? convertWeight(parseFloat(value), fromUnit, unit).toFixed(4)
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

            {/* Display of the final selected conversion result */}
            <div className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded-lg text-center">
                <h3 className="text-xl font-semibold">Conversion Summary</h3>
                <p className="text-lg">
                    {value || '0'} {fromUnit} = {conversionResult} {toUnit}
                </p>
            </div>
        </div>          
                                                    {/* ABOUT */}
 <div className=" w-full bg-gray-200 p-4 rounded-xl shadow-lg">
  <div className="space-y-4">
    <h2 className="text-xl font-semibold">Weight Converter</h2>
    <p>A weight converter is a tool used to convert one unit of weight to another. This is particularly useful when working with different measurement systems, such as the metric system and the imperial system. Weight conversion is essential in many fields, including nutrition, science, engineering, and logistics, where accurate weight measurements are required.</p>

    <h3 className="text-lg font-medium">Key Concepts of Weight Conversion:</h3>
    <ul className="list-disc pl-5">
      <li><strong>Units of Weight:</strong>
        <ul className="list-inside list-disc">
          <li><strong>Metric System:</strong> Common units of weight in the metric system include milligrams (mg), grams (g), kilograms (kg), and metric tons (t).</li>
          <li><strong>Imperial System:</strong> Units of weight in the imperial system include ounces (oz), pounds (lbs), and stones (st).</li>
        </ul>
      </li>
      <li><strong>Conversion Factors:</strong> To convert between units of weight, specific numerical factors are used. For example:
        <ul className="list-inside list-disc">
          <li>1 kilogram (kg) = 1,000 grams (g)</li>
          <li>1 pound (lbs) = 16 ounces (oz)</li>
          <li>1 stone (st) = 14 pounds (lbs)</li>
          <li>1 metric ton (t) = 1,000 kilograms (kg)</li>
        </ul>
      </li>
      <li><strong>Types of Converters:</strong>
        <ul className="list-inside list-disc">
          <li><strong>Manual Conversion:</strong> This method involves using conversion factors and formulas to manually calculate weight conversions.</li>
          <li><strong>Online or Digital Converters:</strong> These tools allow users to input a weight value and instantly convert it to different units of weight.</li>
        </ul>
      </li>
      <li><strong>Applications of Weight Conversion:</strong>
        <ul className="list-inside list-disc">
          <li><strong>Nutrition and Health:</strong> Converting between pounds and kilograms for personal health or food packaging information.</li>
          <li><strong>Shipping and Logistics:</strong> Converting weight units when calculating shipping costs, determining cargo weight, or handling freight.</li>
          <li><strong>Engineering and Manufacturing:</strong> Converting weight measurements in material calculations, load-bearing capacities, or machinery specifications.</li>
          <li><strong>Everyday Use:</strong> Converting weight for personal purposes, such as weighing food, pets, or body weight.</li>
        </ul>
      </li>
    </ul>

    <h3 className="text-lg font-medium">Example Conversion:</h3>
    <p>Suppose you need to convert 5 kilograms to pounds. Using the conversion factor:
      <ul className="list-inside list-disc">
        <li>1 kilogram (kg) = 2.20462 pounds (lbs)</li>
        <li>Therefore, 5 kilograms = 5 × 2.20462 = 11.0231 pounds (lbs).</li>
      </ul>
    </p>

    <h3 className="text-lg font-medium">Conclusion:</h3>
    <p>Weight converters are essential tools for quickly and accurately converting between different units of weight. Whether you're in health, logistics, engineering, or simply converting for everyday use, having access to a weight converter helps make these conversions seamless and efficient.</p>
  </div>
</div>


   </div>
    );
};

export default WeightConverter;
