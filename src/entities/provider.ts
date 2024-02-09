import type { Account, Address, Balance } from '@/types'

export interface Provider {
  connect(): Promise<Account[]>
  getBalance(address: string): Promise<Balance>
  signMessage(address: string, message: string): Promise<string>
  signatureVerify(message: string, signature: string, address: Address): boolean
}
