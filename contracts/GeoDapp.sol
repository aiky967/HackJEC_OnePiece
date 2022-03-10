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

    // mapping(address => mapping(uint => string)) public f4; // OEA -> F1(GDID -> GD)

    mapping(address => cpInformation) public f4;

    struct cpInformation {
        uint256  GDID;  // Unique identifier for spatial data  (GDID)
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

    function cpRegistration(address _Owner) public payable {
        // Serialize F (input) to getF'
        // URL decoding for F' to get p
        // Record OEA
        _Owner = msg.sender;
        //Initialize GDID = 0
        uint256 public GeoDataIndex = 0;
        // if IPFSHashGD in f3 then
        //      Fail to register, already registered
        // else 
        //     increase GeoDataIndex
        //     GDID = GeoDataIndex
        //     RegistrationTime = timestamp
        //     Store OEA to spatial data attribution mapping(f2) using GDID
        //     Store IPFSHashGD to f3 using GDID
        //     Store each parameter in p and GDID and RegisterTime to spatial data 
        //     copyright owner mapping (f4)

    }

    function cpQuerry(uint256 _GDID) public returns (string memory _cpInformation) {
        if (_GDID != GeoDataIndex) {
            // Incorrect GDID
        } else {
            // read f4 mapping and return cpInformation
            // read f2 mapping and return OEA
        }
    }

    function cpApplication(uint256 _GDID) public payable returns (address OEA, uint256 _price) {
        // read f2 mapping and return the OEA
        // read f4 mapping and return price
        // If current node (data user) initiates a transaction with the OEA
        // if Successful transfer then
        //      Allow node to download data
        //      if Node requests to download data then
        //      read f4 mapping and return IPFSHashGD and download using hash value
        // else
        //      Application failed
    }

}
