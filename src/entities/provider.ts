import type { Address, Balance } from '@/entities/types'

export interface Provider {
  connect(): Promise<Address>
  signMessage(message: string): Promise<string>
  getBalance(): Promise<Balance>
}
