const LiquidityValueCalculator = artifacts.require("LiquidityValueCalculator");

module.exports = function(deployer) {
  // pass the factory address of uniswapv v2 as its needed by constructor for calc
  deployer.deploy(LiquidityValueCalculator, "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f");
};
