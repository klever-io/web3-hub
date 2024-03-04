import { UserRejectedError } from '@/errors/user-rejected-error';
import type { Address } from '@/types';
import type { ApiPromise } from '@polkadot/api';
import { web3FromAddress } from '@polkadot/extension-dapp';

export async function claim(api: ApiPromise, address: Address) {
  try {
    const injector = await web3FromAddress(address)
    const tx = api.tx.nominationPools.claimPayout()
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
