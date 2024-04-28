import React, { useState, useEffect } from "react";
import Login from "./component/Login"; // Corrected import statement

import abi from "./contractJson/Booklist.json";
import { ethers } from "ethers"; //import ethers library
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./component/Layout";
import Public from "./component/Public";
import UserRegister from "./pages/UserRegister";
import InstitutionRegister from "./pages/InstitutionRegister";
import ForgotPassword from "./pages/Forgetpassword";
import UserChoice from "./pages/UserChoice";
import ChangeP from"./pages/Changep"
import OtpEnter from "./pages/OtpEnter"
import Certificatepart from "./pages/certificate/Certificatepart"
import Certificateform from "./pages/certificate/Certificateform"
import Certificatevalidation from "./pages/certificate/certificatevalidation"
import Dashboard from "./pages/User/Dashboard";
import Dashboard1 from "./pages/User/Dashboard1";
import Accountsetting from "./pages/User/Accountsetting";
import Institutiondashboard from "./pages/Institution/Institutiondashboard";
import Institutionaccountsetting from "./pages/Institution/Institutionaccountsetting";
import InsOtpVer from "./pages/InsOtpVer";
import InsLogin from "./component/InsLogin";


function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  const [account, setAccount] = useState("Not connected");

  useEffect(() => {
    const template = async () => {
      //checking if there is metamask installed or not
      if (!window.ethereum) {
        alert(
          "MetaMask is not installed. Please install MetaMask to use this dApp."
        );
        return;
      }

      //1. Fetching the contract details as indicated in step xvi
      const contractAddress = "0x394c6E6BF7CaE7D4Ace2fB1063B2279857CeFA40";
      const contractABI = abi.abi;

      //Metamask connection
      //1. for transaction on sepholia testnets
      //2. consit of alchemy api which autually help in connecting to the frontend
      const { ethereum } = window;

      //3.Define provider and signer that will help connect with the blockchain
      //will be used to read from the blockchain
      const provider = new ethers.providers.Web3Provider(ethereum);

      //Define signer that will help in transaction to change the blockchain state
      //wil be used to write to the blockchain
      const signer = provider.getSigner();

      //4. create the instance of the contract communicate with the smart contract
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      console.log(contract);

      setState({ provider, signer, contract });

      //invoke the metamask wallet
      const account = await ethereum.request({
        method: "eth_requestAccounts",
      });

      //reload the window on changing the account
      window.ethereum.on("Account changed", () => {
        window.location.reload();
      });
      setAccount(account);
    };
    template();
  }, []);

  return (
    <>
    <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Public />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/uregister" element={<UserRegister />} />
        <Route path="/iregister" element={<InstitutionRegister />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} /> 
        <Route path="/userchoice" element={<UserChoice />} /> 
        <Route path="/changep" element={<ChangeP />} />
        <Route path="/otpenter" element={<OtpEnter />} />
        <Route path="/insotpver" element={<InsOtpVer />} />
        <Route path="/inslogin" element={<InsLogin />} />
        <Route path="/csigner" element={<Certificatepart />} />
        <Route path="/cform" element={<Certificateform />} />
        <Route path="/cvalid" element={<Certificatevalidation />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard1" element={<Dashboard1 />} />
        <Route path="/accountsetting" element={<Accountsetting />} />
        <Route path="/institutiondashboard" element={<Institutiondashboard />} />
        <Route path="/institutionaccountsetting" element={<Institutionaccountsetting />} />

    </Routes>
    </>
  );
}

export default App;