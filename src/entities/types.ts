export enum Network {
  POLKADOT = 'dot',
  KUSAMA = 'ksm',
}

export type Address = string
export interface Account {
  name?: string
  address: Address
}

export interface Balance {
  free: number | string
  frozen: number | string
}
