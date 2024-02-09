import type { Provider } from '@/entities/provider';
import type { Account, Address, Balance, Network } from '@/types';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { connect } from './connect';
import { getBalance } from './get-balance';
import { signMessage } from './sign-message';
import { signatureVerify } from './signature-verify';
import type { SubscribeCallback } from './subscribe';
import { subscribe } from './subscribe';
import type { UnsubscribeFunction } from './types';

export class SubstrateProvider implements Provider {
  network: Network
  appName: string
  rpcProvider: string

  constructor(network: Network, appName: string, rpcProvider: string) {
    this.network = network
    this.appName = appName
    this.rpcProvider = rpcProvider
  }

  private async createProvider() {
    const provider = new WsProvider(this.rpcProvider)
    const api = await ApiPromise.create({ provider })

    return api
  }

  async connect(): Promise<Account[]> {
    const accounts = await connect(this.appName)

    return accounts.map(account => ({
      name: account.meta.name,
      address: account.address,
    }))
  }

  async subscribe(callback: SubscribeCallback): Promise<UnsubscribeFunction> {
    return subscribe(this.appName, callback)
  }

  async getBalance(address: Address): Promise<Balance> {
    const api = await this.createProvider()

    return getBalance(api, address)
  }

  async signMessage(address: Address, message: string): Promise<string> {
    return signMessage(address, message)
  }

  signatureVerify(message: string, signature: string, address: string): boolean {
    return signatureVerify(message, signature, address)
  }
}
