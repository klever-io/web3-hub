import { MinAmountError } from '@/errors/min-amount-error';
import { UserRejectedError } from '@/errors/user-rejected-error';
import type { Network } from '@/networks';
import { Networks } from '@/networks';
import type { ApiPromise } from '@polkadot/api';
import { web3FromAddress } from '@polkadot/extension-dapp';

export async function joinPool(network: Network, api: ApiPromise, address: string, poolId: number, amount: number) {
  try {
    if (amount < Networks[network].minStakeAmount)
      throw new MinAmountError()

    const precision = Networks[network].decimals
    const injector = await web3FromAddress(address)
    const tx = await api.tx.nominationPools.join(amount * 10 ** precision, poolId)
    const signer = { signer: injector.signer }

    const hash = await tx.signAndSend(address, signer)
    return hash.toString()
  }
  catch (error) {
    if ((error as Error).message.toLowerCase().includes('rejected by user'))
      throw new UserRejectedError()

    throw error
  }
}
