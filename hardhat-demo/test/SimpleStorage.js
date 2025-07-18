const {expect} = require("chai");
const { ethers } = require("hardhat");
describe("Simple Storage Describe", function() {
it("Deployment set number and get number", async function() {
    const[owner] = await ethers.getSigners();
    const hardhatToken = await ethers.deployContract("SimpleStorage");

    await hardhatToken.set(112233);
    const number = await hardhatToken.get();
    expect(number).to.equal(112233);
});
});