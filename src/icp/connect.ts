import { NoAvailableAccountsError, NoProviderAvailableError } from '@/errors';
import { UserRejectedError } from '@/errors/user-rejected-error';
import { web3Window } from '@/types';
import type { PrincipalAddress } from './types';

export async function connect(): Promise<PrincipalAddress> {
  try {
    const hasConnected = await web3Window.ic.requestConnect();
    if (!hasConnected)
      throw new NoProviderAvailableError()

    const account: PrincipalAddress | undefined = web3Window.ic.plug.principalId;
    if (!account || account.length === 0)
      throw new NoAvailableAccountsError()

    return account
  }
  catch (error) {
    if ((error as Error).message.toLowerCase().includes('the agent creation was rejected'))
      throw new UserRejectedError()

    throw error
  }
}
