//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "hardhat/console.sol";
contract Token {
    string public name = "My WinTranIT Token";
    string public symbol = "MWT";

    // An address type variable is used to store ethereum accounts.
    address public owner;

    // The fixed amount of tokens, stored in an unsigned integer type variable.
    uint256 public totalSupply = 1000000;

    //  A key/value map, here it store each account's balance.
    mapping(address => uint256) balances;

    event Transfer(
        address indexed from,
        address indexed to,
        uint256 indexed tokenId
    );
    event Approval(
        address indexed owner,
        address indexed approved,
        uint256 indexed tokenId
    );
    event ApprovalForAll(
        address indexed owner,
        address indexed operator,
        bool approved
    );

    constructor() {
        // The totalSupply is assigned to the transaction sender, which is the
        // account that is deploying the contract.
        balances[msg.sender] = totalSupply;
        owner = msg.sender;
    }

    function transfer(address to, uint256 amount) external {
        require(balances[msg.sender] >= amount, "Not enough tokens!");
        console.log(
        "Transferring from %s to %s %s tokens",
        msg.sender,
        to,
        amount
        );
        balances[msg.sender] -= amount;
        balances[to] += amount;

        // Notify off-chain applications of the transfer.
        emit Transfer(msg.sender, to, amount);
    }

    // Returns the number of tokens of an address
    function balanceOf(address acc) external view returns (uint256) {
        return balances[acc];
    }

    // // Returns the owner of a tokenId
    // function ownerOf(uint256 tokenId) external view returns (address) {
    //     return owner;
    // }

    // // Securely transfer tokens from one address to another
    // function safeTransferFrom(
    //     address from,
    //     address to,
    //     uint256 tokenId
    // ) external {}

    // // Transfer tokens (unsafe, rarely used)
    // function transferFrom(address from, address to, uint256 tokenId) external {}

    // // Grant permission to a token management address
    // function approve(address to, uint256 tokenId) external{}

    // // Get the address authorized for the token
    // function getApproved(uint256 tokenId) external view returns (address operator){}
    
    // // Grants an address the right to manage all of the owner's tokens
    // function setApprovalForAll(address operator, bool _approved) external{}
    
    // // Check if an address has control over all of the owner's tokens
    // function isApprovedForAll(address owner, address operator) external view returns (bool) {

    // }
}
