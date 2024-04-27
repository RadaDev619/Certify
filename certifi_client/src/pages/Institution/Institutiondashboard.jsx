import React, { useState } from "react";
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
  FaEdit,
  FaFilter,
  FaTrashAlt,
  FaCog,
} from "react-icons/fa";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const Dashboard = () => {
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const toggleUserDropdown = () => {
    setShowUserDropdown(!showUserDropdown);
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
                  <div className="valid">
                    <FaCheck />
                  </div>
                  <div className="pending">
                    <FaTimes />
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
