import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../public/logo.png"; // Assuming logo.png is in the correct path

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    // Add visual feedback for invalid email if needed
  };

  const handleSendOtp = async (event) => {
    event.preventDefault();
    console.log("Email for OTP:", email);
    setIsOtpSent(true);
    alert("OTP sent successfully!"); // Replace with your OTP sending logic
  };

  const handleResendOtp = () => {
    console.log("Resending OTP to:", email);
    // Add logic to resend OTP
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    handleSendOtp(event);
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <nav className="w-full pt-12 pb-20 flex justify-between px-52 items-center">
        <img src={logo} alt="" />
        <p>
          Remember Password?{" "}
          <Link
            to={"/login"}
            className="pl-4 text-blue-500 hover:underline hover:underline-blue-500 hover:underline-offset-[7px] hover:transition-all hover:duration-500"
          >
            Sign In
          </Link>
        </p>
      </nav>

      <div className="form-container w-[50vw] xs:p-10 sm:p-20 xl:px-40 xl:pt-20 xl:pb-32">
        <p className="text-center text-4xl pb-12">Forgot Password</p>
        <form onSubmit={handleSubmit} className="flex justify-center items-center flex-col w-full gap-6">
          <div className="w-full">
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email address"
              className="h-14 border-2 border-[#002BFF] w-full rounded-md px-2"
            />
          </div>

          {isOtpSent && (
            <p className="text-sm text-gray-600">
              Didn't get the OTP?{" "}
              <button type="button" onClick={handleResendOtp} className="text-blue-500 underline">
                Resend
              </button>
            </p>
          )}

          <div className="w-full flex gap-4">
            <button
              type="submit"
              className="w-full bg-[#8000FF] h-14 rounded-md shadow-xl text-white text-xl hover:bg-[#5808a8] hover:transition-all hover:duration-500"
            >
              Send OTP
            </button>

            {isOtpSent && (
              <Link to="/otpenter" className="w-full flex">
                <button className="w-full bg-[#8000FF] h-14 rounded-md shadow-xl text-white text-xl hover:bg-[#5808a8] hover:transition-all hover:duration-500">
                  Continue
                </button>
              </Link>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;