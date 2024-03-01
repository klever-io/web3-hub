import type { CardanoProviderProps } from './cardano/types'
import type { NetworkKey } from './networks'
import type { SubstrateProviderProps } from './substrate/types'

export type Address = string
export type Hash = string

export interface Account {
  name?: string
  address: Address
}

export interface Balance {
  free: number | string
  frozen: number | string
}

export type ProviderBuilderProps<T extends NetworkKey> = T extends 'dot' | 'ksm' ? SubstrateProviderProps : T extends 'ada' ? CardanoProviderProps : never;

// TODO: Add type and functions of injected providers
export type Web3Window = {
  injectedWeb3?: any
  cardano?: any
  ic?: any
} & Window & typeof globalThis

export const web3Window = (window as Web3Window)
