import type { AvailableWallet } from './available-wallets';

export type CardanoProviderProps = Record<AvailableWallet, any>;

export type CardanoUsedAddress = string

export interface ApiPromise {
  getBalance: (address: string) => Promise<string>
  getUsedAddresses: () => Promise<string[]>
  getUnusedAddresses: () => Promise<string[]>
}
