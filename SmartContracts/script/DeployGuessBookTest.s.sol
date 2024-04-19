// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";

import {GuessBook} from "../src/GuessBook.sol";

contract DeployGuessBookTest is Script {
    function setUp() public {}

    function run() public {
        vm.broadcast(0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266);
        console.log("Deploying GuessBook...");
        GuessBook guessBook = new GuessBook(0x5FbDB2315678afecb367f032d93F642f64180aa3);
        console.log("Deployed GuessBook at address: ", address(guessBook));
    }
}
