// TODO: Add klever mobile app source name
export const availableWallets = ['nami'] as const

export type AvailableWallet = typeof availableWallets[number]

export enum CardanoWallet {
  NAMI = 'nami',
}
