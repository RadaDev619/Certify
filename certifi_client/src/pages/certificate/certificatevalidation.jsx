import React, { useState } from "react";

function certificatevalidation() {
  const [activeTab, setActiveTab] = useState("recipients");
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="certificate ">
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-white w-1/2 p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center">
            CERTIFICATE OF COMPLETION
          </h1>
          <p className="text-lg text-center mt-4">Awarded to</p>
          <h2 className="text-xl font-bold text-center mt-2">personName</h2>
          <p className="text-lg text-center mt-4">For completing the course</p>
          <h3 className="text-lg font-bold text-center mt-2">courseName</h3>
          <p className="text-sm text-center mt-4">
            Course duration: courseHours
          </p>
          <p className="text-sm text-center">Course details: courseDetails</p>
          <p className="text-xs text-center mt-8">
            Valid since: certificationDate
          </p>
        </div>
        {/* Information Card Section */}
        <div className="bg-gray-100 w-1/3 p-6 rounded-lg shadow-md ml-8">
          <h1 className="text-xxl"><b>Document overview </b></h1>
          <h3 className="">
            The details and the information regarding the document that you have
            created is shown
          </h3>
          <div className="py-5">
            {/* Valid badge */}
            <div className="mt-8 bg-[#80FF00] text-[white] text-bg  font-medium px-4 py-5 rounded text-center">
            Document valid
          </div>
          </div>
          <div className="flex justify-between">
            <button
              className={`px-4 py-2 rounded font-medium ${
                activeTab === "recipients"
                  ? "bg-blue-500 text-white"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab("recipients")}
            >
              Recipients
            </button>
            <button
              className={`px-4 py-2 rounded font-medium ${
                activeTab === "information"
                  ? "bg-blue-500 text-white"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab("information")}
            >
              Information
            </button>
          </div>
          {activeTab === "recipients" && (
            <div className="mt-4">
              {/* Replace with your recipient information and icons */}
              <h1>Owner</h1>
              <p>
                ngawngg927@gmail.com <br /> (Author) (You)
              </p>
              <h1>Signer</h1>
              <p>smt@gmail.com</p>
            </div>
          )}
          {activeTab === "information" && (
            <div className="mt-4">
              {/* Replace with your additional certificate details */}
              <p>Certificate</p>
              <p>Certificate name</p>
              <div className="">
                <div>
                  <p>Created on</p>
                  <p>yyy-mm-dd</p>
                </div>
                <div>
                  <p>Expires on </p>
                  <p>yyy-mm-dd</p>
                </div>
              </div>
              <p>Issues by </p>
              <p>something@gmail.com</p>
              <p>Document identification</p>
              <p>784174184789-32432843-23008408373</p>
            </div>
          )}
        
        </div>
      </div>
    </div>
  );
}

export default certificatevalidation;
