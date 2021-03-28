var AToken = artifacts.require("AToken");
var BToken = artifacts.require("BToken");

module.exports = function(deployer) {
  deployer.deploy(AToken);
  deployer.deploy(BToken);
};

//https://www.trufflesuite.com/tutorials/robust-smart-contracts-with-openzeppelin