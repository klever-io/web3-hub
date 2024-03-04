import type { CardanoWallet } from './available-wallets';

export type CardanoProviderProps = Record<'wallet', CardanoWallet>;

export type CardanoUsedAddress = string

export type CardanoUnusedAddresses = string

export interface ApiPromise {
  getBalance: (address: string) => Promise<string>
  getUsedAddresses: () => Promise<string[]>
  getUnusedAddresses: () => Promise<string[]>
}
