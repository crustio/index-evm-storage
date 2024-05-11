import { createPublicClient, defineChain, http } from "viem";
import { CONFIGS } from "../config";


const crustEvmTest = defineChain({
  id: 366666,
  name: "Crust EVM Parachain Test",
  nativeCurrency: {
    name: "CRU",
    symbol: "CRU",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: [`https://fraa-flashbox-2952-rpc.a.stagenet.tanssi.network`],
    },
  },
});
const supportChains = [crustEvmTest];

const chain = supportChains.find((item) => item.id == CONFIGS.chainId);
if (!chain) throw "Chaind Id Error";

export const pc = createPublicClient({
  chain: chain,
  batch: {
    multicall: true,
  },
  transport: http(),
});
