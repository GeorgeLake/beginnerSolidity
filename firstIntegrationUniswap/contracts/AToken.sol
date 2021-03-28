pragma solidity ^0.6.6;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract AToken is ERC20 {
    constructor() public ERC20("AToken", "AAA") {
        _mint(msg.sender, 10000 * (10 * uint256(decimals())));
    }
}
