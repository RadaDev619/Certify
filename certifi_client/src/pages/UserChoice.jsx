import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../public/logo.png";

function UserChoice() {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleCardClick = (userChoice) => {
    setSelectedUser(userChoice);
    // Add logic here to navigate to the appropriate registration page based on userChoice
    // For example:
    // if (userChoice === 1) {
    //   // Navigate to registration page for User 1
    // } else {
    //   // Navigate to registration page for User 2
    // }
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <nav className="w-full pt-12 pb-20 flex justify-between px-52 items-center">
        <img src={logo} alt="" />
      </nav>
      <div className="form-container w-[50vw] xs:p-10 sm:p-20 xl:px-40 xl:pt-20 xl:pb-32">
        <p className="text-center text-4xl pb-12">Choose User Type</p>
        <div className="flex justify-center items-center gap-10">

          <div
            className={`card w-60 h-60 rounded-lg shadow-md flex flex-col justify-center items-center cursor-pointer hover:scale-110 transition-transform ${
              selectedUser === 1 ? "border-1 border-blue-500" : ""
            }`}
            onClick={() => handleCardClick(1)}
          >
            <img src={logo} alt="User 1" className="w-32 h-32" />
            <p className="text-xl mt-4">User 1</p>
          </div>
          <div
            className={`card w-60 h-60 rounded-lg shadow-md flex flex-col justify-center items-center cursor-pointer hover:scale-110 transition-transform ${
              selectedUser === 2 ? "border-1 border-blue-500" : ""
            }`}
            onClick={() => handleCardClick(2)}
          >
            <img src={logo} alt="User 2" className="w-32 h-32" />
            <p className="text-xl mt-4">User 2</p>
          </div>
        </div>
        <Link to={"/register"}> 
          <button className="w-full bg-[#8000FF] h-14 rounded-md shadow-xl text-white text-xl hover:bg-[#5808a8] hover:transition-all hover:duration-500 mt-10">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
}

export default UserChoice;

