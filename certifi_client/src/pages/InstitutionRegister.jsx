import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../public/logo.png";

// Function to validate email format
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Function to validate password strength (example, adjust as needed)
const validatePassword = (password) => {
  // Check for minimum length, uppercase, lowercase, number, and special character
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return re.test(password);
};

function InstitutionRegistration() {
  // State variables
  const [instituteType, setInstituteType] = useState("");
  const [instituteLocation, setInstituteLocation] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  // Example list of institution types (replace with your actual data)
  const instituteTypes = ["University", "College", "High School", "Other"];

  // Example list of locations (replace with your actual data)
  const locations = [
    "Thimphu",
    "Buthang",
    "Trongsa",
    "Wangdue",
    "Punakha ",
    // Add more locations as needed
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validation
    if (
      !instituteType ||
      !instituteLocation ||
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      alert("Please fill in all fields.");
      return;
    }

    if (!validateEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!validatePassword(password)) {
      alert(
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
      );
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (!termsAgreed) {
      alert("Please agree to the Terms of Service and Privacy Policy.");
      return;
    }

    setIsLoading(true); // Show loading indicator

    // TODO: Implement API call for registration (example using fetch)
    try {
      const response = await fetch("/api/register", {
        // Replace with your API endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          instituteType,
          instituteLocation,
          firstName,
          lastName,
          email,
          password, // Hash password on the backend
        }),
      });

      if (response.ok) {
        setRegistrationSuccess(true);

        // Clear form fields
        setInstituteType("");
        setInstituteLocation("");
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setTermsAgreed(false);
      } else {
        // Handle error (e.g., display error message)
        console.error("Registration failed:", response.statusText);
        alert("Registration failed. Please try again later.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("An error occurred during registration. Please try again later.");
    } finally {
      setIsLoading(false); // Hide loading indicator
    }
  };

  return (
    <div className="flex justify-center items-center flex-col">
      {/* Navigation bar - same as URegister */}
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

      {/* Registration form container - same as URegister */}
      <div className="form-container w-[50vw] xs:p-10 sm:p-20 xl:px-40 xl:pt-20 xl:pb-32">
        <p className="text-center text-3xl pb-16"> Create your institution Account </p>

        {/* Form with Tailwind CSS classes */}
        <form
          onSubmit={handleSubmit}
          className="flex justify-center items-center flex-col w-full gap-6"
        >
          <div className="flex gap-6 w-full">
            {/* Two-column layout */}

            {/* Institute Type input */}
            <div className="w-full">
              <input
                type="text"
                value={instituteType}
                onChange={(e) => setInstituteType(e.target.value)}
                placeholder="Select your institute type"
                className="h-14 border-2 border-[#002BFF] w-full rounded-md px-2"
              />
            </div>

            {/* Institute Location dropdown - Moved inside the form */}
            <div className="w-full">
              <select
                value={instituteLocation}
                onChange={(e) => setInstituteLocation(e.target.value)}
                className="h-14 border-2 border-[#002BFF] w-full rounded-md px-2"
              >
                <option value="" disabled>Select your institute location</option>
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-6 w-full">
            {/* Two-column layout */}

            {/* First Name input */}
            <div className="w-full">
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter your first name"
                className="h-14 border-2 border-[#002BFF] w-full rounded-md px-2"
              />
            </div>

            {/* Last Name input */}
            <div className="w-full">
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter your last name"
                className="h-14 border-2 border-[#002BFF] w-full rounded-md px-2"
              />
            </div>
          </div>

          {/* Email input - same as URegister */}
          <div className="w-full">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="h-14 border-2 border-[#002BFF] w-full rounded-md px-2"
            />
          </div>

          {/* Password input - same as URegister */}
          <div className="w-full">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="h-14 border-2 border-[#002BFF] w-full rounded-md px-2"
            />
          </div>

          {/* Confirm Password input - same as URegister */}
          <div className="w-full pb-10">
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className="h-14 border-2 border-[#002BFF] w-full rounded-md px-2"
            />
          </div>

          {/* Submit button - same as URegister */}
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

export default InstitutionRegistration;