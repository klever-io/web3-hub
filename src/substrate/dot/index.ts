import { Network } from '@/entities/types'
import { SubstrateProvider } from '@/substrate/provider'

export class PolkadotProvider extends SubstrateProvider {
  constructor(appName: string) {
    super(Network.POLKADOT, appName)
  }
}
