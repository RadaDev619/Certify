require("@nomiclabs/hardhat-waffle");
require('dotenv').config()
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();
  for (const account of accounts) {
    console.log(account.address);
  }
});
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  settings: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  },
  networks: {
    sepolia: {
      url: process.env.sepolia_url, // Replace with the actual Sepolia URL
      accounts: process.env.private_key, // Replace with your private key
    },
  }
};