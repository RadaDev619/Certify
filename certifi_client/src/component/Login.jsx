import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../public/logo.png";
import { useNavigate } from "react-router-dom";
import "../css/index.css";

function Login() {
<<<<<<< HEAD
  // Define state variables for form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false); // Add rememberMe state
=======
  // Define state   variables for form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
>>>>>>> fdb76ded004af2af694fb4763d19cddf09247e5d

  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Email", email);
    console.log("Password", password);

    if (!password || !email) {
      alert("All fields are required");
    } else {
      fetch("https://prj-certifi-backend.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "Success") {
            alert("Login successful!");
<<<<<<< HEAD
            if (rememberMe) {
              // Store email in local storage
              window.localStorage.setItem("email", email);
            } else {
              // Clear email from local storage if rememberMe is unchecked
              window.localStorage.removeItem("email");
            }
=======
            window.localStorage.setItem("email", email);
>>>>>>> fdb76ded004af2af694fb4763d19cddf09247e5d
            setEmail("");
            setPassword("");
            navigate("/dashboard");
          } else {
            alert("Login failed. Please try again.");
          }
        });
    }
  };
<<<<<<< HEAD

  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
  };
=======
>>>>>>> fdb76ded004af2af694fb4763d19cddf09247e5d

  return (
    <div className="flex justify-center items-center flex-col">
      <nav className=" w-full pt-12 pb-20 flex justify-between px-52 items-center">
        <img src={logo} alt="" />
        <p>
          Don't have an account?
          <Link
<<<<<<< HEAD
            to={"/uregister"}
=======
            to={"/userchoice"}
>>>>>>> fdb76ded004af2af694fb4763d19cddf09247e5d
            className="pl-4 text-blue-500 hover:underline hover:underline-blue-500 hover:underline-offset-[7px] hover:transition-all hover:duration-500"
          >
            Sign Up
          </Link>
        </p>
      </nav>

<<<<<<< HEAD
      <div className="form-container  xs:p-10 sm:p-20 xl:px-40 xl:pt-20 xl:pb-32">
        <p className="text-center text-4xl pb-12"> Log In</p>
      
=======
      <div className="form-container w-[50vw] xs:p-10 sm:p-20 xl:px-40 xl:pt-20 xl:pb-32">
        <p className="text-center text-4xl pb-12">Log In</p>
>>>>>>> fdb76ded004af2af694fb4763d19cddf09247e5d
        <form
          onSubmit={handleSubmit}
          className="flex justify-center items-center flex-col w-full gap-6"
        >
          <div className="w-full">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="User Email Address"
              className="h-12 border-2  w-full rounded-md px-2"
            />
          </div>
          <div className="w-full">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="h-12 border-2  w-full rounded-md px-2"
            />
            <div className="py-4 flex justify-between">
<<<<<<< HEAD
              <div className="flex justify-center items-center gap-2 text-sm">
                <div className="dark:bg-black/10">
                  <label className="text-white">
                    <input
                      className="dark:border-white-400/20 dark:scale-100 transition-all duration-500 ease-in-out dark:hover:scale-110 dark:checked:scale-100 w-5 h-5"
                      type="checkbox"
                      checked={rememberMe} // Set checked state
                      onChange={handleRememberMeChange} // Handle checkbox change
                    />
                  </label>
                </div>
                <p className="">Remember Me</p>
=======
              <div className="flex justify-center items-center gap-2">
                <input type="radio" className="" />
                Remember Me
>>>>>>> fdb76ded004af2af694fb4763d19cddf09247e5d
              </div>

              <Link to={"/Forgotpassword"}>
<<<<<<< HEAD
                <p className="pl-4 text-sm hover:text-blue-500  hover:duration-300">
                  Forgot Password?
                </p>
              </Link>
            </div>
          </div>
          <div className="w-full  flex justify-center ">
            <button type="submit" className="loginBut w-[400px] ">
              <span>Sign In</span>
=======
                <p>Forgot Password?</p>
              </Link>
            </div>
          </div>
          <div className="w-full  flex justify-center">
            <button
              type="submit"
              className="w-full bg-[#8000FF] h-14 rounded-md shadow-xl text-white text-xl hover:bg-[#5808a8] hover:transition-all hover:duration-500"
            >
              Sign In
>>>>>>> fdb76ded004af2af694fb4763d19cddf09247e5d
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;