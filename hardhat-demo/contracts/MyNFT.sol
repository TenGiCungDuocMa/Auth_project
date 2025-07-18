// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyNFT is ERC721, Ownable {
    uint256 private _tokenIds;
    string private _baseTokenURI;

    constructor() ERC721("My Hardhat Token", "MHT") Ownable(msg.sender) {}

    function mint(address to) external onlyOwner returns (uint256) {
        _tokenIds++;
        _mint(to, _tokenIds);
        return _tokenIds;
    }

    function batchMint(address to, uint256 amount) external onlyOwner {
        require(amount > 0, "amount > 0");
        for (uint256 i = 0; i < amount; i++) {
            _tokenIds++;
            _mint(to, _tokenIds);
        }
    }

    function totalSupply() public view returns (uint256) {
        return _tokenIds;
    }

    function getBaseURI() external view returns (string memory) {
        return _baseTokenURI;
    }

    function getTokenName() external view returns (string memory) {
        return name();
    }

    function getTokenSymbol() external view returns (string memory) {
        return symbol();
    }

    function setBaseURI(string memory newBaseURI) external onlyOwner {
        _baseTokenURI = newBaseURI;
    }

    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }
}
