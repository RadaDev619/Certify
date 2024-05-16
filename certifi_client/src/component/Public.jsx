import { useState, useEffect } from "react";
import { ethers } from "ethers"; //import ethers library
import abi from "../contractJson/Certify.json";

const Public = () => {
  const [ID, setID] = useState("");
  const [Url, setUrl] = useState("");

  const searchCertificate = async (event) => {
    event.preventDefault();

    const { ethereum } = window;

    if (!ethereum && !ethereum.selectedAddress) {
      alert("Install Metamask and connect account");
      return;
    }

    const contractAddress = "0x17d30d722bD5BB3F5d7362aFA4F648fa446e34A2";
    const contractABI = abi.abi;

    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    try {
      // Extract address (42 characters)
      const address = ID.substring(0, 42);

      // Extract identifier (24 characters)
      const identifier = ID.substring(42, 66);

      // Extract hash (remaining characters)
      const hash = ID.substring(66);

      // Send the transaction with the estimated gas limit
      const transaction = await contract.getIPFSHash(address, identifier, hash);

      console.log("Waiting for transaction...");
      alert("reach1");
      const receipt = await transaction.wait(); // Wait for the transaction to be mined
      alert("Transaction is Successful!");

      const event = receipt.events;
      console.log("Event object:", event);

      // Access the concatenatedString from the args array
      const concatenatedString = event[0].args[0];
      console.log("Concatenated String:", concatenatedString);
      alert("Concatenated String: " + concatenatedString);

      // Set the URL state to the concatenated string
      setUrl(concatenatedString);

      // window.location.reload();
    } catch (error) {
      console.error("Error adding hash:", error);
      alert("Certificate invalid!");
    }
  };

  return (
    <div className="pt-36 px-16">
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search..."
          className="w-full py-2 px-4 rounded-lg shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={ID}
          onChange={(e) => setID(e.target.value)}
        />
        <button
          className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={searchCertificate}
        >
          Search
        </button>
      </div>
      <div style={{ marginTop: "50px" }}>
        {/* Render the URL */}
        <h4>{Url}</h4>
      </div>
    </div>
  );
};

export default Public;
