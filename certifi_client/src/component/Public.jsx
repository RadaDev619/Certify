import React, { useState, useRef } from "react";
import earth from "../../public/earth.png"
import cub from "../../public/cub.png"
import comp from "../../public/comp.png"

const Public = ({ state }) => {
  const [ID, setID] = useState("");
  const [Url, setUrl] = useState(""); // State for the fetched URL
  const [searchResult, setSearchResult] = useState(""); // State for search results
  const searchButtonRef = useRef(null); 
  const inputRef = useRef(null); 


  const searchCertificate = async () => {
    const { contract, provider } = state;

    try {
      // Send the transaction with the estimated gas limit
      const transaction = await contract.getIPFSHash(ID);

      console.log("Waiting for transaction...");
      const receipt = await transaction.wait(); // Wait for the transaction to be mined
      console.log("Transaction is Successful!");
      const concatenatedString = receipt.logs[0].data;
      console.log("Concatenated String: " + concatenatedString);

      setUrl(concatenatedString);
      setSearchResult(`Certificate found! URL: ${concatenatedString}`); // Update searchResult state
      //setSearchResult(`Certificate found! URL: <a href="${concatenatedString}" target="_blank" rel="noopener noreferrer">${concatenatedString}</a>`);
    } catch (error) {
      console.error("Error adding hash:", error);
      alert("Certificate invalid!");
      setSearchResult("Certificate invalid!"); // Update searchResult state
    }
  };

  const handleInputChange = (event) => {
    setID(event.target.value);
  };

  const handleKeyDown = (event) => {
    // Only trigger on Enter key press inside the input field
    if (event.key === "Enter" && inputRef.current === document.activeElement) { 
      searchButtonRef.current.click(); 
    }
  };

  return (
    <div className="pt-40 px-16">
      <div className="relative validate pb-40">
        <h1 className="text-center font-bold py-10 ">Validate</h1>
        <h3 className="text-center text-3xl pb-10">Protect your documents! <br /> Check their integrity and authenticity</h3>
        <p className="text-center text-xl pb-10">Enter the document ID number or check its authenticity by adding the file</p>
        <input
          type="text"
          ref={inputRef} 
          className="w-full py-5 px-5 rounded-lg shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[black]"
          value={ID}
          onChange={handleInputChange} 
          onKeyDown={handleKeyDown} 
          placeholder="Search by document id/address or file hash"
        />
        <button 
          ref={searchButtonRef} 
          className="absolute right-4 top-1/2 -translate-y-[-15px] bg-[#F6F6F6] hover:bg-[#000000] hover:text-[#ffffff] py-3 px-4 rounded-lg text-[black] shadow-md "
          onClick={searchCertificate}
        >
          Search
        </button>

        {/* Area to display the search results */}
        <div className="mt-5"> {/* Add some spacing */}
          <p className="text-center">{searchResult}</p> 
        </div>
      </div>

      <div className="Aboutus ">
        <h1 className="text-center font-bold py-10">About Us </h1>
        <p className="text-center leading-relaxed tracking-wide text-5xl"> A <strong>BLOCKCHAIN-BASED</strong>  STORAGE SYSTEM WHICH <br /> ENHANCES <strong>TRUST</strong> -AND- <strong>TRANSPARENCY</strong><br /> HELPING US TO <strong>ERADICATE</strong>-FORGED <br /> FAKE CERTIFICATE-&-DOCUMENTS </p>
      </div>

      <div className="aim flex justify-between mt-20 space-x-8"> {/* Added space-x-8 */}
        <div className="flex flex-col items-center">
          <div className="w-96 h-128 flex items-center justify-center"> 
            <img src={cub} alt="Storage" className="w-[500px] h-[600px]" /> 
          </div>
          <h3 className="text-center font-bold text-xl mt-4">Storage</h3>
          <p className="text-center text-sm mt-2">Secure storage for certificates, diplomas, licenses,<br /> 
          and more. Our advanced encryption safeguards <br />
          your sensitive data from unauthorized access.</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-96 h-128 flex items-center justify-center">
            <img src={comp} alt="Organizing" className="w-[500px] h-[600px]" /> 
          </div>
          <h3 className="text-center font-bold text-xl mt-4">Organizing</h3>
          <p className="text-center text-sm mt-2">Efficient document organization for easy retrieval,<br />
          with user-friendly interface lets you categorize,<br /> 
          tag, and label files, ensuring quick access when <br />
          needed.</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-96 h-128 flex items-center justify-center">
            <img src={earth} alt="Verification" className="w-[500px] h-[600px]" /> 
          </div>
          <h3 className="text-center font-bold text-xl mt-4">Verification</h3>
          <p className="text-center text-sm mt-2">Provides document verification to authenticate <br />
          & maintain the integrity of certificates <br />
          and documents, ensuring legitimacy.</p>
        </div>
      </div>

      <div className="members "> 

      </div>
    </div>
  );
};

export default Public;