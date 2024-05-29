import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "../../public/logo.png";
import "../css/index.css";
import LoadingAnimation from "./LoadingAnimation";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email || !password) {
      alert("All fields are required");
      return;
    }
    
    setIsLoading(true);

    fetch("https://prj-certifi-backend.onrender.com/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        if (data.status === "Success") {
          alert("Login successful!");
          if (rememberMe) {
            window.localStorage.setItem("email", email);
          } else {
            window.localStorage.removeItem("email");
          }
          setEmail("");
          setPassword("");
          navigate("/dashboard");
        } else {
          alert("Login failed. Please try again.");
        }
      })
      .catch(() => {
        setIsLoading(false);
        alert("An error occurred. Please try again later.");
      });
  };

  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <nav className="w-full pt-12 pb-20 flex justify-between px-52 items-center">
        <img src={logo} alt="Logo" />
        <p>
          Don't have an account?
          <Link
            to={"/register"}
            className="pl-4 text-blue-500 hover:underline hover:underline-blue-500 hover:underline-offset-[7px] hover:transition-all hover:duration-500"
          >
            Sign Up
          </Link>
        </p>
      </nav>

      <div className="form-container xs:p-10 sm:p-20 xl:px-40 xl:pt-20 xl:pb-32">
        <p className="text-center text-4xl pb-12">Log In</p>

        {isLoading ? (
          <LoadingAnimation />
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex justify-center items-center flex-col w-full gap-6"
          >
            <div className="w-full">
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="User Email Address"
                className="h-12 border-2 w-full rounded-md px-2"
              />
            </div>
            <div className="w-full">
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="h-12 border-2 w-full rounded-md px-2"
              />
              <div className="py-4 flex justify-between">
                <div className="flex justify-center items-center gap-2 text-sm">
                  <div className="dark:bg-black/10">
                    <label className="text-white">
                      <input
                        className="dark:border-white-400/20 dark:scale-100 transition-all duration-500 ease-in-out dark:hover:scale-110 dark:checked:scale-100 w-5 h-5"
                        type="checkbox"
                        checked={rememberMe}
                        onChange={handleRememberMeChange}
                      />
                    </label>
                  </div>
                  <p className="">Remember Me</p>
                </div>
                <Link to={"/Forgotpassword"}>
                  <p className="pl-4 text-sm hover:text-blue-500 hover:duration-300">
                    Forgot Password?
                  </p>
                </Link>
              </div>
            </div>
            <div className="w-full flex justify-center">
              <button type="submit" className="loginBut w-[400px]">
                <span>Sign In</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Login;
