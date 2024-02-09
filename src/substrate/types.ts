import type { Address, Balance } from '@/entities/types'

export interface SubstrateAccount {
  address: Address
  types?: 'ed25519' | 'sr25519' | 'ecdsa' | 'ethereum'
}

export interface SubstrateAccountWithMeta extends SubstrateAccount {
  meta: {
    genesisHash?: string | null
    name?: string
    source: string
  }
}

export type UnsubscribeFunction = () => void

export interface SubstrateBalance extends Balance {
  flags: string
  reserved: number
}
