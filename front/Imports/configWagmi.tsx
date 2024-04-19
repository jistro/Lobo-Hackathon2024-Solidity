import { connectorsForWallets, getDefaultConfig } from "@rainbow-me/rainbowkit";
import { injectedWallet } from "@rainbow-me/rainbowkit/wallets";
import { createConfig } from "wagmi";
import { foundry, mainnet, avalanche } from "wagmi/chains";

const config = getDefaultConfig({
  appName: 'RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  wallets:[
    {
      groupName: "Test",
      wallets: [injectedWallet],
    },
  ],
  chains: [
    foundry,
    mainnet,
    // avalanche,
  ],
  ssr: true,
});
export default config;