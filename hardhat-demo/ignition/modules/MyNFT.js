const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const NFTModule = buildModule("NFTModule", (m) => {
  const NFT = m.contract("MyNFT");

  return { NFT };
});

module.exports = NFTModule;