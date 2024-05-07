import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../css/dashboard.css";
import certifiLogo from "../../assets/certifi-logo.png";
import userProfileImage from "../../assets/user-profile.png";
import metamaskLogo from "../../assets/metamask-logo.png";
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

  const toggleCreateDropdown = () => {
    setShowCreateDropdown(!showCreateDropdown);
  };

  const toggleUserDropdown = () => {
    setShowUserDropdown(!showUserDropdown);
  };

  const [renameModalIsOpen, setRenameModalIsOpen] = useState(false);
  const [newName, setNewName] = useState("");

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
                  <Link to="/accountsetting" className="user-dropdown-content">
                    <FaCog className="settings-icon" />
                    <span>Settings</span>
                  </Link>
                </div>
              )}
            </div>

            {/* <div
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
            </div> */}
            <div className="logout-icon-container">
              <FaSignOutAlt />
            </div>
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
              <div className="table-row table-rows">
                <div>Document</div>
                <div className="status valids">Valid</div>
                <div>User name</div>
                <div>11 February 2024</div>
                <div className="view-icon">
                  <i className="fas fa-eye "></i>
                </div>
                <div className="view-icon">
                  <i className="fas fa-upload"></i>
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
              <div className="table-row table-rows">
                <div>Document</div>
                <div className="status pendings">Pending</div>
                <div>User name</div>
                <div>11 February 2024</div>
                <div className="view-icon">
                  <i className="fas fa-eye"></i>
                </div>
                <div className="view-icon">
                  <i className="fas fa-upload"></i>
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
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
