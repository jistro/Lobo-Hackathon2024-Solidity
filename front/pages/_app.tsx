import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import {
  foundry,
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
  sepolia,
} from 'wagmi/chains';
import { connectorsForWallets, getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { injectedWallet } from "@rainbow-me/rainbowkit/wallets";

const connectors = connectorsForWallets(
  [
    {
      groupName: "Test",
      wallets: [injectedWallet],
    },
  ],
  {
    appName: "My RainbowKit App",
    projectId: "YOUR_PROJECT_ID",
  }
);

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

const client = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>
        <RainbowKitProvider>
          <Component {...pageProps} />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default MyApp;
