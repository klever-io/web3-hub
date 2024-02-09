import type { Account, Balance } from '@/entities/types'

export interface Provider {
  connect(): Promise<Account[]>
  signMessage(message: string): Promise<string>
  getBalance(address: string): Promise<Balance>
}
