// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract IPFSStorage {
    address owner;

    // Mapping to store IPFS hashes
    mapping(address => mapping(uint => string)) public certificates;

    constructor(){
        owner = msg.sender;
    }
    event CertificateStored(address indexed owner, uint indexed identifier, string concatenatedString);

    event getCertificate(string concatenatedString);


    // Function to store an IPFS hash
    function storeCertificate(uint identifier, string memory _hash) external returns (string memory) {
        certificates[msg.sender][identifier] = _hash;

        // Convert uint to string
        string memory identifierStr = toString(identifier);

        // Convert address to string
        string memory senderAddressStr = addressToString(msg.sender);

        // Concatenate the strings
        string memory concatenatedString = string(abi.encodePacked(senderAddressStr, identifierStr, _hash));
        emit CertificateStored(msg.sender, identifier, concatenatedString);

        return concatenatedString;
    }

    // Function to convert address to string
    function addressToString(address _addr) internal pure returns(string memory) {
        bytes32 value = bytes32(uint256(uint160(_addr)));
        bytes memory alphabet = "0123456789abcdef";

        bytes memory str = new bytes(42);
        str[0] = '0';
        str[1] = 'x';
        for (uint i = 0; i < 20; i++) {
            str[2 + i * 2] = alphabet[uint(uint8(value[i + 12] >> 4))];
            str[3 + i * 2] = alphabet[uint(uint8(value[i + 12] & 0x0f))];
        }
        return string(str);
    }

    // Function to convert uint to string
    function toString(uint value) internal pure returns (string memory) {
        if (value == 0) {
            return "0";
        }
        uint temp = value;
        uint length;
        while (temp != 0) {
            length++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(length);
        while (value != 0) {
            length -= 1;
            buffer[length] = bytes1(uint8(48 + value % 10));
            value /= 10;
        }
        return string(buffer);
    }

    // Function to retrieve an IPFS hash
    function getIPFSHash(address certiOwner, uint _identifier, string memory _hash) public returns (string memory _certi) {
                
        if ( keccak256(bytes(certificates[certiOwner][_identifier])) == keccak256(bytes(_hash))){
            string memory url = "https://api.pinata.cloud/pinning/pinFileToIPFS/" ;
            bytes memory bytesA = bytes(url);
            bytes memory bytesB = bytes(_hash);
            bytes memory concatenatedString = new bytes(bytesA.length + bytesB.length);
            // bytes memory bytesConcatenated = bytes(concatenatedString);
            uint k = 0;
            for (uint i = 0; i < bytesA.length; i++) {
                concatenatedString[k++] = bytesA[i];
            }
            for (uint i = 0; i < bytesB.length; i++) {
                concatenatedString[k++] = bytesB[i];
            }
            string memory finalConcatenatedString = string(concatenatedString);

            emit getCertificate(finalConcatenatedString);

            return finalConcatenatedString;
        }else{
            revert("Certificate not found");
        }
    }
}