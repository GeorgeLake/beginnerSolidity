// This is the SDK quick start to learn about SDK
// https://uniswap.org/docs/v2/javascript-SDK/quick-start/

//const UNISWAP = require('@uniswap/sdk')
//console.log(`The chainId of Goerli is ${UNISWAP.ChainId.GÖRLI}.`)
import { ChainId, Token, Fetcher, WETH, Route, Trade, TokenAmount, TradeType, Percent, FACTORY_ADDRESS, INIT_CODE_HASH } from '@uniswap/sdk'

console.log(`The chainId of mainnet is ${ChainId.MAINNET}.`)
console.log(`The chainId of Ropsten is ${ChainId.ROPSTEN}.`)
console.log(`The chainId of Kovan is ${ChainId.KOVAN}.`)
console.log(`The chainId of Rinkeby is ${ChainId.RINKEBY}.`)
console.log(`The chainId of Goerli is ${ChainId.GÖRLI}.`)

// Token: needs these 3 pieces of information---------------------------------------
const chainId = ChainId.MAINNET
const tokenAddress = '0x6B175474E89094C44Da98b954EedeAC495271d0F' // must be checksummed, use coingecko
const decimals = 18

//const DAI = new Token(chainId, tokenAddress, decimals)

/* Fetched by SDK*
 * don't know/want to provide a value just ask the sdk
 * Fetcher.fetchTokenData
 */
//const DAI: Token = await Fetcher.fetchTokenData(chainId, tokenAddress)

// const DAI = new Token(
//     ChainId.MAINNET,
//     '0x6B175474E89094C44Da98b954EedeAC495271d0F',
//     18,
//     'DAI', // symbol (optional)
//     'Dai Stablecoin' // name (optional)
// )

// note that you may want/need to handle this async code differently,
// for example if top-level await is not an option
const DAI = await Fetcher.fetchTokenData(
    ChainId.MAINNET,
    '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    undefined,
    'DAI',
    'Dai Stablecoin'
)

// Pairs: needs pair (2) of tokens -------------------------------------------------
// User provided:
// import { ChainId, Token, WETH, Pair, TokenAmount } from '@uniswap/sdk'

// const DAI = new Token(ChainId.MAINNET, '0x6B175474E89094C44Da98b954EedeAC495271d0F', 18)

// async function getPair(): Promise<Pair> {
//   const pairAddress = Pair.getAddress(DAI, WETH[DAI.chainId])

//   const reserves = [/* use pairAddress to fetch reserves here */]
//   const [reserve0, reserve1] = reserves

//   const tokens = [DAI, WETH[DAI.chainId]]
//   const [token0, token1] = tokens[0].sortsBefore(tokens[1]) ? tokens : [tokens[1], tokens[0]]

//   const pair = new Pair(new TokenAmount(token0, reserve0), new TokenAmount(token1, reserve1))
//   return pair
// }

// Fetched by SDK:

// note that you may want/need to handle this async code differently,
// for example if top-level await is not an option
const pair = await Fetcher.fetchPairData(DAI, WETH[DAI.chainId])

// Pricing ----------------------------------------------------------
// Mid Price: current market-clearing or fair value price of the assets
const route = new Route([pair], WETH[DAI.chainId])
// we passed WETH as the input token, meaning we’re interested in a WETH -> DAI trade
console.log(route.midPrice.toSignificant(6)) // 201.306
console.log(route.midPrice.invert().toSignificant(6)) // 0.00496756

// Indirect: No direct path between tokens, use a bridge token (e.g. USDC)
const USDC = new Token(ChainId.MAINNET, '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 6)
const USDCWETHPair = await Fetcher.fetchPairData(USDC, WETH[ChainId.MAINNET])
const DAIUSDCPair = await Fetcher.fetchPairData(DAI, USDC)

const route1 = new Route([USDCWETHPair, DAIUSDCPair], WETH[ChainId.MAINNET])

console.log(route1.midPrice.toSignificant(6)) // 202.081
console.log(route1.midPrice.invert().toSignificant(6)) // 0.00494851

// Execution Price: the ratio of assets sent/received
const trade = new Trade(route, new TokenAmount(WETH[DAI.chainId], '1000000000000000000'), TradeType.EXACT_INPUT)

console.log(trade.executionPrice.toSignificant(6))
console.log(trade.nextMidPrice.toSignificant(6))

//SDK cannot execute trades or send transactions on your behalf. 
//Rather, it offers utility classes and functions 
//to calculate required data

// Trading -----------------------------------------------------------------
// Send transaction to the Router
const amountIn = '1000000000000000000' // 1 WETH

const trade1 = new Trade(route, new TokenAmount(WETH[DAI.chainId], amountIn), TradeType.EXACT_INPUT)

const slippageTolerance = new Percent('50', '10000') // 50 bips, or 0.50%, how large of a price movement we’re willing to tolerate before we fail to execute

// constructors for solidity interface to swap WETH for coin
const amountOutMin = trade1.minimumAmountOut(slippageTolerance).raw // needs to be converted to e.g. hex
const path = [WETH[DAI.chainId].address, DAI.address] // The path is simply the ordered list of token addresses we’re trading through
const to = '' // should be a checksummed recipient address
const deadline = Math.floor(Date.now() / 1000) + 60 * 20 // 20 minutes from the current Unix time
const value = trade1.inputAmount.raw // // needs to be converted to e.g. hex
/** Here is that Solidity interface for function
 * function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline)
  external
  payable
  returns (uint[] memory amounts);
 */

// Pair Addresses --------------------------------------------------------

import { pack, keccak256 } from '@ethersproject/solidity'
import { getCreate2Address } from '@ethersproject/address'

const token0 = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2' // WETH
const token1 = '0x0ae055097c6d159879521c384f1d2123d1f195e6' // xDAI
// compute pair addresses without any on-chain lookups
const pair1 = getCreate2Address(
  FACTORY_ADDRESS,
  keccak256(['bytes'], [pack(['address', 'address'], [token0, token1])]),
  INIT_CODE_HASH
)
