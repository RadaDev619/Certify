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
