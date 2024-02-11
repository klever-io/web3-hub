import { InvalidNetworkError } from './errors/invalid-network-error'

export const Networks = {
  dot: {
    id: 1,
    name: 'Polkadot',
    decimals: 10,
  },
  ksm: {
    id: 2,
    name: 'Kusama',
    decimals: 12,
  },
}

export enum Network {
  POLKADOT = 'dot',
  KUSAMA = 'ksm',
}

export type NetworkKey = keyof typeof Networks
export interface NetworkData {
  id: number
  name: string
  decimals: number
}

export function isValidNetwork(key: string) {
  let valid = false

  Object.keys(Networks).forEach((k) => {
    if (k === key)
      valid = true
  })

  return valid
}

export function getNetworkKeyById(id: number): NetworkKey {
  let networkKey: NetworkKey | undefined
  for (const [key, value] of Object.entries(Networks)) {
    if (value.id === id)
      networkKey = key as NetworkKey
  }

  if (!networkKey)
    throw new InvalidNetworkError()

  return networkKey
}
