import { Bitcoin, Ethereum } from "@renproject/chains";
import RenJS from "@renproject/ren";
import ethers from "ethers";

let ethereum = window.ethereum;
let web3 = window.web3;
if (typeof ethereum !== 'undefined') {
 await ethereum.enable();
 web3 = new Web3(ethereum);
} else if (typeof web3 !== 'undefined') {
 web3 = new Web3(web3.currentProvider);
} else {
 web3 = new Web3(new Web3.providers.HttpProvider(process.env.WEB3_PROVIDER));
}
/**
 * 
 

// Mint tokenized Bitcoin
const mint = async () => {
    await window.ethereum.enable();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    provider.getSigner();
    const signer = provider.getSigner();
    const address = await signer.getAddress();

    const lockAndMint = await new RenJS("testnet").lockAndMint({
        asset: "BTC",
        from: Bitcoin(),
        to: Ethereum(provider.provider).Address(address),
    });

    console.log(`Deposit BTC to ${lockAndMint.gatewayAddress}`);

    lockAndMint.on("deposit", RenJS.defaultDepositHandler);
};

mint().catch(console.error);

// Burn and release tokenized Bitcoin
const burn = async () => {
    await window.ethereum.enable();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const value = 2000000; // sats

    const burnAndRelease = await new RenJS("testnet").burnAndRelease({
        asset: "BTC",
        to: Bitcoin().Address("miMi2VET41YV1j6SDNTeZoPBbmH8B4nEx6"),
        from: Ethereum(provider.provider).Account({ value }),
    });

    await burnAndRelease.burn();
    await burnAndRelease.release();
};

burn().catch(console.error);

*/