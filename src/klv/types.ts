export enum Chain {
  KLV = 1,
  ETH = 4,
  TRX = 2,
}

export interface KleverAccount {
  address: string
  chain: number
  name: string
  provider: string
}

interface Communication {
  waitingResponse: boolean
}

export interface KleverHub {
  name: string
  communication: Communication
  accountChangeListeners: any[]
  blockChainChangeListeners: any[]
  isConnected: boolean
  isKleverHub: boolean
  account?: KleverAccount
  initialize: () => Promise<void>
}
