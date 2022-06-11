import { Transaction as ElrondTransaction } from '@elrondnetwork/erdjs/out';

export enum ProviderChain {
  ELROND = "elrond",
  ETHEREUM = "ethereum",
}

export interface ISendTransaction {
  chain: ProviderChain;
  receiver: string;
  value: number;
}

export interface IGetTransaction {
  chain: ProviderChain;
  sender: string;
  receiver: string;
  value: number;
  valueUsd: number;
  valueEur: number;
  txHash: string;
  fee: string;
  status: string;
}

type Transaction = ElrondTransaction;

export interface INetworkProvider {
  sendTransaction(transaction: ISendTransaction): Promise<string>;
  getTransaction(transactionHash: string): Promise<IGetTransaction>;
}

export interface IWalletProvider {
  signTransaction(transaction: Transaction): Promise<Transaction>;
}
