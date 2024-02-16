import type { AvailableWallet } from './available-wallets';

export interface CardanoProviderProps {
  wallet?: AvailableWallet
}

export type CardanoUsedAddress = string
