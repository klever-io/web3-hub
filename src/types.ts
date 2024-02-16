import type { CardanoProviderProps } from './ada/types'
import type { SubstrateProviderProps } from './substrate/types'

export type Address = string

export interface Account {
  name?: string
  address: Address
}

export interface Balance {
  free: number | string
  frozen: number | string
}

export type ProviderBuilderProps = SubstrateProviderProps | CardanoProviderProps

export type Web3Window = {
  injectedWeb3: any
  cardano: any
} & Window & typeof globalThis
