import React, { useState } from "react";
import "../css/avatarpopup.css";

const AvatarPopup = ({ onClose }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSave = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("avatar", selectedFile);

      fetch("http://localhost:5173/upload-avatar", { // Corrected URL
        method: "POST",
        body: formData,
      })
        .then((response) => {
          console.log("Upload response:", response);
          if (response.ok) {
            onClose();
          } else {
            console.error("Failed to upload avatar");
          }
        })
        .catch((error) => {
          console.error("Error uploading avatar:", error);
        });
    } else {
      console.error("No file selected");
    }
  };

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
          <p>
            Drag and drop an image to the field or select a file from your PC
          </p>
          <div className="upload-area">
            <input
              type="file"
              accept="image/png, image/jpeg"
              onChange={handleFileChange}
            />
            <p>Only JPG, PNG files smaller than 10MB</p>
          </div>
        </div>
        <div className="avatar-popup-footer">
          <button onClick={onClose}>Cancel</button>
          <button className="change-button" onClick={handleSave}>
            Change
          </button>
        </div>
      </div>
    </div>
  );
};

export default AvatarPopup;
