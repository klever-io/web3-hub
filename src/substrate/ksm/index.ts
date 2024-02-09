import { SubstrateProvider } from '@/substrate';
import { Network } from '@/types';

export class KusamaProvider extends SubstrateProvider {
  constructor(appName: string, rpcProvider: string) {
    super(Network.KUSAMA, appName, rpcProvider)
  }
}
