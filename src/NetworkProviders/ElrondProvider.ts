import { Account, Address, TokenPayment, Transaction, TransactionWatcher } from '@elrondnetwork/erdjs/out';
import { ESDT_TRANSFER_GAS_LIMIT } from '@elrondnetwork/erdjs/out/constants';
import axios from 'axios';
import BigNumber from 'bignumber.js';

import { ElrondApiProvider } from '../NetworkApiProviders/ElrondApiProvider';
import { IGetTransaction, INetworkProvider, ISendTransaction, ProviderChain } from '../types';
import { DummyElrondWallet } from '../WalletProviders/DummyElrondProvider';

export class ElrondProvider implements INetworkProvider {
  private wallet: DummyElrondWallet;
  private apiProvider: ElrondApiProvider;
  private userAccount: Account;

  constructor(wallet: DummyElrondWallet, apiProvider: ElrondApiProvider) {
    this.wallet = wallet;
    this.apiProvider = apiProvider;
    this.userAccount = this.wallet.userAccount;
  }

  async sendTransaction(_transaction: ISendTransaction): Promise<string> {
    const transaction = this.buildTransaction(_transaction);

    transaction.setNonce(this.userAccount.nonce);
    this.userAccount.incrementNonce();

    await this.wallet.signTransaction(transaction);

    await this.apiProvider.apiNetworkProvider.sendTransaction(transaction);

    const watcher = new TransactionWatcher(this.apiProvider.apiNetworkProvider);
    const transactionOnNetwork = await watcher.awaitCompleted(transaction);

    const txHash = transactionOnNetwork.hash;
    const txStatus = transactionOnNetwork.status;

    console.log(`Transaction ${txHash} completed with status ${txStatus}`);

    return txHash;
  }

  private buildTransaction(transaction: ISendTransaction): Transaction {
    return new Transaction({
      receiver: new Address(transaction.receiver),
      value: TokenPayment.egldFromAmount(transaction.value),
      chainID: this.apiProvider.chainId,
      gasLimit: ESDT_TRANSFER_GAS_LIMIT,
    });
  }

  async getTransaction(transactionHash: string): Promise<IGetTransaction> {
    const { data: txData } = await axios.get(`${this.apiProvider.proxyGateway}/transactions/${transactionHash}`);
    const egldPriceAtTransactionTimeUSD = txData?.price;
    const value = new BigNumber(txData?.value).shiftedBy(-18).toNumber();
    return {
      chain: ProviderChain.ELROND,
      sender: txData?.sender,
      receiver: txData?.receiver,
      value: value,
      valueUsd: value * egldPriceAtTransactionTimeUSD,
      valueEur: 0,
      txHash: txData?.txHash,
      fee: txData?.fee,
      status: txData?.status,
    };
  }
}
