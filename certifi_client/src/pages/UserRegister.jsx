import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../public/logo.png";

function URegister() {
  // Define state variables for registration inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Basic validation (add more as needed)
    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // TODO: Call backend API for registration
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);

    // Clear form fields after submission
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="flex justify-center items-center flex-col">
      {/* Navigation bar - similar to login page */}
      <nav className="w-full pt-12 pb-20 flex justify-between px-52 items-center">
        <img src={logo} alt="" />
        <p>
          Already have an account?{" "}
          <Link
            to={"/login"}
            className="pl-4 text-blue-500 hover:underline hover:underline-blue-500 hover:underline-offset-[7px] hover:transition-all hover:duration-500"
          >
            Sign In
          </Link>
        </p>
      </nav>

      {/* Registration form container */}
      <div className="form-container w-[50vw] xs:p-10 sm:p-20 xl:px-40 xl:pt-20 xl:pb-32">
        <p className="text-center text-4xl pb-12">Sign Up</p>

        {/* Form with Tailwind CSS classes */}
        <form onSubmit={handleSubmit} className="flex justify-center items-center flex-col w-full gap-6">
          {/* Name input */}
          <div className="w-full">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              className="h-14 border-2 border-[#002BFF] w-full rounded-md px-2"
            />
          </div>

          {/* Email input - similar to login page */}
          <div className="w-full">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="h-14 border-2 border-[#002BFF] w-full rounded-md px-2"
            />
          </div>

          {/* Password input - similar to login page */}
          <div className="w-full">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="h-14 border-2 border-[#002BFF] w-full rounded-md px-2"
            />
          </div>

          {/* Confirm Password input */}
          <div className="w-full pb-10">
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className="h-14 border-2 border-[#002BFF] w-full rounded-md px-2"
            />
          </div>

          {/* Submit button - similar to login page */}
          <button 
            type="submit" 
            className="w-full bg-[#8000FF] h-14 rounded-md shadow-xl text-white text-xl hover:bg-[#5808a8] hover:transition-all hover:duration-500"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default URegister;