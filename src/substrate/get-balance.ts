import { BalanceFetchError } from '@/errors/balance-fetch-error';
import type { ApiPromise } from '@polkadot/api';
import type { SubstrateBalance } from './types';

interface ApiSystemAccountResponse {
  data: SubstrateBalance
}

export async function getBalance(api: ApiPromise, address: string): Promise<SubstrateBalance> {
  try {
    const accountCode = await api.query.system.account(address)
    const accountData = JSON.parse(JSON.stringify(accountCode.toJSON())) as ApiSystemAccountResponse

    return accountData.data
  }
  catch (error) {
    throw new BalanceFetchError(error as Error)
  }
}
