import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "../../public/logo.png";
import "../css/index.css";
import LoadingAnimation from "../component/LoadingAnimation"; // import loading

function ForgotPasswordchange() {
  // Define state variables for form inputs
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Password", password);

    if (!password) {
      alert("All fields are required");
    } else {
      setIsLoading(true); // is loading

      fetch("https://prj-certifi-backend.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "Success") {
            alert("Login successful!");

            setPassword("");
            setIsLoading(false); //loading
            navigate("/login");
          } else {
            alert("Login failed. Please try again.");
          }
        });
    }
  };

  return isLoading === true ? (
    <LoadingAnimation />
  ) : (
    <div className="flex justify-center items-center flex-col">
      <nav className="w-full pt-12 pb-20 flex justify-between px-52 items-center">
        <img src={logo} alt="Logo" />
      </nav>

      <div className="form-container  xs:p-10 sm:p-20 xl:px-40 xl:pt-20 xl:pb-32">
        <p className="text-center text-4xl pb-12"> Change Password</p>

        <form
          onSubmit={handleSubmit}
          className="flex justify-center items-center flex-col w-full gap-6"
        >
          <div className="w-full">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Set Your New Password"
              className="h-12 border-2  w-full rounded-md px-2"
            />
          </div>
          <div className="w-full">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="COnfirm Password"
              className="h-12 border-2  w-full rounded-md px-2"
            />
          </div>
          <div className="w-full  flex justify-center ">
            <button type="submit" className="loginBut w-[400px] ">
              <span>Login</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPasswordchange;
