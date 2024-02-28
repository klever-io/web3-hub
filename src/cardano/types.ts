import type { AvailableWallet } from './available-wallets';

export interface CardanoProviderProps {
  wallet?: AvailableWallet
}

export type CardanoUsedAddress = string

export interface ApiPromise {
  getBalance: (address: string) => Promise<string>
  getUsedAddresses: () => Promise<string[]>
  getUnusedAddresses: () => Promise<string[]>
}
