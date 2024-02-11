import { Network } from '@/networks';
import { SubstrateProvider } from '@/substrate';
import type { SubstrateProviderProps } from '@/substrate/types';

export class PolkadotProvider extends SubstrateProvider {
  constructor({ appName, rpcProvider }: SubstrateProviderProps) {
    if (!appName)
      throw new Error('missing app name')
    if (!rpcProvider)
      throw new Error('missing rpc provider')

    super(Network.POLKADOT, appName, rpcProvider)
  }
}
