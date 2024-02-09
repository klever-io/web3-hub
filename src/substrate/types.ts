export interface SubstrateAccount {
  address: string
  types?: 'ed25519' | 'sr25519' | 'ecdsa' | 'ethereum'
}

export interface SubstrateAccountWithMeta extends SubstrateAccount {
  meta: {
    genesisHash?: string | null
    name?: string
    source: string
  }
}
