import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../css/dashboard.css";
import metamaskLogo from "../../assets/metamask-logo.png";
import certifiLogo from "../../assets/certifi-logo.png";
import userProfileImage from "../../assets/user-profile.png";
import "@fortawesome/fontawesome-free/css/all.css";
import {
  FaSignOutAlt,
  FaSearch,
  FaPlusCircle,
  FaHome,
  FaEdit,
  FaTrashAlt,
  FaFileAlt,
  FaCog,
} from "react-icons/fa";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Modal from "react-modal";

const Dashboard = () => {
  const [showCreateDropdown, setShowCreateDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [certificates, setCertificates] = useState([]); // State to store fetched certificates

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
        alert("An error occurred while fetching certificates. Please try again.");
      });
  }, []);

  const toggleCreateDropdown = () => {
    setShowCreateDropdown(!showCreateDropdown);
  };

  const toggleUserDropdown = () => {
    setShowUserDropdown(!showUserDropdown);
  };

  const [renameModalIsOpen, setRenameModalIsOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [metamaskPopupIsOpen, setMetamaskPopupIsOpen] = useState(false);
  const [metamaskPopupPendingIsOpen, setMetamaskPopupPendingIsOpen] = useState(false);

  const openMetamaskPopup = () => {
    setMetamaskPopupIsOpen(true);
  };

  // Function to close Metamask popup
  const closeMetamaskPopup = () => {
    setMetamaskPopupIsOpen(false);
  };

  const openMetamaskPopupPending = () => {
    setMetamaskPopupPendingIsOpen(true);
  };

  // Function to close Metamask popup
  const closeMetamaskPopupPending = () => {
    setMetamaskPopupPendingIsOpen(false);
  };

  const openRenameModal = () => {
    setRenameModalIsOpen(true);
  };

  const closeRenameModal = () => {
    setRenameModalIsOpen(false);
    setNewName("");
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleSubmit = () => {
    // Handle the renaming logic here
    console.log("New name:", newName);
    closeRenameModal();
  };

  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);

  const openDeleteModal = () => {
    setDeleteModalIsOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalIsOpen(false);
  };

  const handleDelete = () => {
    // Implement delete account logic here
    console.log("Account deleted");
    closeDeleteModal();
  };

  return (
    <div className="dashboard-wrapper">
      <Modal
        isOpen={metamaskPopupIsOpen}
        onRequestClose={closeMetamaskPopup}
        contentLabel="Metamask Connection Modal"
        className="modal-overlay"
        overlayClassName="modal-overlay"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title">Metamask Connection Required</h2>
          </div>
          <p className="modal-message">
            Please connect your Metamask account to upload documents.
          </p>


          <div className="modal-buttons">
          <button className="metamask-logo-container">
            <img
              src={metamaskLogo}
              alt="Metamask Logo"
              className="metamask-logo"
            />
            Connect Wallet
          </button>
            <button className="modal-button" onClick={closeMetamaskPopup}>
              Close
            </button>
            {/* <button className="modal-button connect-wallet-button">
        <img src={metamaskLogo} alt="Metamask Logo" className="connect-wallet-logo" />
        Connect Wallet
      </button> */}
          </div>
        </div>
      </Modal>
      {/* popup pending */}
      <Modal
        isOpen={metamaskPopupPendingIsOpen}
        onRequestClose={closeMetamaskPopupPending}
        contentLabel="Metamask Connection Modal"
        className="modal-overlay"
        overlayClassName="modal-overlay"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title">Document Pending</h2>
          </div>
          <p className="modal-message">
            You cannot upload the document since it has not been varified.
          </p>


          <div className="modal-buttons">
            <button className="modal-button" onClick={closeMetamaskPopupPending}>
              Close
            </button>
          </div>
        </div>
      </Modal>

      <div className="sidebar">
        <div className="logo-container">
          <div className="logo-circle">
            <img src={certifiLogo} alt="CertiFi Logo" className="logo" />
          </div>
          <span className="company-name">CertiFi</span>
        </div>

        <div className="create-btn-container">
          <button className="create-btn" onClick={toggleCreateDropdown}>
            <FaPlusCircle className="icon" /> Create
            {showCreateDropdown && (
              <div className="create-dropdown">
                <Link to="/cform" className="create-dropdown-link">
                  <div className="create-dropdown-header">
                    <FaFileAlt className="file-icon" />
                    <span className="certificate-text">Certificate</span>
                  </div>
                  <div className="create-dropdown-description">
                    Choose a template, create a certificate and manage ownership
                    and validity
                  </div>
                </Link>
              </div>
            )}
          </button>
        </div>

        <div className="home">
          <FaHome className="icon" /> Home
        </div>
      </div>
      <div className="main-content">
        {/* Rest of the code remains the same */}
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
                <div className="user-dropdown">
                  <Link to="/accountsetting" className="user-dropdown-content">
                    <FaCog className="settings-icon" />
                    <span>Settings</span>
                  </Link>
                </div>
              )}
            </div>
            <Link to="/" className="logout-icon-container">
              <FaSignOutAlt />
            </Link>
          </div>
        </div>
        {/* Rest of the code remains the same */}
        <Card>
          <CardContent>
            <div className="documents-header">
              <Typography variant="h5" component="div">
                Documents
              </Typography>

              <Modal
                isOpen={renameModalIsOpen}
                onRequestClose={closeRenameModal}
                contentLabel="Rename Modal"
                className="modal-overlay"
                overlayClassName="modal-overlay"
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <h2 className="modal-title">Enter a new name</h2>
                    <span className="modal-close" onClick={closeRenameModal}>
                      &times;
                    </span>
                  </div>
                  <input
                    type="text"
                    value={newName}
                    onChange={handleNameChange}
                    placeholder="Name"
                    className="modal-input"
                  />
                  <div className="modal-buttons">
                    <button
                      className="modal-button cancel"
                      onClick={closeRenameModal}
                    >
                      Cancel
                    </button>
                    <button
                      className="modal-button confirm"
                      onClick={handleSubmit}
                    >
                      Change name
                    </button>
                  </div>
                </div>
              </Modal>
              {/* Delete Modal */}
              <Modal
                isOpen={deleteModalIsOpen}
                onRequestClose={closeDeleteModal}
                contentLabel="Delete Account Modal"
                className="modal-overlay"
                overlayClassName="modal-overlay"
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <h2 className="modal-title">Delete Document</h2>
                  </div>
                  <p className="modal-message">
                    Are you sure want to delete this document ? you will loose
                    this data and it will be permanently be deleted.
                  </p>
                  <div className="modal-buttons">
                    <button
                      className="modal-button delete"
                      onClick={handleDelete}
                    >
                      Delete
                    </button>
                    <button
                      className="modal-button cancel"
                      onClick={closeDeleteModal}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </Modal>
            </div>
            <div className="documents-table">
              <div className="table-header table-headers">
                <div>Name</div>
                <div>Status</div>
                <div>Author</div>
                <div>Update date</div>
                <div>View</div>
                <div>Upload</div>
                <div>Actions</div>
              </div>
   
            {certificates.map((certificate) => (
              <div className="table-rows table-rowss" key={certificate._id}>
                <div>{certificate.courseName}</div>
                <div className={`status ${certificate.verified === true ? true : false}`}>
                  {certificate.verified}</div>
                <div>{certificate.name}</div>
                <div>{certificate.createdAt}</div>
                <div className="view-icon">
                  <i className="fas fa-eye"></i>
                </div>
                <div className="view-icon">
                  <i className="fas fa-upload" onClick={openMetamaskPopupPending}></i>
                </div>

                <div className="action-icons">
                  <div className="icon-container" onClick={openRenameModal}>
                    <FaEdit className="icon" /> Rename
                  </div>

                  <div className="icon-container" onClick={openDeleteModal}>
                    <FaTrashAlt className="icon" />
                    Delete
                  </div>
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
