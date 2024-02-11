import { Network } from '@/networks';
import { SubstrateProvider } from '@/substrate';
import type { SubstrateProviderProps } from '@/substrate/types';

export class KusamaProvider extends SubstrateProvider {
  constructor({ appName, rpcProvider }: SubstrateProviderProps) {
    super(Network.KUSAMA, appName, rpcProvider)
  }
}
