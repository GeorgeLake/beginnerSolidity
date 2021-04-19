import './App.css';

import { render } from "react-dom";

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

// render(mint);

function App() {
  render(mint);
}

// function App() {
//   return (
//     <div className="App">
//       mint()
//     </div>
//   );
// }

// export default App;
