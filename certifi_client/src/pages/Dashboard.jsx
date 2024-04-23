import React from "react";
import "../css/dashboard.css";
import certifiLogo from "./../assets/certifi-logo.png";
import userProfileImage from "./../assets/user-profile.png";
import metamaskLogo from "./../assets/metamask-logo.png";
import "@fortawesome/fontawesome-free/css/all.css";

import {
  FaSignOutAlt,
  FaSearch,
  FaPlusCircle,
  FaHome,
  FaEdit,
  FaTrashAlt,
} from "react-icons/fa";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const Dashboard = () => {
  return (
    <div className="dashboard-wrapper">
      <div className="sidebar">
        <div className="logo-container">
          <div className="logo-circle">
            <img src={certifiLogo} alt="CertiFi Logo" className="logo" />
          </div>
          <span className="company-name">CertiFi</span>
        </div>
        <button className="create-btn">
          <FaPlusCircle className="icon" /> Create
        </button>

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
            <div className="profile-image-container">
              <img
                src={userProfileImage}
                alt="User Profile"
                className="profile-image"
              />
              <span className="username">Username</span>
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
                <FaEdit className="icon" /> Rename
                <FaTrashAlt className="icon" /> Delete
              </div>
            </div>
            <div className="documents-table">
              <div className="table-header">
                <div>Name</div>
                <div>Status</div>
                <div>Author</div>
                <div>Update date</div>
                <div>View</div>
                <div>Upload</div>
              </div>
              <div className="table-row">
                <div>Document</div>
                <div className="status valid">Valid</div>
                <div>User name</div>
                <div>11 February 2024</div>
                <div>
                  <i className="fas fa-eye"></i>
                </div>
                <div>
                  <i className="fas fa-upload"></i>
                </div>
              </div>
              <div className="table-row">
                <div>Document</div>
                <div className="status pending">Pending</div>
                <div>User name</div>
                <div>11 February 2024</div>
                <div>
                  <i className="fas fa-eye"></i>
                </div>
                <div>
                  <i className="fas fa-upload"></i>
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
