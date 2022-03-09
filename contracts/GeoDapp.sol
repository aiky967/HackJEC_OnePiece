// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.12;

import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";
import {Seriality} from "./Seriality.sol";

contract GeoDapp is Seriality {

    using Counters for Counters.Counter;
    Counters.Counter public _GeoDataIndex;

    
    // mapping(uint => string) public f1;  // GDID -> GD

    mapping(uint => address) public f2; // GDID -> OEA

    mapping(uint => string) public f3; // GDID -> IPFSHashGD

    mapping(address => mapping(uint => string)) public f4; // OEA -> F1(GDID -> GD)

    struct cpInformation {
        uint256  Id;  // Unique identifier for spatial data  (GDID)
        string  Name;  // Name of spatial data
        uint256  Year; // Year of spatial data
        string  Category; // Category of spatial data
        string  ImageHash; // Hash of spatial data screenshot in IPFS
        string  DescHash; // Hash of spatial data screenshot in IPFS  
        string GeoDataHash; // Hash of spatial data in IPFS (IPFSHashGD)
        uint256  price; // Price of spatial data for use application
        uint256  RegisterTime; // Copyright registration time of spatial data
        address  Owner; // Owner Ethereum address of spatial data (OEA)
    }

    constructor() {
        string memory name = "Geo Dapp";
    }

    function cpRegistration() public payable {
        
    }

    function cpQuerry(uint256 _GDID) public returns (string memory _cpInformation) {
        
    }

    function cpApplication(uint256 _GDID) public payable returns (address OEA, uint256 _price) {
        
    }

}
