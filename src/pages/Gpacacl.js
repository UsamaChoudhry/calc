import React, { useState } from 'react';

const GPACalculator = () => {
  const [courses, setCourses] = useState([{ grade: '', credits: '' }]);

  const handleAddCourse = () => {
    setCourses([...courses, { grade: '', credits: '' }]);
  };

  const handleChange = (index, event) => {
    const newCourses = [...courses];
    newCourses[index][event.target.name] = event.target.value;
    setCourses(newCourses);
  };

  const handleClearFields = () => {
    setCourses([{ grade: '', credits: '' }]); // Reset to one empty field
  };

  const calculateGPA = () => {
    let totalPoints = 0;
    let totalCredits = 0;

    courses.forEach(course => {
      const gradePoints = getGradePoints(course.grade);
      if (gradePoints !== null && course.credits) {
        totalPoints += gradePoints * parseFloat(course.credits);
        totalCredits += parseFloat(course.credits);
      }
    });

    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';
  };

  const getGradePoints = (grade) => {
    switch (grade.toUpperCase()) {
      case 'A': return 4.0;
      case 'A-': return 3.7;
      case 'B+': return 3.3;
      case 'B': return 3.0;
      case 'B-': return 2.7;
      case 'C+': return 2.3;
      case 'C': return 2.0;
      case 'C-': return 1.7;
      case 'D+': return 1.3;
      case 'D': return 1.0;
      case 'F': return 0.0;
      default: return null; // Invalid grade
    }
  };

  return (
    <>

   <div className="min-h-screen  flex  gap-4 items-center lg:items-start   flex-col lg:flex-col justify-center py-6 px-4">
      <div className="max-w-md w-full bg-gray-200 p-4 rounded-xl shadow-lg  ">
        <div className="space-y-4">
          {/* Distance Input */}
          <h1 className="text-2xl font-bold mb-4 text-center">GPA Calculator</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          {courses.map((course, index) => (
            <div key={index} className="mb-4">
              {index === 0 && (
                <div className="flex justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700 w-1/2">Grade</label>
                  <label className="block text-sm font-medium text-gray-700 w-1/2">Credits</label>
                </div>
              )}
              <div className="flex space-x-2">
                <input
                  type="text"
                  name="grade"
                  placeholder="Grade (A, B, C...)"
                  value={course.grade}
                  onChange={(e) => handleChange(index, e)}
                  className="border border-gray-300 p-2 rounded w-full"
                />
                <input
                  type="number"
                  name="credits"
                  placeholder="Credits"
                  value={course.credits}
                  onChange={(e) => handleChange(index, e)}
                  className="border border-gray-300 p-2 rounded w-full"
                />
              </div>
            </div>
          ))}
          <div className="flex space-x-2 justify-center">
            <button 
              onClick={handleAddCourse} 
              className="bg-blue-500 text-white p-2 rounded mb-4 hover:bg-blue-600 transition duration-200">
              Add Course
            </button>
            <button 
              onClick={handleClearFields} 
              className="bg-red-500 text-white p-2 rounded mb-4 hover:bg-red-600 transition duration-200">
              Clear
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">GPA:</h2>
            <p className="text-2xl font-bold text-blue-600">{calculateGPA()}</p>
          </div>
        </div>
      </div>
        </div>
      </div>

      {/* about*/}

      {/* <div className="max-w-md w-full bg-white p-4 rounded-xl shadow-lg ">


        <div className="space-y-4">
        </div>
      </div> */}


<div className=" w-full bg-gray-200  p-4 rounded-xl shadow-lg">
  <div className="space-y-4">
    {/* Heading */}
    <h2 className="text-2xl font-semibold text-gray-800">Understanding GPA Calculators</h2>
    
    {/* Content Text */}
    <p className="text-gray-700">
      A <strong>GPA (Grade Point Average) calculator</strong> is a tool that helps students evaluate their academic performance based on the grades they receive in their courses. It is widely used by students and academic institutions to measure overall achievement.
    </p>
    
    <h3 className="text-xl font-semibold text-gray-800">Purpose of a GPA Calculator</h3>
    <ul className="list-disc list-inside text-gray-700">
      <li><strong>Track Academic Performance:</strong> It helps students monitor their grades throughout a semester or academic year.</li>
      <li><strong>Set Academic Goals:</strong> By calculating their current GPA, students can set goals for improvement.</li>
      <li><strong>Determine Eligibility:</strong> Many scholarships, programs, and honors require a minimum GPA, so knowing your GPA is essential for applications.</li>
    </ul>
    
    <h3 className="text-xl font-semibold text-gray-800">How a GPA Calculator Works</h3>
    <p className="text-gray-700">
      Most GPA calculators follow these steps:
    </p>
    <ol className="list-decimal list-inside text-gray-700">
      <li>Assign point values to letter grades (e.g., A = 4.0, B = 3.0, C = 2.0).</li>
      <li>Calculate quality points by multiplying the grade point value by the credit hours of the course.</li>
      <li>Compute the GPA by dividing the total quality points by the total credit hours.</li>
    </ol>

    <h3 className="text-xl font-semibold text-gray-800">Example Calculation</h3>
    <p className="text-gray-700">
      Consider a student who has taken the following courses:
    </p>
    <table className="w-full text-gray-700">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2">Course</th>
          <th className="p-2">Grade</th>
          <th className="p-2">Credit Hours</th>
          <th className="p-2">Grade Points</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="p-2">Math</td>
          <td className="p-2">A</td>
          <td className="p-2">3</td>
          <td className="p-2">4.0</td>
        </tr>
        <tr>
          <td className="p-2">English</td>
          <td className="p-2">B</td>
          <td className="p-2">3</td>
          <td className="p-2">3.0</td>
        </tr>
        <tr>
          <td className="p-2">History</td>
          <td className="p-2">C</td>
          <td className="p-2">2</td>
          <td className="p-2">2.0</td>
        </tr>
      </tbody>
    </table>

    <p className="text-gray-700 mt-2">
      Total Quality Points = 25.0 <br />
      Total Credit Hours = 8 <br />
      <strong>GPA = 25.0 / 8 = 3.125</strong>
    </p>

    <h3 className="text-xl font-semibold text-gray-800">Benefits of Using a GPA Calculator</h3>
    <ul className="list-disc list-inside text-gray-700">
      <li><strong>Efficiency:</strong> Simplifies the process of calculating GPA, saving time for students.</li>
      <li><strong>Academic Planning:</strong> Helps students understand how current and future grades will impact their overall GPA.</li>
      <li><strong>Goal Setting:</strong> Assists in setting achievable academic goals and tracking progress toward them.</li>
    </ul>

    <h3 className="text-xl font-semibold text-gray-800">Conclusion</h3>
    <p className="text-gray-700">
      A GPA calculator is a valuable tool for students to assess and track their academic performance. By understanding how their grades affect their GPA, students can set realistic goals and work towards academic success.
    </p>
  </div>
</div>


    </div>
     </>
  );
};

export default GPACalculator;