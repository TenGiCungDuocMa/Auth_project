require("@nomicfoundation/hardhat-toolbox");

const { vars } = require("hardhat/config");

const INFURA_API_KEY = vars.get("INFURA_API_KEY","71d6584bf8054c05acff9ed99d9ca4cd");
// console.log(vars)
const SEPOLIA_PRIVATE_KEY = vars.get("SEPOLIA_PRIVATE_KEY","5dce08bd98fc66216ae180225de318148e55f37b1395e39b45ee9b026e86bef6");

module.exports = {
  solidity: "0.8.28",
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [SEPOLIA_PRIVATE_KEY],
    },
  },
};