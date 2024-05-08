import React, { useState } from "react";

const Public = ({ state }) => {
  const [ID, setID] = useState("");
  const [Url, setUrl] = useState("");

  const searchCertificate = async (event) => {
    event.preventDefault();

    const { contract, provider } = state;

    try {
      alert("reach");
      // Send the transaction with the estimated gas limit
      const transaction = await contract.getIPFSHash(ID);

      console.log("Waiting for transaction...");
      alert("reach1");
      const receipt = await transaction.wait(); // Wait for the transaction to be mined
      alert("Transaction is Successful!");
      const concatenatedString = receipt.logs[0].data;
      alert("Concatenated String: " + concatenatedString);

      // await transaction.wait();
      alert("Transaction is Successful!");
      console.log("transaction", transaction);

      setUrl(transaction);

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
        <h4>{Url}</h4>
      </div>
    </div>
  );
};

export default Public;
