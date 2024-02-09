export enum Network {
  POLKADOT = 'dot',
  KUSAMA = 'ksm',
}

export interface Address {
  name?: string
  address: string
}

export type Balance = string | BigInt
