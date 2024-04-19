// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract GuessBook {
    address public immutable ADDRESS_FICHA;
    struct Metadata {
        address user;
        string text;
        uint256 date;
    }
    Metadata[] messages;
    mapping (address => uint) private counterOfMessagesSent;

    constructor(address _ficha) {
        ADDRESS_FICHA = _ficha;
    }
    function registerMessage(
        string memory _text
    ) public {
        if (IERC20(ADDRESS_FICHA).balanceOf(msg.sender) < 1) {
            revert("You need to have at least 1 FICHA to send a message");
        }
        Metadata memory newMessage = Metadata(msg.sender, _text, block.timestamp);
        messages.push(newMessage);
        counterOfMessagesSent[msg.sender]++;
        IERC20(ADDRESS_FICHA).transferFrom(msg.sender, address(this), 1);
    }

    function getASpecificMessage(uint _index) public view returns (Metadata memory) {
        return messages[_index];
    }

    function getFullMessages() public view returns (Metadata[] memory) {
        return messages;
    }

    function getAmountOfMessages() public view returns (uint) {
        return messages.length;
    }

    function getCounterOfMessagesSent() public view returns (uint) {
        return counterOfMessagesSent[msg.sender];
    }
}
