import React, { useState, useEffect } from "react";
import "../../css/institutiondashboard.css";
import certifiLogo from "../../assets/certifi-logo.png";
import userProfileImage from "../../assets/user-profile.png";
import "@fortawesome/fontawesome-free/css/all.css";
import { Link } from "react-router-dom";

import {
  FaSignOutAlt,
  FaSearch,
  FaCheck,
  FaTimes,
  FaHome,
  FaFilter,
  FaCog,
} from "react-icons/fa";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Modal from "react-modal";

const Dashboard = () => {
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [certificates, setCertificates] = useState([]); // State to store fetched certificates
  const [currentVerifyCertificateId, setCurrentVerifyCertificateId] =
    useState(null);
  const [currentNotValidCertificateId, setCurrentNotValidCertificateId] =
    useState(null);
  const [filteredCertificates, setFilteredCertificates] = useState([]); // State to store filtered certificates
  const [filterText, setFilterText] = useState(""); // State to store filter text
  const [filterModal, setFilterModal] = useState(false); // State to control filter modal
  const [filterDocumentName, setFilterDocumentName] = useState(""); // State to store filter document name
  const [filterAuthorName, setFilterAuthorName] = useState(""); // State to store filter author name

  useEffect(() => {
    // Fetch certificates from backend API
    fetch("https://prj-certifi-backend.onrender.com/api/certificate/getall", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          // Update certificates state with fetched data
          setCertificates(data.data);
          setFilteredCertificates(data.data); // Set initial filtered certificates
        } else {
          alert("Certificate data fetch failed. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error fetching certificates:", error);
        alert(
          "An error occurred while fetching certificates. Please try again."
        );
      });
  }, []);

  // Filter certificates based on name and author
  useEffect(() => {
    const filtered = certificates.filter(
      (certificate) =>
        certificate.courseName
          .toLowerCase()
          .includes(filterText.toLowerCase()) ||
        certificate.name.toLowerCase().includes(filterText.toLowerCase()) ||
        (filterDocumentName &&
          certificate.courseName
            .toLowerCase()
            .includes(filterDocumentName.toLowerCase())) ||
        (filterAuthorName &&
          certificate.name
            .toLowerCase()
            .includes(filterAuthorName.toLowerCase()))
    );
    setFilteredCertificates(filtered);
  }, [filterText, certificates, filterDocumentName, filterAuthorName]);

  const toggleUserDropdown = () => {
    setShowUserDropdown(!showUserDropdown);
  };

  // Filter modal handlers
  const openFilterModal = () => {
    setFilterModal(true);
  };

  const closeFilterModal = () => {
    setFilterModal(false);
  };

  const applyFilters = () => {
    closeFilterModal();
  };
  // verify modal
  const [verifyModalIsOpen, setVerifyModalIsOpen] = useState(false);

  const openVerifyModal = (certificateId) => {
    setCurrentVerifyCertificateId(certificateId);
    setVerifyModalIsOpen(true);
  };

  const closeVerifyModal = () => {
    setVerifyModalIsOpen(false);
  };

  const handleVerify = (certificateId) => {
    fetch(
      `https://prj-certifi-backend.onrender.com/api/certificate/verify/${certificateId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          console.log(data.data);

          alert("Document verified successfully.");
        } else {
          console.log(data);
          alert("Document verification failed. Please try again.");
        }
      });
    // console.log("Validated");
    closeVerifyModal();
  };

  const handleNotValid = (certificateId) => {
    fetch(
      `https://prj-certifi-backend.onrender.com/api/certificate/notverify/${certificateId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {});
    // console.log("Validated");
    closenotValidModal();
  };

  // notvalid modal

  const opennotValidModal = (certificateId) => {
    setCurrentNotValidCertificateId(certificateId);
    setnotValidModalIsOpen(true);
  };

  const closenotValidModal = () => {
    setnotValidModalIsOpen(false);
  };

  // const handlenotValid = () => {
  //   // Implement delete account logic here
  //   console.log("Not Validated");
  //   closenotValidModal();
  // };

  return (
    <div className="dashboard-wrapper">
      <div className="sidebar">
        <div className="logo-container">
          <div className="logo-circle">
            <img src={certifiLogo} alt="CertiFi Logo" className="logo" />
          </div>
          <span className="company-name">CertiFi</span>
        </div>
        <div className="home">
          <FaHome className="icon" /> Home
        </div>
      </div>
      <div className="main-content">
        <div className="search-bar">
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search Document or Folder"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
          </div>
          <div className="user-info">
            <div
              className="profile-image-container"
              onClick={toggleUserDropdown}
            >
              <img
                src={userProfileImage}
                alt="User Profile"
                className="profile-image"
              />
              <span className="username">Username</span>
              {showUserDropdown && (
                <div className="user-dropdown">
                  <Link
                    to="/institutionaccountsetting"
                    className="user-dropdown-content"
                  >
                    <FaCog className="settings-icon" />
                    <span>Settings</span>
                  </Link>
                </div>
              )}
            </div>
            <Link to="/">
              <button class="group flex items-center justify-start w-11 h-11 bg-red-600 rounded-full cursor-pointer relative overflow-hidden transition-all duration-200 shadow-lg hover:w-32 hover:rounded-lg active:translate-x-1 active:translate-y-1">
                <div class="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3">
                  <svg class="w-4 h-4" viewBox="0 0 512 512" fill="white">
                    <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                  </svg>
                </div>
                <div class="absolute right-5 transform translate-x-full opacity-0 text-white text-lg font-semibold transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                  Logout
                </div>
              </button>
            </Link>
          </div>
        </div>
        <Card>
          <CardContent>
            <div className="documents-header">
              <Typography variant="h5" component="div">
                Documents
              </Typography>
              <div className="action-icons">
                <FaFilter className="icon" onClick={openFilterModal} /> Filter
              </div>
            </div>
            <div className="documents-table">
              <div className="table-header1">
                <div>Name</div>
                <div>Author</div>
                <div>Update date</div>
                <div>View</div>
              </div>
              {certificates.map((certificate) => (
                <div className="table-row1" key={certificate.id}>
                  <div>{certificate.courseName}</div>
                  <div>{certificate.name}</div>
                  <div>{certificate.createdAt}</div>
                  <Link to="/cvalid">
                    {" "}
                    <div>
                      <i className="fas fa-eye"></i>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Filter Modal */}
      <Modal
        isOpen={filterModal}
        onRequestClose={closeFilterModal}
        contentLabel="Filter Modal"
        className="modal-overlay"
        overlayClassName="modal-overlay"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title">Filter Documents</h2>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="documentName">Document Name</label>
              <input
                type="text"
                id="documentName"
                value={filterDocumentName}
                onChange={(e) => setFilterDocumentName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="authorName">Author Name</label>
              <input
                type="text"
                id="authorName"
                value={filterAuthorName}
                onChange={(e) => setFilterAuthorName(e.target.value)}
              />
            </div>
          </div>
          <div className="modal-buttons">
            <button className="modal-button apply" onClick={applyFilters}>
              Apply
            </button>
            <button className="modal-button cancel" onClick={closeFilterModal}>
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Dashboard;

// updates
