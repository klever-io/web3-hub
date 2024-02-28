import type { ProviderEntity } from '@/entities/provider-entity';
import type { Account, Address, Balance } from '@/types';
import { CardanoWallet } from './available-wallets';
import { connect } from './connect';
import type { CardanoProviderProps } from './types';

export class CardanoProvider implements ProviderEntity {
  wallet?: CardanoWallet

  constructor({ wallet }: CardanoProviderProps) {
    if (wallet)
      this.wallet = CardanoWallet[wallet.toUpperCase() as keyof typeof CardanoWallet]
  }

  async connect(): Promise<Account[]> {
    const accounts = await connect(this.wallet)

    return accounts.map((account, index) => ({
      name: `Account #${index}`,
      address: account,
    }))
  }

  async getBalance(address: Address): Promise<Balance> {
    throw new Error('Method not implemented.')
  }

  async signMessage(address: Address, message: string): Promise<string> {
    throw new Error('Method not implemented.')
  }

  signatureVerify(message: string, signature: string, address: string): boolean {
    throw new Error('Method not implemented.')
  }

  async joinPool(address: string, poolId: number, amount: number): Promise<string> {
    throw new Error('Method not implemented.');
  }
}
