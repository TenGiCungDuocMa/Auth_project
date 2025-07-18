const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const SimpleStorageModule = buildModule("SimpleStorageModule", (m) => {
  const SimpleStorage = m.contract("SimpleStorage");

  return { SimpleStorage };
});

module.exports = SimpleStorageModule;