import { CardanoProvider } from './cardano';
import type { CardanoProviderProps } from './cardano/types';
import type { ProviderEntity } from './entities/provider-entity';
import { InvalidNetworkError } from './errors/invalid-network-error';
import { InternetComputerProvider } from './icp';
import type { NetworkData, NetworkKey } from './networks';
import { getNetworkKeyById, isValidNetwork } from './networks';
import { PolkadotProvider } from './substrate/dot';
import { KusamaProvider } from './substrate/ksm';
import type { SubstrateProviderProps } from './substrate/types';
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

  // TODO: Improve props type to avoid generic for vanilla javascript users
  build<T extends NetworkKey>(props: ProviderBuilderProps<T>): ProviderEntity {
    switch (this.network) {
      case 'dot':
        return new PolkadotProvider(props as SubstrateProviderProps)
      case 'ksm':
        return new KusamaProvider(props as SubstrateProviderProps)
      case 'ada':
        return new CardanoProvider(props as CardanoProviderProps)
      case 'icp':
        return new InternetComputerProvider()
      default:
        throw new InvalidNetworkError()
    }
  }
}
