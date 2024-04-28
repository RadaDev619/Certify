import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../public/logo.png"
import { useNavigate } from "react-router-dom";


function InsLogin() {
  // Define state   variables for form inputs
const [email, setEmail ] = useState("")
const [password,setPassword] = useState("")

const navigate = useNavigate()

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault(); 

    console.log("Email", email)
    console.log("Password", password)
  
    if (!password || !email){
      alert("All fields are required")
    }
    else {
      fetch ("https://prj-certifi-backend.onrender.com/api/institution/login", {
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
        if(data.status === "Success") {
          alert("Login successful!");
          setEmail("");
          setPassword("");
          navigate("/Institutiondashboard")
        }else{
          alert("Login failed. Please try again.");
        }
      })
    }

};

  return (
    <div className="flex justify-center items-center flex-col">
      <nav className=" w-full pt-12 pb-20 flex justify-between px-52 items-center">
        <img src={logo} alt="" />
        <p>
          Don't have an account? 
          <Link to={"/userchoice"} className="pl-4 text-blue-500 hover:underline hover:underline-blue-500 hover:underline-offset-[7px] hover:transition-all hover:duration-500">
          Sign Up
          </Link>
        </p>
      </nav>

      <div className="form-container w-[50vw] xs:p-10 sm:p-20 xl:px-40 xl:pt-20 xl:pb-32"> 
      <p className="text-center text-4xl pb-12">Log In</p>
      <form onSubmit={handleSubmit} className="flex justify-center items-center flex-col w-full gap-6">
        <div className="w-full">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="h-14 border-2 border-[#002BFF] w-full rounded-md px-2"
            />
        </div>
        <div className="w-full">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="h-14 border-2 border-[#002BFF] w-full rounded-md px-2"
            />
            <div className="py-4 flex justify-between">
              <div className="flex justify-center items-center gap-2">
              <input type="radio" className=""/>
              Remember Me
              </div>
              <Link to={"/Forgotpassword"}>
              <p>Forgot Password?</p>
              </Link>
            </div>
        </div>
        <div className="w-full  flex justify-center">
        <button type="submit"  className="w-full bg-[#8000FF] h-14 rounded-md shadow-xl text-white text-xl hover:bg-[#5808a8] hover:transition-all hover:duration-500">Sign In</button>
        </div>
      </form>
    </div>
    </div>
  );
}

export default InsLogin;
