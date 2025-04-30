// getWagmiConfig.js
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { kairos } from "wagmi/chains";

export const wagmiConfig = getDefaultConfig({
  appName: "Zealous Swap",
  projectId: "403fedeb1554f5af94f6cccc681849f2",
  chains: [kairos],
  ssr: false,
});
