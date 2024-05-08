import React, { useState } from "react";
import { Link } from "react-router-dom";
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

  const toggleUserDropdown = () => {
    setShowUserDropdown(!showUserDropdown);
  };

  // verify modal
  const [verifyModalIsOpen, setVerifyModalIsOpen] = useState(false);

  const openVerifyModal = () => {
    setVerifyModalIsOpen(true);
  };

  const closeVerifyModal = () => {
    setVerifyModalIsOpen(false);
  };

  const handleVerify = () => {
    // Implement delete account logic here
    console.log("Validated");
    closeVerifyModal();
  };

  // notvalid modal
  const [notValidModalIsOpen, setnotValidModalIsOpen] = useState(false);

  const opennotValidModal = () => {
    setnotValidModalIsOpen(true);
  };

  const closenotValidModal = () => {
    setnotValidModalIsOpen(false);
  };

  const handlenotValid = () => {
    // Implement delete account logic here
    console.log("Not Validated");
    closenotValidModal();
  };

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
                <Link to="/institutionaccountsetting" className="user-dropdown">
                  <div className="user-dropdown-content">
                    <FaCog className="settings-icon" />
                    <span>Settings</span>
                  </div>
                </Link>
              )}
            </div>
            <Link to="/" className="logout-icon-container">
              <FaSignOutAlt />
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
              <div className="table-row1">
                <div>Document</div>
                <div className="profile-table-image-container">
                  <img
                    src={userProfileImage}
                    alt="User Profile"
                    className="profile-table-image"
                  />
                </div>
                <div>11 February 2024</div>
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
                        onClick={handleVerify}
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
                        onClick={handlenotValid}
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
