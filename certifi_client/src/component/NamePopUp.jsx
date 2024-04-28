import React, { useState } from "react";
import "../css/namepopup.css"

const NamePopup = ({ onClose }) => {
  const [newName, setNewName] = useState("");

  const handleChange = (e) => {
    setNewName(e.target.value);
  };

  const handleChangeName = () => {
    // Implement logic to update the name
    console.log("New name:", newName);
    onClose();
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <div className="popup-header">
          <h3>Enter a new name</h3>
          <button onClick={onClose} className="close-button">
            &times;
          </button>
        </div>
        <div className="popup-content">
          <input
            type="text"
            value={newName}
            onChange={handleChange}
            placeholder="Name"
          />
        </div>
        <div className="popup-footer">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleChangeName} className="change-button">
            Change name
          </button>
        </div>
      </div>
    </div>
  );
};

export default NamePopup;