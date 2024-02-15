import type { ProviderEntity } from './entities/provider-entity';
import { InvalidNetworkError } from './errors/invalid-network-error';
import type { NetworkData, NetworkKey } from './networks';
import { getNetworkKeyById, isValidNetwork } from './networks';
import { PolkadotProvider } from './substrate/dot';
import { KusamaProvider } from './substrate/ksm';
import type { ProviderBuilderProps } from './types';

export class Web3Provider {
  network: NetworkKey

  constructor(network: NetworkKey | NetworkData) {
    if (typeof network !== 'string') {
      this.network = getNetworkKeyById(network.id)
      return
    }

    if (!isValidNetwork(network))
      throw new InvalidNetworkError()

    this.network = network
  }

  private getAvailableProviders() {
    return {
      dot: PolkadotProvider,
      ksm: KusamaProvider,
    }
  }

  build(props: ProviderBuilderProps): ProviderEntity {
    const Provider = this.getAvailableProviders()[this.network]

    return new Provider(props)
  }
}
