import React, { useState } from 'react';

// Conversion factors to cubic meters (m³) for various volume units
const volumeConversionRates = {
    "Acetabulum (unit)": 0.000068,
    "Acre-foot": 1233.48,
    "Adowlie": 0.004,
    "Almud": 0.016,
    "Almude": 0.01,
    "Alqueire": 0.036,
    "Amphora (unit)": 0.026,
    "Anker (unit)": 0.0387,
    "Aum (unit)": 0.145,
    "Bag (unit)": 0.1,
    "Barrel (unit)": 0.159,
    "Billion cubic metres of natural gas": 1e9,
    "Board foot": 0.00236,
    "Bushel": 0.03524,
    "Butt (unit)": 0.477,
    "Cavan (unit)": 0.025,
    "Chopin (unit)": 0.00079,
    "Cubic centimetre": 1e-6,
    "Cubic foot": 0.02832,
    "Cubic inch": 1.63871e-5,
    "Cubic metre": 1,
    "Cubic mile": 4.168e9,
    "Cubic ton": 1.133,
    "Cubic yard": 0.7646,
    "Cup (unit)": 0.00024,
    "Gallon": 0.00378541,
    "Litre": 0.001,
    "Minim (unit)": 6.16115e-8,
    "Pint": 0.000473,
    "Quart": 0.000946,
    "Tablespoon": 1.47868e-5,
    "Teaspoon": 4.92892e-6,
    "Ton": 1.0,
    "Wine gallon": 0.00378
};

const VolumeConverter = () => {
    const [value, setValue] = useState('');
    const [fromUnit, setFromUnit] = useState('Gallon');
    const [toUnit, setToUnit] = useState('Litre');
    const [convertedValue, setConvertedValue] = useState('0.0000');
    const [fromSearch, setFromSearch] = useState('');
    const [toSearch, setToSearch] = useState('');

    // Function to convert volume
    const convertVolume = (inputValue, from, to) => {
        const baseValue = parseFloat(inputValue) * (volumeConversionRates[from] || 1); // Convert to cubic meters
        const result = baseValue / (volumeConversionRates[to] || 1); // Convert to target unit
        return isNaN(result) ? 0 : result;
    };

    // Handle input change
    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        setValue(inputValue);

        if (inputValue) {
            const result = convertVolume(inputValue, fromUnit, toUnit);
            setConvertedValue(result.toFixed(4)); // Limit to 4 decimal places
        } else {
            setConvertedValue('0.0000'); // Reset if input is empty
        }
    };

    // Handle unit change
    const handleUnitChange = (unit, isFromUnit) => {
        if (isFromUnit) {
            setFromUnit(unit);
            const result = convertVolume(value, unit, toUnit);
            setConvertedValue(result.toFixed(4));
        } else {
            setToUnit(unit);
            const result = convertVolume(value, fromUnit, unit);
            setConvertedValue(result.toFixed(4));
        }
    };

    return (
        <div className="min-h-screen w-full flex  gap-4 items-center lg:items-start   flex-col lg:flex-col justify-center  ">
        <div className="max-w-md w-full bg-gray-200 p-4 rounded-xl shadow-lg  ">
                    <h2 className="text-2xl font-bold mb-4 text-center">Volume Converter</h2>
            
            {/* Input volume */}
            <div className="mb-4">
                <label className="mb-2">Input Volume:</label>
                <input
                    type="number"
                    value={value}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-lg p-2 w-full"
                    placeholder="Enter volume"
                />
            </div>

            <div className="flex flex-col sm:flex-row sm:space-x-4 mb-4">
                {/* From Unit Search and List */}
                <div className="flex flex-col w-full sm:w-1/2 mb-4 sm:mb-0">
                    <label className="mb-2">From Unit:</label>
                    <input
                        type="text"
                        value={fromSearch}
                        onChange={(e) => setFromSearch(e.target.value)}
                        className="border border-gray-300 rounded-lg p-2 mb-2"
                        placeholder="Search unit"
                    />
                    <ul className="border border-gray-300 rounded-lg p-2 h-40 overflow-y-scroll">
                        {Object.keys(volumeConversionRates)
                            .filter((unit) => unit.toLowerCase().includes(fromSearch.toLowerCase()))
                            .map((unit) => (
                                <li
                                    key={unit}
                                    className={`cursor-pointer hover:bg-gray-200 ${
                                        fromUnit === unit ? 'font-bold' : ''
                                    }`}
                                    onClick={() => handleUnitChange(unit, true)}
                                >
                                    {unit}
                                </li>
                            ))}
                    </ul>
                </div>

                {/* To Unit Search and List */}
                <div className="flex flex-col w-full sm:w-1/2">
                    <label className="mb-2">To Unit:</label>
                    <input
                        type="text"
                        value={toSearch}
                        onChange={(e) => setToSearch(e.target.value)}
                        className="border border-gray-300 rounded-lg p-2 mb-2"
                        placeholder="Search unit"
                    />
                    <ul className="border border-gray-300 rounded-lg p-2 h-40 overflow-y-scroll">
                        {Object.keys(volumeConversionRates)
                            .filter((unit) => unit.toLowerCase().includes(toSearch.toLowerCase()))
                            .map((unit) => (
                                <li
                                    key={unit}
                                    className={`cursor-pointer hover:bg-gray-200 ${
                                        toUnit === unit ? 'font-bold' : ''
                                    }`}
                                    onClick={() => handleUnitChange(unit, false)}
                                >
                                    {unit}
                                </li>
                            ))}
                    </ul>
                </div>
            </div>

            {/* Display conversion result */}
            <div className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded-lg text-center">
                <h3 className="text-xl font-semibold">Conversion Result:</h3>
                <p className="text-lg">{value} {fromUnit} = {convertedValue} {toUnit}</p>
            </div>
        </div>
                                {/* ABOUT */}


   <div className=" w-full bg-gray-200 p-4 rounded-xl shadow-lg">
  <div className="space-y-4">
    <h2 className="text-xl font-semibold">Volume Converter</h2>
    <p>A volume converter is a tool used to convert one unit of volume to another. This is especially useful when working with measurements in different systems, such as the metric system and the imperial system. Volume conversion is essential in many fields, such as cooking, chemistry, engineering, and construction, where precise volume measurements are critical.</p>

    <h3 className="text-lg font-medium">Key Concepts of Volume Conversion:</h3>
    <ul className="list-disc pl-5">
      <li><strong>Units of Volume:</strong>
        <ul className="list-inside list-disc">
          <li><strong>Metric System:</strong> Common units of volume in the metric system include milliliters (mL), liters (L), and cubic meters (m³).</li>
          <li><strong>Imperial System:</strong> Units of volume in the imperial system include fluid ounces (fl oz), cups (cup), pints (pt), quarts (qt), and gallons (gal).</li>
        </ul>
      </li>
      <li><strong>Conversion Factors:</strong> To convert between different units of volume, specific numerical factors are used. For example:
        <ul className="list-inside list-disc">
          <li>1 liter (L) = 1,000 milliliters (mL)</li>
          <li>1 gallon (gal) = 4 quarts (qt)</li>
          <li>1 quart (qt) = 2 pints (pt)</li>
          <li>1 pint (pt) = 2 cups (cup)</li>
          <li>1 cup = 8 fluid ounces (fl oz)</li>
        </ul>
      </li>
      <li><strong>Types of Converters:</strong>
        <ul className="list-inside list-disc">
          <li><strong>Manual Conversion:</strong> This method involves using mathematical formulas and conversion factors to manually calculate the volume conversion.</li>
          <li><strong>Online or Digital Converters:</strong> These tools allow users to input a volume value and instantly convert it to different units of volume.</li>
        </ul>
      </li>
      <li><strong>Applications of Volume Conversion:</strong>
        <ul className="list-inside list-disc">
          <li><strong>Cooking:</strong> Converting between different units like cups, liters, and fluid ounces when following recipes.</li>
          <li><strong>Chemistry:</strong> Converting volume measurements for solutions, liquids, or gases in laboratory experiments.</li>
          <li><strong>Engineering and Construction:</strong> Converting units for materials such as cement, paint, or water used in projects.</li>
          <li><strong>Real-World Measurements:</strong> Converting fuel quantities, beverage containers, and other everyday items that require volume measurements.</li>
        </ul>
      </li>
    </ul>

    <h3 className="text-lg font-medium">Example Conversion:</h3>
    <p>Suppose you need to convert 2 liters to milliliters. Using the conversion factor:
      <ul className="list-inside list-disc">
        <li>1 liter (L) = 1,000 milliliters (mL)</li>
        <li>Therefore, 2 liters = 2 × 1,000 = 2,000 milliliters (mL).</li>
      </ul>
    </p>

    <h3 className="text-lg font-medium">Conclusion:</h3>
    <p>Volume converters are essential tools that make it easy to switch between different units of volume. Whether you're cooking, conducting scientific experiments, or working on engineering projects, using the correct volume measurement is crucial, and a volume converter helps ensure accuracy and convenience.</p>
  </div>
</div>

     </div>
    );
};

export default VolumeConverter;
