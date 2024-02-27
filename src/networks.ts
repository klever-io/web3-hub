import { InvalidNetworkError } from './errors/invalid-network-error'

export const Networks = {
  dot: {
    id: 1,
    name: 'Polkadot',
    decimals: 10,
    minStakeAmount: 1,
  },
  ksm: {
    id: 2,
    name: 'Kusama',
    decimals: 12,
    minStakeAmount: 0.1,
  },
  ada: {
    id: 3,
    name: 'Cardano',
    decimals: 5,
    minStakeAmount: 1, // TODO: Validate min stake amount
  },
  icp: {
    id: 4,
    name: 'Internet Computer',
    decimals: 8,
    minStakeAmount: 1, // TODO: Validate min stake amount
  },
  klv: {
    id: 5,
    name: 'Klever',
    decimals: 6,
    minStakeAmount: 1, // TODO: Validate min stake amount
  },
}

export enum Network {
  POLKADOT = 'dot',
  KUSAMA = 'ksm',
  CARDANO = 'ada',
  INTERNET_COMPUTER = 'icp',
  KLEVER = 'klv',
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
