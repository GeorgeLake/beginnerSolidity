const json = require('@uniswap/v2-core/build/UniswapV2Factory.json')
const contract = require('@truffle/contract');
const UniswapV2Factory = contract(json);
// const UniswapV2FactoryBytecode = require('@uniswap/v2-core/build/UniswapV2Factory.json').bytecode

UniswapV2Factory.setProvider(this.web3._provider);

module.exports = function(_deployer, network, accounts) {
    _deployer.deploy(UniswapV2Factory, accounts[0], {from: accounts[0]});
    // _deployer.deploy(UniswapV2FactoryBytecode, accounts[0], {from: accounts[0]});
};
