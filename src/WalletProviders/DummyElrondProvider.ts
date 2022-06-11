import { Mnemonic, UserSigner } from '@elrondnetwork/erdjs-walletcore/out';
import { Account, Transaction } from '@elrondnetwork/erdjs/out';

import { IWalletProvider } from '../types';

export const dummyMnemonic =
  "friend buyer chair ship toilet silver tragic lend design shrug mirror pole census divorce alarm wisdom sponsor blanket photo hazard today side fine small";

export class DummyElrondWallet implements IWalletProvider {
  userAccount: Account;
  signer: UserSigner;

  constructor(_mnemonic: string) {
    const mnemonic = Mnemonic.fromString(_mnemonic);
    const userSecretKey = mnemonic.deriveKey();

    this.userAccount = new Account(userSecretKey.generatePublicKey().toAddress());
    this.signer = new UserSigner(userSecretKey);
  }

  async signTransaction(transaction: Transaction) {
    await this.signer.sign(transaction);

    return transaction;
  }
}
