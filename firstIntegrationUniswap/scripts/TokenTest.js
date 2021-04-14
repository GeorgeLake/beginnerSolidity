// usage: truffle exec scripts/TokenTest.js 
const AToken = artifacts.require('AToken')
const BToken = artifacts.require('BToken')

module.exports = async function (callback) {
    // create instances of ERC20 tokens
    aToken = await AToken.deployed()
    bToken = await BToken.deployed()
    // print out some info
    console.log(bToken.totalSupply())
    callback()
}
