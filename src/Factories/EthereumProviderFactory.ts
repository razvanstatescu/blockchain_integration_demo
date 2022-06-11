import { EthereumProvider } from '../NetworkProviders/EthereumProvider';

export class EthereumProviderFactory {
  async createProvider() {
    return new EthereumProvider();
  }
}
