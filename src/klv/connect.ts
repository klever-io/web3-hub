import { NotInjectedError } from '@/errors';
import { NoAvailableAccountsError } from '@/errors/no-accounts-available-error';
import { web3Window } from '@/types';
import type { KleverAccount } from './types';

export async function connect(): Promise<KleverAccount> {
  if (!web3Window.kleverHub)
    throw new NotInjectedError()

  await web3Window.kleverHub.initialize();

  if (!web3Window.kleverHub.account)
    throw new NoAvailableAccountsError()

  return web3Window.kleverHub.account
}
