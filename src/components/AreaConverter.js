import React, { useState } from 'react';

// Conversion factors for various area units
const conversionRates = {
    acre: 4046.86,
    'acre (cheshire)': 4046.86,
    alqueire: 24200,
    ankanam: 4046.86,
    arpents: 3445.5,
    barn: 1e-28,
    barrel: 0.00378541,
    bigha: 1338.8,
    bunder: 4046.86,
    caballeria: 39300,
    cambodianMat: 0.0004,
    carucate: 4860000,
    cawnie: 4000,
    cent: 40.4686,
    cottah: 33.9,
    cuerda: 3940,
    davoch: 48600000,
    decimal: 40.4686,
    dessiatin: 10925,
    dunam: 1000,
    feddan: 4200,
    fen: 666.67,
    ground: 240,
    gunta: 101.17,
    hectad: 10000,
    hectare: 10000,
    hide: 4860000,
    irishAcre: 6555,
    jerib: 2000,
    juchart: 16187.4,
    jugerum: 2520,
    kanal: 505.857,
    katha: 67.5,
};

const AreaConverter = () => {
    const [value, setValue] = useState('');
    const [fromUnit, setFromUnit] = useState('acre');
    const [toUnit, setToUnit] = useState('hectare');
    const [fromSearch, setFromSearch] = useState('');
    const [toSearch, setToSearch] = useState('');

    // Function to handle area conversion
    const convertArea = (inputValue, from, to) => {
        const baseValue = parseFloat(inputValue) * (conversionRates[from] || 1);
        const result = baseValue / (conversionRates[to] || 1);
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
        ? convertArea(parseFloat(value), fromUnit, toUnit).toFixed(4)
        : '0.0000';

    return (

    <div className="min-h-screen w-full flex  gap-4 items-center lg:items-start   flex-col lg:flex-col justify-center  ">

<div className="max-w-md w-full bg-gray-200 p-4 rounded-xl shadow-lg  ">
            <h2 className="text-2xl font-bold mb-4 text-center">Area Converter</h2>

            {/* Input value for area conversion */}
            <div className="mb-4">
                <label className="mb-2">From Area Value:</label>
                <input
                    type="number"
                    value={value}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-lg p-2 w-full"
                    placeholder="Enter area value"
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
                        {Object.keys(conversionRates)
                            .filter((unit) => unit.toLowerCase().includes(toSearch.toLowerCase()))
                            .map((unit) => {
                                const result = value
                                    ? convertArea(parseFloat(value), fromUnit, unit).toFixed(4)
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
 
   <div className=" w-full p-4 rounded-xl shadow-lg bg-gray-200">
  <div className="space-y-4">


    <h2 className="text-xl font-semibold">Area Converter</h2>
    <p>An area converter is a tool designed to convert one unit of area to another, allowing for seamless conversions between different systems of measurement, such as the metric and imperial systems. This is especially useful in fields like real estate, construction, geography, and land development where accurate area measurements are needed.</p>

    <h3 className="text-lg font-medium">Key Concepts of Area Conversion:</h3>
    <ul className="list-disc pl-5">
      <li><strong>Units of Area:</strong> 
        <ul className="list-inside list-disc">
          <li><strong>Metric System:</strong> Units of area in the metric system include square millimeters (mm²), square centimeters (cm²), square meters (m²), and square kilometers (km²).</li>
          <li><strong>Imperial System:</strong> In the imperial system, units such as square inches (in²), square feet (ft²), square yards (yd²), and acres (ac) are commonly used.</li>
        </ul>
      </li>
      <li><strong>Conversion Factors:</strong> Specific numerical factors are used to convert between units of area. For example:
        <ul className="list-inside list-disc">
          <li>1 square meter (m²) = 10,000 square centimeters (cm²)</li>
          <li>1 square yard (yd²) = 9 square feet (ft²)</li>
          <li>1 acre = 43,560 square feet (ft²)</li>
          <li>1 square kilometer (km²) = 1,000,000 square meters (m²)</li>
        </ul>
      </li>
      <li><strong>Types of Converters:</strong> 
        <ul className="list-inside list-disc">
          <li><strong>Manual Conversion:</strong> Uses mathematical formulas and conversion factors to manually perform area conversions.</li>
          <li><strong>Online or Digital Converters:</strong> These provide an easy way to convert area units quickly by inputting a value into an online tool or mobile app.</li>
        </ul>
      </li>
      <li><strong>Applications of Area Conversion:</strong> 
        <ul className="list-inside list-disc">
          <li><strong>Real Estate:</strong> Converting acres to square feet or square meters when buying or selling land or property.</li>
          <li><strong>Construction:</strong> Determining land area for building projects or calculating material quantities based on surface area.</li>
          <li><strong>Geography:</strong> Measuring areas of land, bodies of water, or ecological regions.</li>
          <li><strong>Gardening and Landscaping:</strong> Calculating the area of a garden or yard to determine how much seed, soil, or sod is needed.</li>
        </ul>
      </li>
    </ul>

    <h3 className="text-lg font-medium">Example Conversion:</h3>
    <p>Suppose you need to convert 2 acres to square feet. Using the conversion factor:
      <ul className="list-inside list-disc">
        <li>1 acre = 43,560 square feet (ft²)</li>
        <li>Therefore, 2 acres = 2 × 43,560 = 87,120 square feet (ft²).</li>
      </ul>
    </p>

    <h3 className="text-lg font-medium">Conclusion:</h3>
    <p>Area converters help users quickly switch between different units of area, improving efficiency and accuracy in tasks such as property valuation, construction, and land measurement. Whether you're working manually or using a digital tool, an area converter is an essential tool in many fields that rely on area measurements.</p>
  </div>
</div>



                                    
     </div>
    );
};

export default AreaConverter;
