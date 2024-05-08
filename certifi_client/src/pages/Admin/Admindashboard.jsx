import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../css/admindashboard.css";
import certifiLogo from "../../assets/certifi-logo.png";
import userProfileImage from "../../assets/user-profile.png";
import "@fortawesome/fontawesome-free/css/all.css";
import { FaSignOutAlt, FaHome, FaCog } from "react-icons/fa";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const Dashboard = () => {
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState([]);

  const toggleUserDropdown = () => {
    setShowUserDropdown(!showUserDropdown);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const InstitutionModal = () => {
    return (
      <div className={`modal ${showModal ? "show" : ""}`} onClick={closeModal}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <span className="close" onClick={closeModal}>
            &times;
          </span>
          <h2>Add Institution</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Company Name" name="companyName" />
            <input
              type="text"
              placeholder="Institution Type"
              name="institutionType"
            />
            <input type="text" placeholder="Location" name="location" />
            <input
              type="email"
              placeholder="Email Address"
              name="emailAddress"
            />
            <input type="password" placeholder="Password" name="password" />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formValues = {
      companyName: e.target.elements.companyName.value,
      institutionType: e.target.elements.institutionType.value,
      location: e.target.elements.location.value,
      emailAddress: e.target.elements.emailAddress.value,
      password: e.target.elements.password.value,
    };
    setFormData([...formData, formValues]);
    closeModal();
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
        <Card>
          <CardContent>
            <div className="documents-header">
              <Typography variant="h5" component="div">
                Institutions
              </Typography>
            </div>
            <div className="documents-table">
              <div className="table-header admin-header">
                <div>Company Name</div>
                <div>Institution Type</div>
                <div>Location</div>
                <div>Email Address</div>
                <div>Password</div>
              </div>
              {formData.map((data, index) => (
                <div key={index} className="table-row">
                  <div>{data.companyName}</div>
                  <div>{data.institutionType}</div>
                  <div>{data.location}</div>
                  <div>{data.emailAddress}</div>
                  <div>{data.password}</div>
                </div>
              ))}
            </div>
            <div className="document-wrapper">
              <div className="no-documents-text">
                {formData.length === 0 ? "No Institutes" : null}
              </div>
              <button className="add-new-btn" onClick={toggleModal}>
                Add Institution
              </button>
            </div>
          </CardContent>
        </Card>
        <InstitutionModal />
      </div>
    </div>
  );
};

export default Dashboard;
