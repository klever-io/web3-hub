import { MissingPropsError } from '@/errors/missing-props-error';
import { Network } from '@/networks';
import { SubstrateProvider } from '@/substrate';
import type { SubstrateProviderProps } from '@/substrate/types';

export class PolkadotProvider extends SubstrateProvider {
  constructor({ appName, rpcProvider }: SubstrateProviderProps) {
    if (!appName || appName.length === 0 || !rpcProvider || rpcProvider.length === 0)
      throw new MissingPropsError()

    super(Network.POLKADOT, appName, rpcProvider)
  }
}
