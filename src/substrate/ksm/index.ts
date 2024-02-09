import { Network } from '@/entities/types';
import { SubstrateProvider } from '../provider';

export class KusamaProvider extends SubstrateProvider {
  constructor(appName: string, rpcProvider: string) {
    super(Network.KUSAMA, appName, rpcProvider)
  }
}
