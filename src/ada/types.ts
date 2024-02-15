export interface CardanoWeb extends Window {
  cardano: {
    [key: string]: CardanoExtension
  }
}

export interface CardanoExtension {
  apiVersion: string
  enable: () => Promise<CardanoInitializedExtension>
  isEnabled: () => Promise<boolean>
  icon: string
  name: string
}

export interface CardanoInitializedExtension extends CardanoWeb {
  getBalance: () => Promise<string>
  getUsedAddresses: () => Promise<string[]>
  getUnusedAddresses: () => Promise<string[]>
}

export interface CardanoProviderProps {
  appName: string
  rpcProvider: string
}
