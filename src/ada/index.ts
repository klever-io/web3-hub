import { MissingPropsError } from '@/errors/missing-props-error';
import type { ProviderEntity } from '@/entities/provider-entity';
import type { Account, Address, Balance } from '@/types';
import type { CardanoProviderProps } from './types';
import { connect } from '@/ada/connect';

export class CardanoProvider implements ProviderEntity {
  appName: string
  constructor({ appName }: CardanoProviderProps) {
    this.appName = appName

    if (!appName)
      throw new MissingPropsError()
  }

  async connect(): Promise<Account[]> {
    const accounts = await connect(this.appName)
    return accounts;
  }

  async getBalance(address: Address): Promise<Balance> {
    throw new Error('Not yet implemented.')
  }

  async signMessage(address: Address, message: string): Promise<string> {
    throw new Error('Not yet implemented.')
  }

  signatureVerify(message: string, signature: string, address: string): boolean {
    throw new Error('Not yet implemented.')
  }
}
