"use client";

import {
  initialize,
  encrypt,
  conditions,
  domains,
  toHexString,
} from "@nucypher/taco";
import { ethers } from "ethers";
import { chainIdForDomain, customTacoNetworks, RITUAL_ID } from "./config";
import { useEffect, useState } from "react";
import { useEthers } from "@usedapp/core";
import { getWebIrys, uploadData } from "./irys";

export default function Home() {
  const { activateBrowserWallet, account, switchNetwork } = useEthers();
  const [provider, setProvider] =
    useState<ethers.providers.Web3Provider | null>();

  const addCustomNetwork = async () => {
    try {
      await provider?.send("wallet_addEthereumChain", [
        customTacoNetworks.TESTNET,
      ]);
      await switchNetwork(chainIdForDomain[domains.TESTNET]);
    } catch (error) {
      console.error("Failed to switch network", error);
    }
  };

  useEffect(() => {
    initialize();
    setProvider(new ethers.providers.Web3Provider((window as any)?.ethereum));
  }, []);

  const encryptData = async () => {
    if (!provider) {
      return;
    }

    try {
      await switchNetwork(chainIdForDomain[domains.TESTNET]);
    } catch (error) {
      await addCustomNetwork();
    }

    const message = "my secret message";

    const encryptedMessage = await encrypt(
      provider,
      domains.TESTNET,
      message,
      new conditions.base.rpc.RpcCondition({
        chain: chainIdForDomain[domains.TESTNET],
        method: "eth_getBalance",
        parameters: [":userAddress"],
        returnValueTest: {
          comparator: ">=",
          value: 1,
        },
      }),
      RITUAL_ID,
      provider.getSigner()
    );

    console.log(encryptedMessage);

    const encryptedMessageHex = toHexString(encryptedMessage.toBytes());
    const webIrys = await getWebIrys(provider);
    const receiptId = await uploadData(webIrys, encryptedMessageHex);

    console.log(receiptId);
  };

  return (
    <main>
      <h1>Taco Chat</h1>
      {!account && (
        <button onClick={activateBrowserWallet}>Connect Wallet</button>
      )}
      {account && <p>Connected Account: {account}</p>}
      {account && <button onClick={encryptData}>Encrypt Data</button>}
    </main>
  );
}
