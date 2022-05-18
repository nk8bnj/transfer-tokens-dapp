//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "hardhat/console.sol";

// Create an Upgradeable Smart Contract, that will send tokens to one or more recipients.
contract UpgradeableToken is ERC20Upgradeable {
    function initialize() public initializer {
        __ERC20_init("UpgradeableToken", "UPTKN");
        _mint(msg.sender, 10000 * 10**decimals());
    }

    // The function "transferTokens" takes an array with addresses and an array with tokens,
    // and transfers to all addresses specified in the input array.
    function transferTokens(address[] memory addresses, uint256[] memory tokens)
        public 
    {
        require(addresses.length == tokens.length, "Arrays are not equal!");
        require(addresses.length > 0, "Array are empty!");

        for (uint256 i = 0; i < addresses.length; i++) {
            transfer(addresses[i], tokens[i]);
        }
    }
}
