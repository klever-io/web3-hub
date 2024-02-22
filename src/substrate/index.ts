import type { ProviderEntity } from '@/entities/provider-entity';
import type { Network } from '@/networks';
import type { Account, Address, Balance } from '@/types';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { bondExtra } from './bond-extra';
import { connect } from './connect';
import { getBalance } from './get-balance';
import { joinPool } from './join-pool';
import { signMessage } from './sign-message';
import { signatureVerify } from './signature-verify';
import type { SubscribeCallback } from './subscribe';
import { subscribe } from './subscribe';
import type { UnsubscribeFunction } from './types';

export class SubstrateProvider implements ProviderEntity {
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

  async joinPool(address: string, poolId: number, amount: number): Promise<string> {
    const api = await this.createProvider()

    return joinPool(this.network, api, address, poolId, amount)
  }

  async bondExtra(address: string, amount: number): Promise<string> {
    const api = await this.createProvider()

    return bondExtra(this.network, api, address, amount)
  }
}
