//SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.12;

import "hardhat/console.sol";

contract GDRM {
    

    // mapping(uint => string) public f1;  // GDID -> GD

    mapping(uint => address) public f2; // GDID -> OEA

    mapping(uint => string) public f3; // GDID -> IPFSHash

    mapping(address => mapping(uint => string)) public f4; // OEA -> F1(GDID -> GD)

    constructor() {
        string memory name = "Geo Dapp";
    }

    function cpRegistration() public payable {
        
    }

    function cpQuerry(string memory _greeting) public returns (string memory) {
    
    }
}
