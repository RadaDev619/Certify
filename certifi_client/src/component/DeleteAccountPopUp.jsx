import React from "react";
import "../css/deleteaccountpopup.css"

const DeleteAccountPopup = ({ onClose }) => {
  const handleDeleteAccount = () => {
    // Implement logic to delete the account
    console.log("Account deleted");
    onClose();
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <div className="popup-header">
          <h3>Delete account</h3>
          <button onClick={onClose} className="close-button">
            &times;
          </button>
        </div>
        <div className="popup-content">
          <p>
            Are you sure want to delete Your account? You will loose immediately
            loose access to all related services
          </p>
        </div>
        <div className="popup-footer">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleDeleteAccount} className="delete-button">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountPopup;