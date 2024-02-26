import { NotInjectedError } from '@/errors';
import { NoAvailableAccountsError } from '@/errors/no-accounts-available-error';
import { web3Window } from '@/types';
import type { KleverAddress } from './types';

export async function connect(): Promise<KleverAddress> {
  if (!web3Window.kleverWeb)
    throw new NotInjectedError()

  await web3Window.kleverWeb.initialize();

  const address = web3Window.kleverWeb.getWalletAddress();

  if (!address)
    throw new NoAvailableAccountsError()

  return address
}
