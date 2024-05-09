import React, {useState} from "react";
import { Link } from "react-router-dom";
import "../../css/institutionaccountsetting.css";
import certifiLogo from "../../assets/certifi-logo.png";
import userProfileImage from "../../assets/user-profile.png";
import "@fortawesome/fontawesome-free/css/all.css";
import { FaSignOutAlt, FaUser, FaEdit } from "react-icons/fa";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import AvatarPopup from "../../component/AvatarPopup";
import NamePopup from "../../component/NamePopUp";
import PasswordPopup from "../../component/PasswordPopUp";
import EmailPopup from "../../component/EmailPopUp";
import DeleteAccountPopup from "../../component/DeleteAccountPopUp";

const Account = () => {
  const [showAvatarPopup, setShowAvatarPopup] = useState(false);
  const [showNamePopup, setShowNamePopup] = useState(false);
  const [showPasswordPopup, setShowPasswordPopup] = useState(false);
  const [showEmailPopup, setShowEmailPopup] = useState(false);
  const [showDeleteAccountPopup, setShowDeleteAccountPopup] = useState(false);

  const handleEditAvatar = () => {
    setShowAvatarPopup(true);
  };

  const handleCloseAvatarPopup = () => {
    setShowAvatarPopup(false);
  };

  const handleEditName = () => {
    setShowNamePopup(true);
  };

  const handleCloseNamePopup = () => {
    setShowNamePopup(false);
  };

  const handleEditPassword = () => {
    setShowPasswordPopup(true);
  };

  const handleClosePasswordPopup = () => {
    setShowPasswordPopup(false);
  };

  const handleEditEmail = () => {
    setShowEmailPopup(true);
  };

  const handleCloseEmailPopup = () => {
    setShowEmailPopup(false);
  };

  const handleDeleteAccount = () => {
    setShowDeleteAccountPopup(true);
  };

  const handleCloseDeleteAccountPopup = () => {
    setShowDeleteAccountPopup(false);
  };

  return (
    <div className="dashboard-wrapper">
      {showAvatarPopup && (
        <AvatarPopup onClose={handleCloseAvatarPopup} />
      )}
      {showNamePopup && <NamePopup onClose={handleCloseNamePopup} />}
      {showPasswordPopup && (
        <PasswordPopup onClose={handleClosePasswordPopup} />
      )}
      {showEmailPopup && <EmailPopup onClose={handleCloseEmailPopup} />}
      {showDeleteAccountPopup && (
        <DeleteAccountPopup onClose={handleCloseDeleteAccountPopup} />
      )}
      <div className="sidebar">
        <Link to="institutiondashboard" className="logo-container">
          <div className="logo-circle">
            <img src={certifiLogo} alt="CertiFi Logo" className="logo" />
          </div>
          <span className="company-name">CertiFi</span>
        </Link>
        <div className="home">
          <FaUser className="icon" /> Account
        </div>
      </div>
      <div className="main-content">
        <div className="search-bar">

          <div className="user-info">

            <div
              className="profile-image-container"
            >
              <img
                src={userProfileImage}
                alt="User Profile"
                className="profile-image"
              />
              <span className="username">Username</span>
            </div>
            <Link to="/" className="logout-icon-container">
              <FaSignOutAlt />
            </Link>
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
                  <div className="edit-container" onClick={handleEditAvatar}>
                    <span className="edit-text">Edit</span>
                    <FaEdit className="edit-icon" />
                  </div>
                </div>
                <div className="account-detail">
                  <span className="label">Name</span>
                  <div className="input-container">
                    <input type="text" value="Name" className="input-field" readOnly />
                  </div>
                  <div className="edit-container" onClick={handleEditName}>
                    <span className="edit-text" >Edit</span>
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
                      readOnly
                    />
                    <div className="edit-container" onClick={handleEditPassword}>
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
                      readOnly
                    />
                    <div className="edit-container" onClick={handleEditEmail}>
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
                <button className="delete-account-button" onClick={handleDeleteAccount}>
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
