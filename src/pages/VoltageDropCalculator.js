import React, { useState } from 'react';

// Resistance values mapping for copper and aluminum wires
const resistanceValues = {
    copper: {
        "10": { resistance: 1.24, area: 5.26 },
        "11": { resistance: 1.09, area: 4.15 },
        "12": { resistance: 1.59, area: 3.31 },
        "13": { resistance: 1.27, area: 2.63 },
        "14": { resistance: 2.00, area: 2.08 },
        "15": { resistance: 1.65, area: 1.65 },
        "16": { resistance: 2.52, area: 1.31 },
        "17": { resistance: 3.17, area: 1.04 },
        "18": { resistance: 4.00, area: 0.823 },
        "19": { resistance: 5.09, area: 0.653 },
        "20": { resistance: 6.39, area: 0.519 },
        "21": { resistance: 8.00, area: 0.412 },
        "22": { resistance: 10.15, area: 0.324 },
        "23": { resistance: 12.80, area: 0.259 },
        "24": { resistance: 16.00, area: 0.205 },
    },
    aluminum: {
        "10": { resistance: 1.54, area: 5.26 },
        "11": { resistance: -1, area: -1 }, // Not applicable
        "12": { resistance: 2.00, area: 3.31 },
        "13": { resistance: -1, area: -1 }, // Not applicable
        "14": { resistance: 2.52, area: 2.08 },
        "15": { resistance: -1, area: -1 }, // Not applicable
        "16": { resistance: 3.17, area: 1.31 },
        "17": { resistance: -1, area: -1 }, // Not applicable
        "18": { resistance: 5.09, area: 0.823 },
        "19": { resistance: -1, area: -1 }, // Not applicable
        "20": { resistance: 8.00, area: 0.519 },
        "21": { resistance: -1, area: -1 }, // Not applicable
        "22": { resistance: 10.15, area: 0.324 },
        "23": { resistance: -1, area: -1 }, // Not applicable
        "24": { resistance: 16.00, area: 0.205 }
    }
};

const VoltageDropCalculator = () => {
    const [inputs, setInputs] = useState({
        wireMaterial: 'Copper',
        wireSize: '10', // Default value for wire size
        conduitMaterial: 'Steel',
        powerFactor:'0.85', // Default power factor value
        voltageLevel:'120', // Default voltage value
        phaseType:'Single Phase', // Default phase type
        numConductors:'1', // Default number of conductors
        distance:'',
        distanceUnit:'feet', // Default unit for distance
        loadCurrent:''
    });
    const [result,setResult] = useState('Please fill all fields');
    const [errorFields,setErrorFields] = useState({}); // Track which fields are empty

    const handleChange = (e) => {
       const { name,value } = e.target;
       setInputs({ ...inputs,[name]:value });
    };

    const calculateVoltageDrop = () => {
       const{ wireMaterial , wireSize , distance , distanceUnit , loadCurrent } = inputs;

       // Check for empty fields and set error fields state
       const newErrorFields = {};
       if (!loadCurrent) newErrorFields.loadCurrent = true;
       if (!distance) newErrorFields.distance = true;

       if (Object.keys(newErrorFields).length >0) {
           setErrorFields(newErrorFields);
           blinkEmptyFields(newErrorFields);
           return;
       }

       // Convert inputs to usable values
       const loadCurrentValue = parseFloat(loadCurrent);
       
       // Convert distance to feet based on selected unit
       const distanceValueInFeet = convertDistanceToFeet(distance,distanceUnit);

       // Get resistance based on wire material and size
       const resistanceData = resistanceValues[wireMaterial.toLowerCase()][wireSize];
       
       if (!resistanceData || resistanceData.resistance === -1) {
           setResult('Invalid wire size or material.');
           return;
       }

       const resistancePer1000Feet = resistanceData.resistance;

       // Calculate voltage drop using a simplified formula
       const drop = ((loadCurrentValue * distanceValueInFeet *resistancePer1000Feet) /1000);
       
       setResult(`Voltage Drop at ${inputs.voltageLevel} V (${inputs.phaseType}, ${inputs.numConductors} conductors): ${drop.toFixed(2)} V`);
   };

   const convertDistanceToFeet = (distance , unit) => {
      switch (unit) {
          case 'feet':
              return parseFloat(distance);
          case 'meters':
              return parseFloat(distance) *3.28084; // Convert meters to feet
          case 'kilometers':
              return parseFloat(distance) *3280.84; // Convert kilometers to feet
          case 'miles':
              return parseFloat(distance) *5280; // Convert miles to feet
          default:
              return parseFloat(distance);
      }
   };

   const blinkEmptyFields = (fields) => {
      Object.keys(fields).forEach((field) => {
          if (fields[field]) {
              const inputField = document.querySelector(`input[name="${field}"]`) || document.querySelector(`select[name="${field}"]`);
              if (inputField) {
                  inputField.classList.add('blink');
                  inputField.style.backgroundColor = '#ffcccc'; // Change color to light red

                  setTimeout(() => {
                      inputField.classList.remove('blink');
                      inputField.style.backgroundColor = ''; // Reset color after blinking
                  },1000); // Blink duration
              }
          }
      });
   };

   return (
    <div className="min-h-screen  flex gap-4 items-center lg:items-start flex-col lg:flex-col justify-center py-6 px-4">

<div className=" lg:max-w-screen-sm w-full bg-gray-200 p-4 rounded-xl shadow-lg">
<h1 className="text-xl font-bold mb-2 text-center">Voltage Drop Calculator</h1>
          <div className="grid grid-cols-1">
              {/* Wire Material */}
              <div className="flex mb-2 flex-col lg:flex-row ">
                  <label className="block text-sm font-medium w-full text-center lg:text-start lg:w-2/5">Wire Material</label>
                  <select
                      name="wireMaterial"
                      value={inputs.wireMaterial}
                      onChange={handleChange}
                      className={`mt-1 block w-full lg:w-3/5 border border-gray-300 rounded-lg shadow-sm shadow-gray-500 p-1 ${errorFields.wireMaterial ? "border-red-500" : ""}`}
                  >
                      <option value="Copper">Copper</option>
                      <option value="Aluminum">Aluminum</option>
                  </select>
              </div>

              {/* Wire Size */}
              <div className="flex mb-2 flex-col lg:flex-row">
                  <label className="block text-sm font-medium w-full text-center lg:text-start lg:w-2/5">Wire Size (AWG)</label>
                  <select
                      name="wireSize"
                      value={inputs.wireSize}
                      onChange={handleChange}
                      className={`mt-1 block w-full lg:w-3/5 border border-gray-300 rounded-lg shadow-sm shadow-red-500 p-1 ${errorFields.wireSize ? "border-red-500" : ""}`}
                  >
                       {/* Wire sizes */}
                       {Object.keys(resistanceValues.copper).map((gauge) => (
                           <option key={gauge} value={gauge}>{gauge} AWG</option>
                       ))}
                   </select>
               </div>

               {/* Conduit Material */}
               <div className="flex mb-2 flex-col lg:flex-row">
                   <label className="block text-sm font-medium w-full text-center lg:text-start lg:w-2/5">Conduit Material</label>
                   <select
                       name="conduitMaterial"
                       value={inputs.conduitMaterial}
                       onChange={handleChange}
                       className={`mt-1 block w-full lg:w-3/5 border border-gray-300 rounded-lg shadow-sm shadow-blue-500 p-1 ${errorFields.conduitMaterial ? "border-red-500" : ""}`}
                   >
                       <option value="Steel">Steel</option>
                       <option value="PVC">PVC</option>
                       <option value="Aluminum">Aluminum</option>
                   </select>
               </div>

               {/* Power Factor */}
               <div className="flex mb-2 flex-col lg:flex-row">
                   <label className="block text-sm font-medium w-full text-center lg:text-start lg:w-2/5">Power Factor</label>
                   <input
                       type="number"
                       step="0.01"
                       name="powerFactor"
                       placeholder='Enter Power Factor (e.g.,  0  to  1)'
                       value={inputs.powerFactor}
                       onChange={handleChange}
                       className={`mt-1 block w-full lg:w-3/5 border border-gray-300 rounded-lg shadow-sm shadow-orange-500 p-1 ${errorFields.powerFactor ? "border-red-500" : ""}`}
                   />
               </div>

               {/* Voltage Level */}
               <div className="flex mb-2 flex-col lg:flex-row">
                   <label className="block text-sm font-medium w-full text-center lg:text-start lg:w-2/5">Voltage Level (V)</label>
                   <select
                       name="voltageLevel"
                       value={inputs.voltageLevel}
                       onChange={handleChange}
                       className={`mt-1 block w-full lg:w-3/5 border border-gray-300 rounded-lg shadow-sm shadow-gray-500 p-1 ${errorFields.voltageLevel ? "border-red-500" : ""}`}
                   >
                       <option value='120'>120 V</option>
                       <option value='240'>240 V</option>
                       <option value='480'>480 V</option>
                       <option value='600'>600 V</option>
                   </select>
               </div>

               {/* Phase Type */}
               <div className="flex mb-2 flex-col lg:flex-row">
                   <label className="block text-sm font-medium w-full text-center lg:text-start lg:w-2/5">Phase Type</label>
                   <select
                       name="phaseType"
                       value={inputs.phaseType}
                       onChange={handleChange}
                       className={`mt-1 block w-full lg:w-3/5 border border-gray-300 rounded-lg shadow-sm shadow-pink-500 p-1 ${errorFields.phaseType ? "border-red-500" : ""}`}
                   >
                       <option value="Single Phase">Single Phase</option>
                       <option value="Three Phase">Three Phase</option>
                   </select>
               </div>

               {/* Number of Conductors */}
               <div className="flex mb-2 flex-col lg:flex-row">
                   <label className="block text-sm font-medium w-full text-center lg:text-start lg:w-2/5">Number of Conductors</label>
                   <select
                       name="numConductors"
                       value={inputs.numConductors}
                       onChange={handleChange}
                       className={`mt-1 block w-full lg:w-3/5 border border-gray-300 rounded-lg shadow-sm shadow-purple-500 p-1 ${errorFields.numConductors ? "border-red-500" : ""}`}
                   >
                       {[...Array(10).keys()].map(num => (
                           <option key={num +  1} value={num +  1}>{num +  1}</option>
                       ))}
                   </select>
               </div>

               {/* Distance Input with Unit Dropdown */}
               <div className='flex mb-2 flex-col lg:flex-row'>
                   <label className='block text-sm font-medium w-full text-center lg:text-start lg:w-2/5'>Distance:</label>
                   <input 
                       type='number'
                       name='distance'
                       placeholder='Enter distance'
                       value={inputs.distance}
                       onChange={handleChange}
                       className={`mt-1 block w-full lg:w-3/5 border border-gray-300 rounded-lg shadow-sm shadow-blue-500 p-[6px] ${errorFields.distance ? "border-red-500" : ""}`}
                   />
               </div>

               {/* Distance Unit Dropdown */}
               <div className='flex mb-2 flex-col lg:flex-row'>
                   <label className='block text-sm font-medium w-full text-center lg:text-start lg:w-2/5'>Distance Unit:</label>
                   <select 
                       name='distanceUnit' 
                       value={inputs.distanceUnit} 
                       onChange={handleChange} 
                       className={`mt-1 block w-full lg:w-3/5 border border-gray-300 rounded-lg shadow-sm shadow-blue-500 p-[6px] ${errorFields.distanceUnit ? "border-red-500" : ""}`}
                   >
                       {/* Distance Units */}
                       <option value='feet'>Feet</option>
                       <option value='meters'>Meters</option>
                       <option value='kilometers'>Kilometers</option>
                       <option value='miles'>Miles</option>
                   </select>
               </div>

               {/* Load Current Input */}
               <div className='flex mb-2 flex-col lg:flex-row'>
                   <label className='block text-sm font-medium w-full text-center lg:text-start lg:w-2/5'>Load Current:</label>
                   <input 
                       type='number' 
                       name='loadCurrent' 
                       placeholder='Enter Load Current' 
                       value={inputs.loadCurrent} 
                       onChange={handleChange} 
                        className={`mt-1 block w-full lg:w-3/5 border border-gray-300 rounded-lg shadow-sm shadow-red-500 p-[6px] ${errorFields.loadCurrent ? "border-red-500" : ""}`}
                    />
                </div>

                {/* Button to calculate */}
                <button onClick={calculateVoltageDrop} className="bg-blue-500 shadow-sm shadow-pink-500 text-white p-[6px] rounded-lg shadow-md mt-[6px] w-full">
                    Calculate
                </button>

                {/* Result display */}
                <div id="result" className="mt-[6px] font-bold text-center ">{result}</div>
            </div>

            {/* Add CSS for blinking effect */}
            <style>{`
                .blink {
                    animation : blink-animation .5s steps(5,start) infinite;
                }

                @keyframes blink-animation {
                    to {
                     visibility:hidden;
                 }
             }
         `}</style>

      </div>

                                        {/* ABOUT */}

     <div className=" w-full p-4 rounded-xl shadow-lg bg-gray-200">
  <div className="space-y-4">
    <h2 className="text-xl font-bold">Voltage Drop Calculator</h2>
    
    <h3 className="text-lg font-semibold">1. Introduction to Voltage Drop</h3>
    <p className="text-gray-700">
      Voltage drop refers to the reduction in voltage in an electrical circuit between the source and the load. 
      It is a common issue in electrical systems and can lead to inefficient operation of electrical devices, 
      reduced performance, and potential damage.
    </p>

    <h3 className="text-lg font-semibold">2. What is a Voltage Drop Calculator?</h3>
    <p className="text-gray-700">
      A Voltage Drop Calculator is a tool used by engineers, electricians, and DIY enthusiasts to determine 
      the amount of voltage loss in a circuit. It helps in identifying the right conductor size and ensures 
      that electrical systems operate efficiently and safely.
    </p>

    <h3 className="text-lg font-semibold">3. How Voltage Drop is Calculated</h3>
    <p className="text-gray-700">
      The formula for calculating voltage drop is:
    </p>
    <span className="flex bg-gray-100 p-2 rounded">
        

      Voltage Drop (V) = (2 × L × I × R) / 1000
        
    </span>
    <p className="text-gray-700">
      Where:
      <ul className="list-disc ml-6">
        <li><strong>L</strong>: Length of the conductor (in meters or feet)</li>
        <li><strong>I</strong>: Current (in amperes)</li>
        <li><strong>R</strong>: Resistance of the conductor (ohms per unit length)</li>
      </ul>
      The voltage drop is affected by factors such as cable size, current, length, and material.
    </p>

    <h3 className="text-lg font-semibold">4. Using a Voltage Drop Calculator</h3>
    <p className="text-gray-700">
      To use a voltage drop calculator, simply input the length of the conductor, the current in the circuit, 
      and the conductor’s resistance. The tool will then compute the voltage drop, helping you choose the 
      correct conductor size and ensure system efficiency.
    </p>

    <h3 className="text-lg font-semibold">5. Applications</h3>
    <p className="text-gray-700">
      Voltage drop calculations are essential in various electrical installations, such as home wiring, 
      industrial setups, and solar systems. Ensuring minimal voltage drop helps maintain compliance with 
      electrical codes and improves overall system performance.
    </p>
  </div>
</div>




   </div>
   );
};

export default VoltageDropCalculator;