import type { Provider } from '@/entities/provider'
import type { Address, Network } from '@/entities/types'
import { connect } from './connect'

export class SubstrateProvider implements Provider {
  network: Network
  appName: string

  constructor(network: Network, appName: string) {
    this.network = network
    this.appName = appName
  }

  async connect(): Promise<Address> {
    const accounts = await connect(this.appName)

    return accounts.map(account => account.address)
  }

  signMessage(message: string): Promise<string> {
    return Promise.resolve(`message: ${message}`)
  }

  getBalance(): Promise<string> {
    return Promise.resolve('0')
  }
}
