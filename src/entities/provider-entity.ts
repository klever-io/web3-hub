import type { Account, Address, Balance, Hash } from '@/types'

export interface ProviderEntity {
  connect(): Promise<Account[]>
  getBalance(address: Address): Promise<Balance>
  signMessage(address: Address, message: string): Promise<string>
  signatureVerify(message: string, signature: string, address: Address): boolean
  joinPool(address: Address, poolId: number, amount: number): Promise<Hash>
  bondExtra(address: Address, amount: number): Promise<Hash>
  claim(address: Address): Promise<Hash>
}
