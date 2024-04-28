import React, { useState } from "react";
import "../css/namepopup.css"

const EmailPopup = ({ onClose }) => {
  const [newEmail, setNewEmail] = useState("");

  const handleChangeEmail = () => {
    // Implement logic to change the email
    console.log("New Email:", newEmail);
    onClose();
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <div className="popup-header">
          <h3>Enter a new e-mail</h3>
          <button onClick={onClose} className="close-button">
            &times;
          </button>
        </div>
        <div className="popup-content">
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="smt@gmail.com"
          />
        </div>
        <div className="popup-footer">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleChangeEmail} className="change-button">
            Change e-mail
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailPopup;