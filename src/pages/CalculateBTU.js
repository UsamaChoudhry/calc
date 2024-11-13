import React, { useState } from 'react';

const BTUCalculator = () => {
    const [roomSize, setRoomSize] = useState('');
    const [roomSizeUnit, setRoomSizeUnit] = useState('sqft'); // Default to square feet
    const [ceilingHeight, setCeilingHeight] = useState('');
    const [ceilingHeightUnit, setCeilingHeightUnit] = useState('ft'); // Default to feet
    const [numPeople, setNumPeople] = useState('');
    const [roomType, setRoomType] = useState('Living Room');
    const [insulationCondition, setInsulationCondition] = useState('Good');
    const [sunExposure, setSunExposure] = useState('Low');
    const [climate, setClimate] = useState('Moderate');
    const [result, setResult] = useState("Enter values and click 'Calculate BTU'");
    const [emptyFields, setEmptyFields] = useState({}); // Track empty fields

    // Conversion functions
    const convertRoomSizeToSqFt = (size, unit) => {
        return unit === 'sqm' ? size * 10.764 : size; // Convert square meters to square feet
    };

    const convertCeilingHeightToFeet = (height, unit) => {
        return unit === 'm' ? height * 3.281 : height; // Convert meters to feet
    };

    // Function to calculate adjustments based on user input
    const getAdjustmentFactor = () => {
        let adjustmentFactor = 0;

        // Room Type adjustments
        switch (roomType) {
            case 'Kitchen':
                adjustmentFactor += 400; // Higher heat generation in kitchens
                break;
            case 'Bedroom':
                adjustmentFactor += 200; // Moderate heat generation in bedrooms
                break;
            default: // Living Room or others
                adjustmentFactor += 100; // Default adjustment
                break;
        }

        // Insulation Condition adjustments
        switch (insulationCondition) {
            case 'Poor':
                adjustmentFactor += 300; // More BTUs needed for poor insulation
                break;
            case 'Average':
                adjustmentFactor += 150; // Moderate adjustment for average insulation
                break;
            case 'Good':
                adjustmentFactor += 50; // Less adjustment for good insulation
                break;
            default:
                break;
        }

        // Sun Exposure adjustments
        switch (sunExposure) {
            case 'High':
                adjustmentFactor += 250; // More cooling needed for high sun exposure
                break;
            case 'Medium':
                adjustmentFactor += 150; // Moderate adjustment for medium exposure
                break;
            case 'Low':
                adjustmentFactor += 50; // Less adjustment for low exposure
                break;
            default:
                break;
        }

        // Climate adjustments
        switch (climate) {
            case 'Hot':
                adjustmentFactor += 300; // More cooling needed in hot climates
                break;
            case 'Cold':
                adjustmentFactor -= 100; // Less cooling needed in cold climates
                break;
            default:
                break;
        }

        return adjustmentFactor;
    };

    const calculateBTU = () => {
        let hasEmptyFields = false;
        const newEmptyFields = {};

        if (!roomSize) {
            newEmptyFields.roomSize = true;
            hasEmptyFields = true;
        }
        if (!ceilingHeight) {
            newEmptyFields.ceilingHeight = true;
            hasEmptyFields = true;
        }
        if (!numPeople) {
            newEmptyFields.numPeople = true;
            hasEmptyFields = true;
        }

        if (hasEmptyFields) {
            blinkEmptyFields(newEmptyFields);
            setResult("Please fill all fields."); 
            return;
        }

        const convertedRoomSize = convertRoomSizeToSqFt(roomSize, roomSizeUnit);
        const convertedCeilingHeight = convertCeilingHeightToFeet(ceilingHeight, ceilingHeightUnit);
        
        let baseBTU = (convertedRoomSize * convertedCeilingHeight * 5); // Base calculation
        
        baseBTU += numPeople * 400; // Adding BTUs per person

        // Adjust based on user selections
        baseBTU += getAdjustmentFactor();

        setResult(`Required BTUs: ${baseBTU}`);
        setEmptyFields({}); 
    };

    const blinkEmptyFields = (fields) => {
        setEmptyFields(fields);
        
        setTimeout(() => {
            setEmptyFields({});
        }, 1000);
    };

    return (
        <div className="min-h-screen  flex gap-4  items-center lg:items-start flex-col lg:flex-col justify-center py-6 px-4">
            <div className=" lg:max-w-fit w-full bg-gray-200  p-4 rounded-xl shadow-lg">
                <h1 className="text-xl font-bold mb-4 text-center">BTU Calculator</h1>
                <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4"> {/* Changed to single column on mobile */}
                    <label className="text-sm ">Room Size:</label>
                    <div className="flex flex-col md:flex-row">
                        <input 
                            type="number" 
                            placeholder="Enter size" 
                            value={roomSize} 
                            onChange={(e) => setRoomSize(e.target.value)} 
                            className={`p-2 border rounded-lg  border-yellow-300 w-full md:w-[80%] ${emptyFields.roomSize ? 'bg-red-500' : ''}`} 
                        />
                        <select value={roomSizeUnit} onChange={(e) => setRoomSizeUnit(e.target.value)} className="p-2 rounded-lg border border-red-300  mt-2 md:mt-0 md:ml-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                            <option value="sqft">Square Feet</option>
                            <option value="sqm">Square Meters</option>
                        </select>
                    </div>
                    <label className="text-sm">Ceiling Height:</label>
                    <div className="flex flex-col md:flex-row">
                        <input 
                            type="number" 
                            placeholder="Enter height" 
                            value={ceilingHeight} 
                            onChange={(e) => setCeilingHeight(e.target.value)} 
                            className={`p-2 border rounded-lg border-gray-300  w-full ${emptyFields.ceilingHeight ? 'bg-red-500' : ''}`} 
                        />
                        <select value={ceilingHeightUnit} onChange={(e) => setCeilingHeightUnit(e.target.value)} className="p-2 rounded-lg border border-purple-300  mt-2 md:mt-0 md:ml-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500">
                            <option value="ft">Feet</option>
                            <option value="m">Meters</option>
                        </select>
                    </div>
                    <label className="text-sm">Number of People:</label>
                    <input 
                        type="number" 
                        placeholder="Enter number" 
                        value={numPeople} 
                        onChange={(e) => setNumPeople(e.target.value)} 
                        className={`p-2 rounded-lg border border-gray-300  ${emptyFields.numPeople ? 'bg-red-500' : ''}`} 
                    />
                    <label className="text-sm">Room Type:</label>
                    <select value={roomType} onChange={(e) => setRoomType(e.target.value)} className="p-2 border border-red-300 rounded-lg">
                        <option value="Living Room">Living Room</option>
                        <option value="Bedroom">Bedroom</option>
                        <option value="Kitchen">Kitchen</option>
                    </select>
                    <label className="text-sm">Insulation Condition:</label>
                    <select value={insulationCondition} onChange={(e) => setInsulationCondition(e.target.value)} className="p-2 border border-green-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500">
                        <option value="Good">Good</option>
                        <option value="Average">Average</option>
                        <option value="Poor">Poor</option>
                    </select>
                    <label className="text-sm">Sun Exposure:</label>
                    <select value={sunExposure} onChange={(e) => setSunExposure(e.target.value)} className="p-2 border border-pink-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500">
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                    <label className="text-sm">Climate:</label>
                    <select value={climate} onChange={(e) => setClimate(e.target.value)} className="p-2 border border-yellow-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black-500">
                        <option value="Moderate">Moderate</option>
                        <option value="Hot">Hot</option>
                        <option value="Cold">Cold</option>
                    </select>
                </div>

                {/* Button to calculate BTU */}
                <button onClick={calculateBTU} className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 mb-4">
                    Calculate BTU
                </button>

                {/* Always visible result field */}
                {result && (
                    <div className="mt-4 text-lg font-semibold text-center">{result}</div>
                )}
            </div>
   <div className=" w-full bg-gray-200  p-4 rounded-xl shadow-lg">
  <div className="space-y-4">
    
    <h2 className="text-xl font-bold">BTU Calculator</h2>
    <p>
      A <strong>BTU (British Thermal Unit) Calculator</strong> is a tool used to determine the amount of heating or cooling power needed for a given space. It is essential when selecting air conditioners, heaters, or other HVAC systems to ensure optimal comfort and efficiency.
    </p>
    
    <h3 className="text-lg font-semibold">What is BTU?</h3>
    <p>
      A <strong>BTU</strong> is a unit of measurement for energy. It is defined as the amount of heat required to raise the temperature of one pound of water by one degree Fahrenheit. In the context of air conditioners and heaters, BTU ratings indicate the capacity of the system to heat or cool an area.
    </p>
    
    <h3 className="text-lg font-semibold">Why Use a BTU Calculator?</h3>
    <p>
      When planning to buy an air conditioner or heater, it's crucial to choose one with the appropriate BTU capacity. If the unit is <strong>too small</strong>, it won't adequately heat or cool the space, leading to discomfort and increased energy consumption. If it's <strong>too large</strong>, it can cycle on and off frequently, causing inefficient energy use and uneven temperature distribution.
    </p>
    
    <h3 className="text-lg font-semibold">Factors Considered in a BTU Calculator:</h3>
    <ul className="list-disc list-inside">
      <li><strong>Room Size:</strong> The primary factor is the size of the room (length, width, and ceiling height).</li>
      <li><strong>Insulation:</strong> Poorly insulated rooms will require more BTUs to maintain temperature.</li>
      <li><strong>Climate Zone:</strong> Warmer climates need more cooling capacity, while colder climates need more heating.</li>
      <li><strong>Room Usage:</strong> Kitchens, for example, need higher BTUs because of the heat generated by appliances.</li>
      <li><strong>Number of Occupants:</strong> More people in a room generate additional heat, impacting cooling needs.</li>
      <li><strong>Sunlight Exposure:</strong> Rooms with large windows or direct sunlight will require more cooling.</li>
    </ul>
    
    <h3 className="text-lg font-semibold">How to Use a BTU Calculator:</h3>
    <ol className="list-decimal list-inside">
      <li><strong>Measure the Room Size:</strong> Measure the length, width, and height of the room.</li>
      <li><strong>Input Additional Factors:</strong> Add details like the number of windows, insulation quality, and number of occupants.</li>
      <li><strong>Get Your BTU Recommendation:</strong> The calculator will provide a recommended BTU range.</li>
    </ol>
    
    <h3 className="text-lg font-semibold">Example Calculation:</h3>
    <p>
      For a 200 square foot room with average insulation and two windows, the BTU requirement for cooling might be approximately <strong>5,000-6,000 BTUs</strong>.
    </p>

    <p>
      Using a BTU calculator can help you make informed decisions, saving money on your energy bills while ensuring your space remains comfortable year-round.
    </p>

  </div>
</div>        </div>
    );
};  

export default BTUCalculator;