import React, { useState, useRef, useEffect } from "react";

function CertificateValidation() {
  const [activeTab, setActiveTab] = useState("recipients");

  // State for recipient information (replace with your actual data or fetching mechanism)
  const [recipients, setRecipients] = useState([
    { name: "Author Name ", email: "ngawngg927@gmail.com", role: "Author (You)" },
    { name: "Signer Name", email: "signer@example.com", role: "Signer" }, // Add more recipients as needed
  ]);

  // State for certificate information (replace with your actual data or fetching mechanism)
  const [certificateInfo, setCertificateInfo] = useState({
    certificateName: "React JS Fundamentals",
    createdOn: new Date().toLocaleDateString("en-US", {  // Automatic today's date
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
    issuedBy: "something@gmail.com",
    documentId: "784174184789-32432843-23008408373",
  });

  // Assuming you have these variables defined somewhere
  const personName = "John Doe"; // Replace with actual data or state variable
  const courseName = "React JS Fundamentals";
  const courseHours = 6;
  const courseDetails = "Introduction to React, components, state, props, hooks, etc.";
  const ID = "123456789";
  const durationType = "year";
  const certificationDate = new Date(); // Get the current date

  const formatDate = (date) => {
    const formattedDate = new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    return formattedDate;
  };

  const documentIdRef = useRef(null);

  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopyDocumentId = () => {
    const documentIdText = documentIdRef.current.textContent;
    navigator.clipboard.writeText(documentIdText)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => {
          setCopySuccess(false);
        }, 2000); // Hide message after 2 seconds
      })
      .catch((error) => {
        console.error("Failed to copy document ID:", error);
        // Handle error (e.g., show an error message)
        alert("Error copying document ID. Please try again.");
      });
  };

  return (
    <div className="flex h-screen">
      {/* Certificate Content */}
      <div className="w-[70%] bg-white p-8 pt-32 shadow-md rounded-lg">
        <h1 className="text-4xl font-bold text-center font-serif">
          CERTIFICATE OF COMPLETION
        </h1>
        <p className="text-lg text-center mt-4">Awarded to</p>
        <h2 className="text-4xl text-center mt-2">{personName}</h2>
        <p className="text-lg text-center mt-4">For completing the course</p>
        <h3 className="text-3xl font-bold text-center mt-2">{courseName}</h3>
        <p className="text-left px-[400px] mt-60 ">
          Course duration: {courseHours} {durationType}
        </p>
        <p className=" text-left px-[400px]">Course detail: {courseDetails}</p>
        <p className=" text-left px-[400px] ">ID : {ID}</p>
        <p className="text-left px-[400px]">
          Issue date : {formatDate(certificationDate)}
        </p>
      </div>

      {/* Document Overview and Tabs */}
      <div className="w-[30%] bg-gray-100 p-10">
        <h1 className="text-xl font-bold mb-4">Document overview</h1>
        <p className="text-gray-600 ">
          The details and the information regarding the document that you have
          created is shown
        </p>
        <div className="py-5">
          {/* Valid badge */}
          <div className=" bg-[#80FF00] text-[white] text-bg font-medium px-4 py-5 rounded text-center">
            Document valid
          </div>
        </div>
        <div className="flex justify-between ">
          <button
            className={`border border-[black] w-[45%] px-4 py-2 rounded font-medium ${
              activeTab === "recipients" ? "bg-[#8000FF] text-white" : "text-gray-600"
            }`}
            onClick={() => setActiveTab("recipients")}
          >
            Recipients
          </button>
          <button
            className={` border border-[black] w-[45%] px-4 py-2 rounded font-medium ${
              activeTab === "information" ? "bg-[#8000FF] text-white" : "text-gray-600"
            }`}
            onClick={() => setActiveTab("information")}
          >
            Information
          </button>
        </div>

        {/* Recipients Tab */}
        {activeTab === "recipients" && (
          <div className="mt-4">
            <div>
              {recipients.map((recipient) => (
                <div key={recipient.email}>
                  <h1 className=" text-lg pb-2">{recipient.role}</h1> 
                  <p className="pb-2 font-bold">
                    {recipient.email} ({recipient.role})
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Information Tab */}
        {activeTab === "information" && (
          <div className="mt-4">
            <p>Certificate </p>
            <p className="font-bold pb-3">{certificateInfo.certificateName}</p>
           
              <div>
                <p>Created on</p>
                <p className="font-bold pb-3">{certificateInfo.createdOn}</p>
              </div>
            
            <p>Issues by </p>
            <p className="font-bold pb-3">{certificateInfo.issuedBy}</p>
            <p>Document identification</p>
            {/* Added flex container */}
            <div className="flex items-center relative"> {/* Add relative positioning */}
              <p ref={documentIdRef} className="font-bold pb-3 pr-6">
                {certificateInfo.documentId}
              </p>
              {/* Added copy button */}
              <button className="px-6 py-2 mb-3 border " onClick={handleCopyDocumentId}>
                Copy
              </button>

              {/* Momentary Message */}
              {copySuccess && (
             <span className="absolute top-[-30px] left-[400px] bg-green-500 text-white px-2 py-2 rounded">
             Copied!
           </span>
              )}
            </div>
          </div>
        )}
      </div> 
    </div>
  );
}

export default CertificateValidation;