require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.2",
  networks: {
    mumbai: {
      url: process.env.MUMBAI_URL, //https://rpc-mumbai.maticvigil.com/
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
