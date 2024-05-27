import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../../public/logo.png";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../../../public/background.jpeg";

function CertificateValidation() {
  const [activeTab, setActiveTab] = useState("recipients");
  const crtId = window.localStorage.getItem("certId");
  const [fetchedData, setFetchedData] = useState(null); // State to store fetched data
  const [recipients, setRecipients] = useState([]);
  // State for certificate information (replace with your actual data or fetching mechanism)
  const [certificateInfo, setCertificateInfo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://prj-certifi-backend.onrender.com/api/certificate/get/${crtId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        if (data.status === "success") {
          setFetchedData(data.data); // Set fetched data in state
        } else {
          throw new Error("Certificate data fetch failed. Please try again.");
        }
      } catch (error) {
        console.error(error);
        alert(error.message);
      }
    };

    fetchData();
  }, [crtId]);

  // Update recipients when fetchedData changes
  useEffect(() => {
    if (fetchedData) {
      setRecipients([
        { name: "Author Name ", mail: fetchedData.email, role: "Author (You)" },
        { name: "Signer Name", mail: fetchedData.signer, role: "Signer" },
      ]);
      setCertificateInfo({
        // Update certificate information
        certificateName: fetchedData.courseName,
        createdOn: new Date().toLocaleDateString("en-US", {
          // Automatic today's date
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
        documentId: fetchedData._id,
      });
    }
  }, [fetchedData]);

  // Use fetchedData directly or fallback to empty strings if fetchedData is null
  const authorMail = fetchedData?.email || "";
  const authorName = fetchedData?.name || "";
  const signerMail = fetchedData?.signer || "";
  const courseName = fetchedData?.courseName || "";
  const courseDuration = fetchedData?.courseDuration || "";
  const courseDetails = fetchedData?.courseDetails || "";
  const issueDate = fetchedData?.createdAt || "";
  const ID = fetchedData?.cid || "";
  const certId = fetchedData?._id || "";

  // Assuming you have these variables defined somewhere
  // const personName = authorName; // Replace with actual data or state variable
  // const courseName = courseName;
  // const courseHours = 6;
  // const courseDetails = courseDetails;
  // const ID = cid;
  // const durationType = "year";
  // const certificationDate = new Date(); // Get the current date

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
    navigator.clipboard
      .writeText(documentIdText)
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

  // State for valid badge color and text
  const [validStatus, setValidStatus] = useState({
    text: "Document pending",
    color: "#FFA500", // Initial color: orange for pending
  });

  // Function to update the badge color and text based on validation logic
  const updateBadgeStatus = () => {
    // Example validation: Check if document ID is a number and has 10 digits
    const isValidDocumentId =
      !isNaN(certificateInfo.documentId) &&
      certificateInfo.documentId.toString().length === 10;

    // Update badge status based on validation result
    if (isValidDocumentId) {
      setValidStatus({ text: "Document valid", color: "#80FF00" }); // Green for valid
    } else {
      setValidStatus({ text: "Document not valid", color: "#FF0000" }); // Red for invalid
    }
  };

  // useEffect to update the badge status when necessary
  useEffect(() => {
    updateBadgeStatus();
  }, [certificateInfo.documentId]); // Update when documentId changes

  return (
    <div className="flex h-screen">
      <nav className="w-full flex justify-between pl-20 pb-5 fixed top-0 left-0">
        <p className="">
          <Link
            to={"/dashboard"}
            className="pl-4 text-blue-500 hover:underline hover:underline-blue-500 hover:underline-offset-[7px] hover:transition-all hover:duration-500"
          >
            <img src={logo} alt="" />
          </Link>
        </p>
      </nav>

      {/* Certificate Content */}
      <div className="w-[70%] bg-white p-8 pt-32 shadow-md rounded-lg">
        <div>
          <h1 className="text-4xl font-bold text-center font-serif">
            CERTIFICATE OF COMPLETION
          </h1>
          <p className="text-lg text-center mt-4">Awarded to</p>
          <h2 className="text-4xl text-center mt-2">{authorName}</h2>
          <p className="text-lg text-center mt-4">For completing the course</p>
          <h3 className="text-3xl font-bold text-center mt-2">{courseName}</h3>
          <p className="text-left px-[400px] mt-60">
            Course duration: {courseDuration}
          </p>
          <p className="text-left px-[400px]">Course detail: {courseDetails}</p>
          <p className="text-left px-[400px]">ID : {ID}</p>
          <p className="text-left px-[400px]">
            Issue date : {formatDate(issueDate)}
          </p>
        </div>
      </div>

      {/* Document Overview and Tabs */}
      <div className="w-[30%] bg-gray-100 p-10">
        <h1 className="text-xl font-bold mb-4">Document overview</h1>
        <p className="text-gray-600 ">
          The details and the information regarding the document that you have
          created is shown
        </p>
        <div className="py-5">
          {/* Valid badge with dynamic color and text */}
          <div
            className={`bg-[${validStatus.color}] text-[white] text-bg font-medium px-4 py-5 rounded text-center`}
          >
            {validStatus.text}
          </div>
        </div>
        <div className="flex justify-between ">
          <button
            className={`border border-[black] w-[45%] px-4 py-2 rounded font-medium ${
              activeTab === "recipients"
                ? "bg-[#8000FF] text-white"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("recipients")}
          >
            Recipients
          </button>
          <button
            className={` border border-[black] w-[45%] px-4 py-2 rounded font-medium ${
              activeTab === "information"
                ? "bg-[#8000FF] text-white"
                : "text-gray-600"
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
                <div key={recipient.mail}>
                  <h1 className=" text-lg pb-2">{recipient.role}</h1>
                  <p className="pb-2 font-bold">
                    {recipient.mail} ({recipient.role})
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

            <p>Document identification</p>
            {/* Added flex container */}
            <div className="flex items-center relative">
              {" "}
              {/* Add relative positioning */}
              <p ref={documentIdRef} className="font-bold pb-3 pr-6">
                {certificateInfo.documentId}
              </p>
              {/* Added copy button */}
              <button
                className="px-6 py-2 mb-3 border "
                onClick={handleCopyDocumentId}
              >
                Copy
              </button>
              {/* Momentary Message */}
              {copySuccess && (
                <span className="absolute top-[-30px] left-[300px] text-sm text-[black]">
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
