import type { ProviderEntity } from '@/entities/provider-entity';
import type { Account, Balance } from '..';
import { connect } from './connect';

export class KleverProvider implements ProviderEntity {
  async connect(): Promise<Account[]> {
    const principalAddress = await connect()

    return [{ name: 'Principal Account', address: principalAddress }]
  }

  getBalance(address: string): Promise<Balance> {
    throw new Error('Method not implemented.');
  }

  signMessage(address: string, message: string): Promise<string> {
    throw new Error('Method not implemented.');
  }

  signatureVerify(message: string, signature: string, address: string): boolean {
    throw new Error('Method not implemented.');
  }

  joinPool(address: string, poolId: number, amount: number): Promise<string> {
    throw new Error('Method not implemented.');
  }

  bondExtra(address: string, amount: number): Promise<string> {
    throw new Error('Method not implemented.');
  }

  claim(address: string): Promise<string> {
    throw new Error('Method not implemented.');
  }
}
