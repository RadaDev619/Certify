import React, { useState } from "react";
import logo from "../../../public/logo.png";

const CertificatePart = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [signers, setSigners] = useState([
    { email: "something@gmail.com", isAuthor: true }, // Initial signer (author)
  ]);

  // Handle file upload
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Handle adding a new signer
  const handleAddSigner = () => {
    const newEmail = prompt("Enter the email address of the new signer:");
    if (newEmail) {
      setSigners([...signers, { email: newEmail, isAuthor: false }]);
    }
  };

  // Handle removing a signer
  const handleRemoveSigner = (index) => {
    const updatedSigners = [...signers];
    updatedSigners.splice(index, 1);
    setSigners(updatedSigners);
  };

  return (
    <div className="flex justify-center items-center flex-col">
      {/* Navigation */}
      <nav className="w-full pt-12 pb-20 px-52">
        <img src={logo} alt="" />
      </nav>

        
      <div className="form-container w-[90vw] xs:p-10 sm:p-20 xl:px-40 xl:pt-20 xl:pb-32 border-2 border-gray-400 rounded-lg">
        {/* Upload Certificate Section */}
        <div className="flex items-center justify-between mb-12">
          <div className="w-2/4">
            <label
              className="block text-gray-700 font-bold mb-2 text-xl"
              htmlFor="certificate"
            >
              Upload the physical certificate
            </label>
            <p className="text-gray-500 text-sm">
              Drag and drop a file or select an image from your PC
            </p>
          </div>
          <div className="w-2/4">
            <input
              className="w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
              id="certificate"
              type="file"
              onChange={handleFileChange}
            />
            {selectedFile && (
              <p className="text-sm mt-2">Selected file: {selectedFile.name}</p>
            )}
          </div>
        </div>

        <hr className="border-gray-400 w-[100%]" />

        {/* Signer Section */}
        <div className="flex items-center justify-between mt-8">
          <div className="w-2/5">
            <label
              className="block text-gray-700 font-bold mb-2 text-xl"
              htmlFor="signer"
            >
              Signer
            </label>
            <p className="text-gray-500 text-sm mb-2">
              People who are required to sign the document so that they can
              verify your certificate for validation
            </p>
          </div>

          <div className="w-2/4">
            {signers.map((signer, index) => (
              <div
                key={index}
                className="flex items-center justify-between mb-2 border border-[black] px-6 py-4 rounded-md"
              >
                <div className="flex items-center">
                  {/* Display either initials or image (placeholder for now) */}
                  <div className="w-8 h-8 bg-gray-400 rounded-full mr-2 text-white font-bold flex items-center justify-center">
                    {signer.email.charAt(0).toUpperCase()}
                  </div>
                  <span>
                    {signer.email} {signer.isAuthor && "(Author) (You)"}
                  </span>
                </div>
                {!signer.isAuthor && (
                  <button
                    className="text-gray-500 hover:text-red-500"
                    onClick={() => handleRemoveSigner(index)}
                  >
                    ×
                  </button>
                )}
              </div>
            ))}

            <button
              className="mt-2 text-sm text-blue-500 hover:text-blue-700 w-full text-left"
              onClick={handleAddSigner}
            >
              + Add new signer
            </button>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-between items-center flex-col gap-4 mt-12">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-96">
          Add document
        </button>
        <button className="text-gray-700 font-bold py-2 px-4 rounded w-96">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CertificatePart;