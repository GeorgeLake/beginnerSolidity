pragma solidity ^0.6.6;

import './interfaces/ILiquidityValueCalculator.sol';
import '@uniswap/v2-periphery/contracts/libraries/UniswapV2Library.sol';
import '@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol';

contract LiquidityValueCalculator is ILiquidityValueCalculator {
    
    address public factory;
    /**
    * we pass the address of UniswapV2Factory because of unit tests
    * and we save on gas
    *
    */
    constructor(address factory_) public {
        factory = factory_;
    }

    /**
    * 1.Look up the pair address
    * 2.Get the reserves of the pair
    * 3.Get the total supply of the pair liquidity
    * 4.Sort the reserves in the order of tokenA, tokenB
    */
    function pairInfo(address tokenA, address tokenB) internal view returns (uint reserveA, uint reserveB, uint totalSupply) {
        IUniswapV2Pair pair = IUniswapV2Pair(UniswapV2Library.pairFor(factory, tokenA, tokenB));
        totalSupply = pair.totalSupply();
        (uint reserves0, uint reserves1,) = pair.getReserves();
        (reserveA, reserveB) = tokenA == pair.token0() ? (reserves0, reserves1) : (reserves1, reserves0);
    }
 
    function computeLiquidityShareValue(uint liquidity, address tokenA, address tokenB) external override returns (uint tokenAAmount, uint tokenBAmount) {
        (tokenAAmount, tokenBAmount) = computeLiquidityShareValue(liquidity, tokenA, tokenB);
    }
}