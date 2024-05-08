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

    // Function to parse concatenated string
    function parseConcatenatedString(string memory concatenatedString) internal pure returns (address, uint, string memory) {
        // Define lengths of address, identifier, and hash
        uint addrLength = 42; // length of address string (including '0x' prefix)
        uint idLength = 9; // assuming identifier is a single digit
        uint hashLength = bytes(concatenatedString).length - addrLength - idLength;

        // Extract address, identifier, and hash parts
        string memory senderAddressStr = _substring(concatenatedString, 0, addrLength);
        address senderAddress = parseAddr(senderAddressStr);
        
        string memory identifierStr = _substring(concatenatedString, addrLength, addrLength + idLength);
        uint identifier = parseInt(identifierStr);
        
        string memory _hash = _substring(concatenatedString, addrLength + idLength, addrLength + idLength + hashLength);

        return (senderAddress, identifier, _hash);
    }

    // Function to parse address from string
    function parseAddr(string memory _addr) internal pure returns (address addr) {
        bytes memory tmp = bytes(_addr);
        uint160 iaddr = 0;
        uint160 b1;
        uint160 b2;
        for (uint i = 2; i < 2 + 2 * 20; i += 2) {
            iaddr *= 256;
            b1 = uint160(uint8(tmp[i]));
            b2 = uint160(uint8(tmp[i + 1]));
            if ((b1 >= 97) && (b1 <= 102)) {
                b1 -= 87;
            } else if ((b1 >= 65) && (b1 <= 70)) {
                b1 -= 55;
            } else if ((b1 >= 48) && (b1 <= 57)) {
                b1 -= 48;
            }
            if ((b2 >= 97) && (b2 <= 102)) {
                b2 -= 87;
            } else if ((b2 >= 65) && (b2 <= 70)) {
                b2 -= 55;
            } else if ((b2 >= 48) && (b2 <= 57)) {
                b2 -= 48;
            }
            iaddr += (b1 * 16 + b2);
        }
        return address(iaddr);
    }

    // Function to parse uint from string
    function parseInt(string memory _str) internal pure returns (uint) {
        uint _int = 0;
        for (uint i = 0; i < bytes(_str).length; i++) {
            if ((uint8(bytes(_str)[i]) >= 48) && (uint8(bytes(_str)[i]) <= 57)) {
                _int = _int * 10 + (uint8(bytes(_str)[i]) - 48);
            }
        }
        return _int;
    }

    // Helper function to get a substring
    function _substring(string memory str, uint start, uint end) internal pure returns (string memory) {
        bytes memory strBytes = bytes(str);
        bytes memory result = new bytes(end - start);
        for (uint i = start; i < end; i++) {
            result[i - start] = strBytes[i];
        }
        return string(result);
    }


    // Function to retrieve an IPFS hash
    function getIPFSHash(string memory identifier) public returns (string memory _certi) {
                
        // Call the parseConcatenatedString function
        (address certiOwner, uint _identifier, string memory _hash) = parseConcatenatedString(identifier);
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