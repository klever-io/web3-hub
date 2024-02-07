import type { Provider } from '@/entities/provider'
import type { Address, Network } from '@/entities/types'
import { NotInjectedError } from '@/errors/not-injected-error'
import { connect } from './connect'

export class SubstrateProvider implements Provider {
  network: Network
  sourceName = 'injectedWeb3'

  constructor(network: Network) {
    this.network = network
  }

  connect(): Promise<Address> {
    if (!(this.sourceName in window))
      throw new NotInjectedError()

    return connect(this.network)
  }

  signMessage(message: string): Promise<string> {
    return Promise.resolve(`message: ${message}`)
  }

  getBalance(): Promise<string> {
    return Promise.resolve('0')
  }
}
