import React, { useState, useEffect } from "react";
import "../../css/institutiondashboard.css";
import certifiLogo from "../../assets/certifi-logo.png";
import userProfileImage from "../../assets/user-profile.png";
import metamaskLogo from "../../assets/metamask-logo.png";
import "@fortawesome/fontawesome-free/css/all.css";
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

  const toggleUserDropdown = () => {
    setShowUserDropdown(!showUserDropdown);
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
  const [notValidModalIsOpen, setnotValidModalIsOpen] = useState(false);

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
            <input type="text" placeholder="Search Document or Folder" />
          </div>
          <div className="user-info">
            <div className="metamask-logo-container">
              <img
                src={metamaskLogo}
                alt="MetaMask Logo"
                className="metamask-logo"
              />
            </div>
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
                  <div className="user-dropdown-content">
                    <FaCog className="settings-icon" />
                    <span>Settings</span>
                  </div>
                </div>
              )}
            </div>
            <div className="logout-icon-container">
              <FaSignOutAlt />
            </div>
          </div>
        </div>
        <Card>
          <CardContent>
            <div className="documents-header">
              <Typography variant="h5" component="div">
                Documents
              </Typography>
              <div className="action-icons">
                <FaFilter className="icon" /> Filter
              </div>
            </div>
            <div className="documents-table">
              <div className="table-header1">
                <div>Name</div>
                <div>Author</div>
                <div>Update date</div>
                <div>View</div>
                <div>Status</div>
              </div>
              {certificates.map((certificate) => (
                <div className="table-row1" key={certificate.id}>
                  <div className="table-row1">
                    <div>{certificate.courseName}</div>
                    <div>{certificate.name}</div>
                    <div>{certificate.createdAt}</div>
                    <div>
                      <i className="fas fa-eye"></i>
                    </div>
                    <div className="status pad-status">
                      <div className="valid" onClick={openVerifyModal}>
                        <FaCheck />
                      </div>
                      <div className="pending" onClick={opennotValidModal}>
                        <FaTimes />
                      </div>
                    </div>
                    {/* verify Modal */}
                    <Modal
                      isOpen={verifyModalIsOpen}
                      onRequestClose={closeVerifyModal}
                      contentLabel="Verify Account Modal"
                      className="modal-overlay"
                      overlayClassName="modal-overlay"
                    >
                      <div className="modal-content">
                        <div className="modal-header">
                          <h2 className="modal-title">Status validation </h2>
                        </div>
                        <p className="modal-message">
                          Are you sure this document is valid?
                        </p>
                        <div className="modal-buttons">
                          <button
                            className="modal-button verify"
                            onClick={() =>
                              handleVerify(currentVerifyCertificateId)
                            }
                          >
                            Verify
                          </button>
                          <button
                            className="modal-button cancel"
                            onClick={closeVerifyModal}
                          >
                            Back
                          </button>
                        </div>
                      </div>
                    </Modal>

                    {/* not validated modal */}
                    <Modal
                      isOpen={notValidModalIsOpen}
                      onRequestClose={closenotValidModal}
                      contentLabel="Verify Account Modal"
                      className="modal-overlay"
                      overlayClassName="modal-overlay"
                    >
                      <div className="modal-content">
                        <div className="modal-header">
                          <h2 className="modal-title">Status validation </h2>
                        </div>
                        <p className="modal-message">
                          Are you sure this document is not valid?
                        </p>
                        <div className="modal-buttons">
                          <button
                            className="modal-button not-valid"
                            onClick={() =>
                              handleNotValid(currentNotValidCertificateId)
                            }
                          >
                            Remove
                          </button>
                          <button
                            className="modal-button cancel"
                            onClick={closenotValidModal}
                          >
                            Back
                          </button>
                        </div>
                      </div>
                    </Modal>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
