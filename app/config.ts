import { domains } from "@nucypher/taco";

export const chainIdForDomain = {
  [domains.DEVNET]: 80002,
  [domains.TESTNET]: 80002,
  [domains.MAINNET]: 137,
};

export const chainNameForDomain = {
  [domains.DEVNET]: "lynx",
  [domains.TESTNET]: "tapir",
};

export const RPC_URL = "https://polygon-amoy.drpc.org";
export const RITUAL_ID = 0;

export const IRYS_NODE_URL = "https://node2.irys.xyz";

export const customTacoNetworks = {
  TESTNET: {
    chainId: `0x${chainIdForDomain[domains.TESTNET].toString(16)}`,
    chainName: chainNameForDomain[domains.TESTNET],
    rpcUrls: [RPC_URL],
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    blockExplorerUrls: ["https://amoy.polygonscan.com/"],
  },
};
