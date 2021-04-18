import './App.css';

import { Bitcoin, Ethereum } from "@renproject/chains";
import RenJS from "@renproject/ren";
import { ethers } from "ethers";

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


/**
 * 
 * @returns 
 function App() {
   return (
     <div className="App">
     </div>
     );
    }
    
    export default App;
    */