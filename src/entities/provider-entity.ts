import type { Account, Address, Balance } from '@/types'

export interface ProviderEntity {
  connect(): Promise<Account[]>
  getBalance(address: string): Promise<Balance>
  signMessage(address: string, message: string): Promise<string>
  signatureVerify(message: string, signature: string, address: Address): boolean
  joinPool(address: string, poolId: number, amount: number): Promise<string>
}
