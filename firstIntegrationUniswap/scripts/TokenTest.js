// usage: truffle exec scripts/TokenTest.js 
const AToken = artifacts.require('AToken')
const BToken = artifacts.require('BToken')

module.exports = async function (callback) {
    aToken = await AToken.deployed()
    bToken = await BToken.deployed()
    console.log(bToken)
    callback()
}
