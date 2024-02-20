// TODO: Add klever mobile app source name
export const availableWallets = ['begin', 'eternl', 'flint ', 'gerowallet ', 'lace', 'nami', 'nufi', 'raywallet', 'yoroi'] as const

export type AvailableWallet = typeof availableWallets[number]

export enum CardanoWallet {
  BEGIN = 'begin',
  ETERNL = 'eternl',
  FLINT = 'flint',
  GERO_WALLET = 'gerowallet',
  LACE = 'lace',
  NAMI = 'nami',
  NUFI = 'nufi',
  RAY_WALLET = 'raywallet',
  YOROI = 'yoroi',
}
