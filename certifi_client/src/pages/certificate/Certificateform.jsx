import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../public/logo.png";

import { useNavigate } from 'react-router-dom'; // Import useNavigate

function CertificateForm() {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleButtonClick = () => {
    navigate('/csigner'); // Navigate to /csigner on click
  };

  return (
    <div className="flex h-screen">
      {/* Left Section: Certificate Preview (60% width) */}
      <div className="w-9/12 bg-gray-100 p-8">
        {/* Certificate content will go here */}
      </div>

  
      {/* Right Section: Form (40% width) */}
      <div className="w-3/12 bg-white p-10">
        <h2 className="text-xl font-bold mb-4">Document details</h2>
        <p className="text-gray-600 mb-6">
          Correctly add all the required details regarding the document that you
          wanna store in our blockchain.
        </p>
        {/* Form Inputs */}
        <div className="mb-4">
          <div className='pb-6'>
         <input
            type="text"
            id="documentName"
            className="w-full border rounded py-2 px-3  "
            placeholder='Enter Document name '
          />
          </div>

        <div className='pb-6'>
          <input
            type="text"
            id="documentName"
            className="w-full border rounded py-2 px-3"
            placeholder='Person Name'
          />
        </div>
        <div className='pb-6'>
          <input
            type="text"
            id="documentName"
            className="w-full border rounded py-2 px-3"
            placeholder='Person Name'
          />
        </div>
        <div className='pb-6'>
          <input
            type="text"
            id="documentName"
            className="w-full border rounded py-2 px-3"
            placeholder='Person Name'
          />
        </div>
        <div className='pb-6'>
          <input
            type="text"
            id="documentName"
            className="w-full border rounded py-2 px-3"
            placeholder='Person Name'
          />
        </div>
        <div className='pb-6'>
          <input
            type="text"
            id="documentName"
            className="w-full border rounded py-2 px-3"
            placeholder='Person Name'
          />
        </div>
        <div className=''>
          <input
            type="text"
            id="documentName"
            className="w-full border rounded py-2 px-3"
            placeholder='Person Name'
          />
        </div>

        </div>

       
        <div className="pt-4">
          <button 
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleButtonClick} // Attach the click handler
          >
            Create a new certificate
          </button>
        </div> 

      </div>
      
    </div>

  );
}

export default CertificateForm;