import { ElrondApiProvider } from '../NetworkApiProviders/ElrondApiProvider';
import { ElrondProvider } from '../NetworkProviders/ElrondProvider';
import { DummyElrondWallet, dummyMnemonic } from '../WalletProviders/DummyElrondProvider';

export class ElrondProviderFactory {
  private dummyWallet: DummyElrondWallet;
  private apiProvider: ElrondApiProvider;
  constructor() {
    this.dummyWallet = new DummyElrondWallet(dummyMnemonic);
    this.apiProvider = new ElrondApiProvider();
  }

  async createProvider() {
    const userAccountOnNetwork = await this.apiProvider.apiNetworkProvider.getAccount(
      this.dummyWallet.userAccount.address
    );
    this.dummyWallet.userAccount.update(userAccountOnNetwork);
    return new ElrondProvider(this.dummyWallet, this.apiProvider);
  }
}
