import { IGetTransaction, INetworkProvider, ISendTransaction, ProviderChain } from '../types';

export class EthereumProvider implements INetworkProvider {
  async sendTransaction(_transaction: ISendTransaction): Promise<string> {
    return "NOT IMPLEMENTED";
  }

  async getTransaction(transactionHash: string): Promise<IGetTransaction> {
    return {
      chain: ProviderChain.ETHEREUM,
      sender: "NOT IMPLEMENTED",
      receiver: "NOT IMPLEMENTED",
      value: 0,
      valueUsd: 0,
      valueEur: 0,
      txHash: "NOT IMPLEMENTED",
      fee: "NOT IMPLEMENTED",
      status: "NOT IMPLEMENTED",
    };
  }
}
