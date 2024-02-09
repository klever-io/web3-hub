import { Network } from '@/types'
import { SubstrateProvider } from '@/substrate/provider'

export class PolkadotProvider extends SubstrateProvider {
  constructor(appName: string, rpcProvider: string) {
    super(Network.POLKADOT, appName, rpcProvider)
  }
}
