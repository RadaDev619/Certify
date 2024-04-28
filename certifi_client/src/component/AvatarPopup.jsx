import React from "react";
import "../css/avatarpopup.css"

const AvatarPopup = ({ onClose }) => {
  return (
    <div className="avatar-popup-overlay">
      <div className="avatar-popup">
        <div className="avatar-popup-header">
          <h3>Upload photo</h3>
          <button onClick={onClose} className="close-button">
            &times;
          </button>
        </div>
        <div className="avatar-popup-content">
          <p>Drag and drop a image to the filed or select file a image from your PC</p>
          <div className="upload-area">
            <div className="upload-icon">
              <span>&#8593;</span>
              <span>&#8595;</span>
            </div>
            <p>Drop files here or click to upload</p>
            <p>Only JPG, PNG files smaller than 10MB</p>
          </div>
        </div>
        <div className="avatar-popup-footer">
          <button onClick={onClose}>Cancel</button>
          <button className="change-button">Change</button>
        </div>
      </div>
    </div>
  );
};

export default AvatarPopup;