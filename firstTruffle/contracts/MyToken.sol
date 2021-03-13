pragma solidity ^0.6.2;
// import the erc20 implementation  that has token standard
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
//inherit the erc20 contract
contract MyToken is ERC20 {
    // cal the erc20 constructorpassing our custom name parameters
    constructor() public ERC20("MyToken", "MTKN"){
        // 1Million minted tokens for account deploying smart contract
        // we have 18 zeros because decimals are set to 18
        _mint(msg.sender, 1000000000000000000000000);
    }
}
