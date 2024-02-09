import { SubstrateProvider } from '@/substrate';
import { Network } from '@/types';

export class PolkadotProvider extends SubstrateProvider {
  constructor(appName: string, rpcProvider: string) {
    super(Network.POLKADOT, appName, rpcProvider)
  }
}
