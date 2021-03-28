pragma solidity ^0.6.6;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BToken is ERC20 {
    constructor() public ERC20("BToken", "BBB") {
        _mint(msg.sender, 10000 * (10 * uint256(decimals())));
    }
}
