import { BalanceFetchError } from '@/errors/balance-fetch-error';
import type { ApiPromise } from './types';
import type { Balance } from '@/types';

export async function getBalance(api: ApiPromise): Promise<Balance> {
  try {
    const accountBalance = await api.getBalance()
    return {
      free: accountBalance,
      frozen: '00', // asset staking never gets "frozen" or "locked" in Cardano Network
    }
  }
  catch (error) {
    throw new BalanceFetchError(error as Error)
  }
}
