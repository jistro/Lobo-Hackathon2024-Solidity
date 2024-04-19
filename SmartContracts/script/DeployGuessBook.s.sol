// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";

import {GuessBook} from "../src/GuessBook.sol";

contract DeployGuessBook is Script {
    address tokenAddress;
    
    function setUp() public {}

    function run() public {
        vm.broadcast();
        console.log("Deploying GuessBook...");
        GuessBook guessBook = new GuessBook(tokenAddress);
        console.log("Deployed GuessBook at address: ", address(guessBook));
    }
}
