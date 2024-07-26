"use client";
import { Config, DAppProvider } from "@usedapp/core";

const config: Config = {
  readOnlyChainId: 80002,
};

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DAppProvider config={config}>{children}</DAppProvider>;
}
