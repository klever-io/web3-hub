import { BalanceFetchError } from '@/errors/balance-fetch-error';
import { EmptyAddressError } from '@/errors/empty-address-error';
import type { ApiPromise } from './types';
import type { Balance } from '@/types';

export async function getBalance(api: ApiPromise, address: string): Promise<Balance> {
  if (address.length === 0)
    throw new EmptyAddressError()

  try {
    const accountBalance = await api.getBalance(address)
    return {
      free: accountBalance,
      frozen: 0, // asset staking never gets "locked" in Cardano Network
    }
  }
  catch (error) {
    throw new BalanceFetchError(error as Error)
  }
}
