import { ApiNetworkProvider } from '@elrondnetwork/erdjs-network-providers/out';

export enum ElrondApiEnv {
  DEVNET = "devnet",
  TESTNET = "testnet",
  MAINNET = "mainnet",
}

const proxyGateways = {
  testnet: "https://testnet-api.elrond.com",
  devnet: "https://devnet-api.elrond.com",
  mainnet: "https://api.elrond.com",
};

const elrondExplorer = {
  devnet: "https://devnet-explorer.elrond.com",
  testnet: "https://testnet-explorer.elrond.com",
  mainnet: "https://explorer.elrond.com",
};

const chainId = {
  devnet: "D",
  testnet: "T",
  mainnet: "1",
};

export class ElrondApiProvider {
  env: ElrondApiEnv;
  proxyGateway: string;
  explorerUrl: string;
  chainId: string;
  apiNetworkProvider: ApiNetworkProvider;
  constructor(env = ElrondApiEnv.DEVNET) {
    this.env = env;
    this.proxyGateway = proxyGateways[this.env];
    this.explorerUrl = elrondExplorer[this.env];
    this.chainId = chainId[this.env];

    this.apiNetworkProvider = new ApiNetworkProvider(this.proxyGateway, {
      timeout: 10000,
    });
  }
}
