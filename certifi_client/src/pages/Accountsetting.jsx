import React, { useState } from "react";
import "./../css/accountsetting.css";
import certifiLogo from "./../assets/certifi-logo.png";
import userProfileImage from "./../assets/user-profile.png";
import metamaskLogo from "./../assets/metamask-logo.png";
import "@fortawesome/fontawesome-free/css/all.css";
import { FaSignOutAlt, FaSearch, FaUser, FaCog, FaEdit } from "react-icons/fa";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const Account = () => {
  const [showCreateDropdown, setShowCreateDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const toggleCreateDropdown = () => {
    setShowCreateDropdown(!showCreateDropdown);
  };

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
          <FaUser className="icon" /> Account
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
        <Card className="account-settings-card">
          <CardContent>
            <div className="account-settings-container">
              <Typography
                variant="h5"
                component="div"
                className="account-settings-header"
              >
                Account setting
              </Typography>
              <div className="account-details">
                <div className="account-detail">
                  <div className="label-container">
                    <span className="label">Avatar</span>
                    <div className="avatar-container">
                      <img
                        src={userProfileImage}
                        alt="Avatar"
                        className="avatar-image"
                      />
                    </div>
                  </div>
                  <div className="edit-container">
                    <span className="edit-text">Edit</span>
                    <FaEdit className="edit-icon" />
                  </div>
                </div>
                <div className="account-detail">
                  <span className="label">Name</span>
                  <div className="input-container">
                    <input type="text" value="Name" className="input-field" />
                  </div>
                  <div className="edit-container">
                    <span className="edit-text">Edit</span>
                    <FaEdit className="edit-icon" />
                  </div>
                </div>
                <div className="account-detail">
                  <span className="label">Password</span>
                  <div className="input-container">
                    <input
                      type="password"
                      value="************"
                      className="input-field"
                    />
                    <div className="edit-container">
                      <span className="edit-text">Edit</span>
                      <FaEdit className="edit-icon" />
                    </div>{" "}
                  </div>
                </div>
                <div className="account-detail">
                  <span className="label">Email</span>
                  <div className="input-container">
                    <input
                      type="email"
                      value="Test@gmail.com"
                      className="input-field"
                    />
                    <div className="edit-container">
                      <span className="edit-text">Edit</span>
                      <FaEdit className="edit-icon" />
                    </div>{" "}
                  </div>
                </div>
              </div>
              <div className="delete-account-container">
                <Typography
                  variant="body1"
                  component="div"
                  className="delete-account-label"
                >
                  Delete account
                </Typography>
                <Typography
                  variant="body2"
                  component="div"
                  className="delete-account-description"
                >
                  Deletion of account will cause immediate loss of account to
                  services associated with your CertiFi account and permanent
                  deletion of your personal information.
                </Typography>
                <button className="delete-account-button">
                  Delete Account
                </button>
              </div>
            </div>
          </CardContent>
        </Card>{" "}
      </div>
    </div>
  );
};

export default Account;
