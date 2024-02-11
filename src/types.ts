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

export type ProviderBuilderProps = SubstrateProviderProps
