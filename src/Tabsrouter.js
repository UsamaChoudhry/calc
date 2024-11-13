import React, { useState } from 'react';
import Tab1 from './components/LengthConverter';
import Tab2 from './components/ConvertTemperature';
import Tab3 from './components/AreaConverter';
import Tab4 from './components/VolumeConverter';
import Tab5 from './components/WeightConverter';

const App = () => {
  const [activeTab, setActiveTab] = useState(0);

  const renderContent = () => {
    switch (activeTab) {
      case 0:
        return <Tab1 />;
      case 1:
        return <Tab2 />;
      case 2:
        return <Tab3 />;
      case 3:
        return <Tab4 />;
      case 4:
        return <Tab5 />;
      default:
        return <Tab1 />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className=" bg-white ">
        {/* Tabs Header */}
        <div className="flex flex-wrap justify-between items-center border-b sm:flex-row flex-col">
          {/* Dropdown for Mobile */}
          <div className="sm:hidden w-full">
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(parseInt(e.target.value))}
              className="w-full py-2 text-center font-semibold bg-white border border-gray-300 rounded-lg"
            >
              {['LengthConverter', 'Temperature Converter', 'Area Converter', 'Volume Converter', 'Weight Converter'].map((tab, index) => (
                <option key={index} value={index}>
                  {tab}
                </option>
              ))}
            </select>
          </div>

          {/* Tabs for larger screens */}
          <div className="hidden  sm:flex flex-row w-full overflow-auto ">
            {['LengthConverter', 'Temperature Converter', 'Area Converter', 'Volume Converter', 'Weight Converter'].map((tab, index) => (
              <button
                key={index}
                className={`py-2 text-center font-semibold w-full sm:w-auto px-4 ${
                  activeTab === index
                    ? 'border-b-2 border-blue-500 text-blue-500'
                    : 'text-gray-600'
                }`}
                onClick={() => setActiveTab(index)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        {/* Tabs Content */}
        <div className="p-4">{renderContent()}</div>
      </div>
    </div>
  );
};

export default App;
