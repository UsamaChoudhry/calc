import React, { useState } from "react";
<link rel="stylesheet" href="styles.css" />

// Helper arrays for dropdown options
const days = Array.from({ length: 31 }, (_, i) => i + 1);
const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const years = Array.from({ length: 120 }, (_, i) => new Date().getFullYear() - i);

function AgeCalculator() {
  // State for Birth Date
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  // State for Target Date (default to today's date)
  const [targetDay, setTargetDay] = useState(new Date().getDate());
  const [targetMonth, setTargetMonth] = useState(months[new Date().getMonth()]);
  const [targetYear, setTargetYear] = useState(new Date().getFullYear());

  const [ageDetails, setAgeDetails] = useState(null);

  // State to control blinking
  const [isBlinking, setIsBlinking] = useState(false);

  // Function to calculate age
  const calculateAge = () => {
    // Check if any field is empty
    if (!selectedDay || !selectedMonth || !selectedYear) {
      // Trigger blinking effect
      setIsBlinking(true);

      // Reset blinking after 3 seconds
      setTimeout(() => {
        setIsBlinking(false);
      }, 3000);

      return;
    }

    const birthDate = new Date(
      parseInt(selectedYear),
      months.indexOf(selectedMonth),
      parseInt(selectedDay)
    );

    const targetDate = new Date(
      parseInt(targetYear),
      months.indexOf(targetMonth),
      parseInt(targetDay)
    );

    if (targetDate < birthDate) {
      return;
    }

    // Calculate difference in various units
    const diff = targetDate - birthDate;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const daysDifference = Math.floor(hours / 24);
    const weeks = Math.floor(daysDifference / 7);

    // Calculate years, total months, and remaining days
    let yearsDifference = targetDate.getFullYear() - birthDate.getFullYear();
    let monthsDifference = targetDate.getMonth() - birthDate.getMonth();
    let daysLeft = targetDate.getDate() - birthDate.getDate();

    if (daysLeft < 0) {
      monthsDifference -= 1;
      const prevMonth = new Date(targetDate.getFullYear(), targetDate.getMonth(), 0);
      daysLeft += prevMonth.getDate();
    }

    if (monthsDifference < 0) {
      yearsDifference -= 1;
      monthsDifference += 12;
    }

    const totalMonths = yearsDifference * 12 + monthsDifference;

    // Create formatted age string
    const formattedAge = `${yearsDifference > 0 ? `${yearsDifference} year${yearsDifference > 1 ? 's' : ''}, ` : ''}` +
                         `${monthsDifference > 0 ? `${monthsDifference} month${monthsDifference > 1 ? 's' : ''}, ` : ''}` +
                         `${daysLeft > 0 ? `${daysLeft} day${daysLeft > 1 ? 's' : ''}` : ''}`.trim();

    const age = {
      years: yearsDifference,
      totalMonths,
      weeks,
      days: daysDifference,
      hours,
      minutes,
      seconds,
      formattedAge,
    };

    setAgeDetails(age);
  };

  return (
    <div className="flex flex-col c">
      <div className="main">
        <div className="flex mb-4 flex-col lg:flex-row items-center justify-start min-h-fit  p-4">
          {/* Input Section */}
          <div className="bg-gray-200 p-8 rounded-lg shadow-lg w-full lg:w-1/2 max-w-lg">
            <h2 className="text-3xl font-bold mb-6 text-center uppercase text-purple-700">Age Calculator</h2>

            {/* Birth Date Selector */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Birth Date</label>
              <div className="flex gap-2">
                <select
                  className={`p-2 border rounded w-1/3 ${isBlinking && !selectedDay ? 'bg-red-400 animate-blink' : 'bg-blue-100'}`}
                  value={selectedDay}
                  onChange={(e) => setSelectedDay(e.target.value)}
                >
                  <option value="">Day</option>
                  {days.map((day) => <option key={day} value={day}>{day}</option>)}
                </select>
                <select
                  className={`p-2 border rounded w-1/3 ${isBlinking && !selectedMonth ? 'bg-red-400 animate-blink' : 'bg-green-100'}`}
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                >
                  <option value="">Month</option>
                  {months.map((month) => <option key={month} value={month}>{month}</option>)}
                </select>
                <select
                  className={`p-2 border rounded w-1/3 ${isBlinking && !selectedYear ? 'bg-red-400 animate-blink' : 'bg-yellow-100'}`}
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                >
                  <option value="">Year</option>
                  {years.map((year) => <option key={year} value={year}>{year}</option>)}
                </select>
              </div>
            </div>





            {/* Target Date Selector (Visible) */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Target Date</label>
              <div className="flex gap-2">
                <select
                  className="p-2 border rounded w-1/3 bg-red-100"
                  value={targetDay}
                  onChange={(e) => setTargetDay(e.target.value)}
                >
                  <option value="">Day</option>
                  {days.map((day) => <option key={day} value={day}>{day}</option>)}
                </select>
                <select
                  className="p-2 border rounded w-1/3 bg-purple-100"
                  value={targetMonth}
                  onChange={(e) => setTargetMonth(e.target.value)}
                >
                  <option value="">Month</option>
                  {months.map((month) => <option key={month} value={month}>{month}</option>)}
                </select>
                <select
                  className="p-2 border rounded w-1/3 bg-orange-100"
                  value={targetYear}
                  onChange={(e) => setTargetYear(e.target.value)}
                >
                  <option value="">Year</option>
                  {years.map((year) => <option key={year} value={year}>{year}</option>)}
                </select>
              </div>
            </div>

            <button onClick={calculateAge} className="w-full uppercase bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
              Calculate Age
            </button>
          </div>

          {/* Result Section */}
          <div className="bg-gray-200 p-8 rounded-lg shadow-lg w-full lg:w-1/3 max-w-lg lg:ml-8 mt-8 lg:mt-0">
            <h3 className="text-2xl font-semibold mb-4 text-center uppercase text-pink-600">Age Details</h3>
            {ageDetails ? (
              <ul className="text-gray-800">
                <li className="font-bold text-2xl underline bg-red-400"><strong >Complete Age:</strong> {ageDetails.formattedAge}</li>
                <li><strong>Years:</strong> {ageDetails.years}</li>
                <li><strong>Total Months:</strong> {ageDetails.totalMonths}</li>
                <li><strong>Weeks:</strong> {ageDetails.weeks}</li>
                <li><strong>Days:</strong> {ageDetails.days}</li>
                <li><strong>Hours:</strong> {ageDetails.hours}</li>
                <li><strong>Minutes:</strong> {ageDetails.minutes}</li>
                <li><strong>Seconds:</strong> {ageDetails.seconds}</li>
              </ul>
            ) : (
              <p className="text-center text-orange-500">Please select dates and click "Calculate Age".</p>
            )}
          </div>
        </div>
      </div>
                        {/* fewf etew */}
                        
<div className="flex mb-4 flex-col lg:flex-row items-start justify-start min-h-fit  p-4">
      {/* Input Section */}
      <div className="bg-gray-200 p-8 rounded-lg shadow-lg w-full lg:w-full">
    <h2 className="text-3xl font-bold mb-6 text-center uppercase text-purple-700">About Age Calculator</h2>

    {/* About Section */}
    <div className="mb-4">
        <h3 className="text-2xl font-semibold text-black mb-4">What is an Age Calculator?</h3>
        <p className="text-lg text-black mb-2">
            An age calculator is a tool that helps determine a person's exact age based on their birthdate. People use 
            age calculators to find out their age in years, months, days, or even in more specific units like hours and minutes.
        </p>

        <h3 className="text-2xl font-semibold text-black mb-4">How Does It Work?</h3>
        <p className="text-lg text-black mb-2">
            The basic principle behind an age calculator is simple: subtract the person's birthdate from the current date. 
            This gives the age in terms of the time elapsed. Age calculators often take into account factors like leap years 
            and time zones to ensure accuracy.
        </p>

        <h3 className="text-2xl font-semibold text-black mb-4">Types of Age Calculators</h3>
        <p className="text-lg text-black mb-2">
            There are different types of age calculators, including manual methods using formulas, online tools, and age calculators 
            built into programming languages such as Python and JavaScript. These calculators can be used for various purposes, 
            from determining eligibility for certain activities (e.g., voting or driving) to celebrating personal milestones.
        </p>

        <h3 className="text-2xl font-semibold text-black mb-4">Applications of Age Calculators</h3>
        <p className="text-lg text-black mb-2">
            Age calculators are useful in many areas of life, providing an easy way to track time and ensure accuracy when specific 
            age-based criteria are involved.
        </p>
    </div>
</div>
     </div>

    </div>
  );
}

export default AgeCalculator;
