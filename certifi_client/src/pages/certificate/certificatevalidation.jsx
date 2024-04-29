import React, { useState } from "react";

function certificatevalidation() {
  const [activeTab, setActiveTab] = useState('recipients');
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div>
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-white w-1/2 p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center">CERTIFICATE OF COMPLETION</h1>
          <p className="text-lg text-center mt-4">Awarded to</p>
          <h2 className="text-xl font-bold text-center mt-2">personName</h2>
          <p className="text-lg text-center mt-4">For completing the course</p>
          <h3 className="text-lg font-bold text-center mt-2">courseName</h3>
          <p className="text-sm text-center mt-4">Course duration: courseHours</p>
          <p className="text-sm text-center">Course details: courseDetails</p>
          <p className="text-xs text-center mt-8">Valid since: certificationDate</p>
        </div>
        {/* Information Card Section */}
        <div className="bg-gray-100 w-1/3 p-6 rounded-lg shadow-md ml-8">
          <div className="flex justify-between">
            <button
              className={`px-4 py-2 rounded font-medium ${
                activeTab === 'recipients' ? 'bg-blue-500 text-white' : 'text-gray-600'
              }`}
              onClick={() => setActiveTab('recipients')}
            >
              Recipients 
            </button>
            <button
              className={`px-4 py-2 rounded font-medium ${
                activeTab === 'information' ? 'bg-blue-500 text-white' : 'text-gray-600'
              }`}
              onClick={() => setActiveTab('information')}
            >
              Information
            </button>
          </div>
          {activeTab === 'recipients' && (
            <div className="mt-4">
              {/* Replace with your recipient information and icons */}
              <p>Recipient Name: John Doe</p>
              <p>Email: john.doe@example.com</p>
              {/* ... more recipient details ... */}
            </div>
          )}
          {activeTab === 'information' && (
            <div className="mt-4">
              {/* Replace with your additional certificate details */}
              <p>Certificate ID: 1234567890</p>
              <p>Issue Date: 2023-11-22</p>
              <p>Expiration Date: 2024-11-22</p>
              {/* ... more certificate details ... */}
            </div>
          )}
          {/* Valid badge */}
          <div className="mt-8 bg-green-100 text-green-800 text-sm font-medium px-4 py-2 rounded-full text-center">
            Document valid 
          </div>
        </div>
      </div>
      {/* Button to trigger popup */}
      <button onClick={togglePopup} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Show Birthday Message
      </button>

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center">🎉 Happy Birthday! 🎉</h2>
            <button onClick={togglePopup} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mt-4">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default certificatevalidation;