// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";

import {GuessBook} from "../src/GuessBook.sol";
import {Ficha} from "../src/Ficha.sol";

contract DeployFicha is Script {
    function setUp() public {}

    function run() public {
        vm.broadcast();
        console.log("Deploying Ficha...");
        Ficha ficha = new Ficha(msg.sender);
        console.log("Deployed Ficha at address: ", address(ficha));
    }
}
