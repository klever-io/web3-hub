import { InvalidNetworkError } from '@/errors/invalid-network-error';
import { UserRejectedError } from '@/errors/user-rejected-error';
import type { Network } from '@/networks';
import { Networks } from '@/networks';
import type { Address } from '@/types';
import type { ApiPromise } from '@polkadot/api';
import { web3FromAddress } from '@polkadot/extension-dapp';

export async function bondExtra(network: Network, api: ApiPromise, address: Address, amount: number) {
  try {
    const selectedNetwork = Networks[network]
    if (!selectedNetwork)
      throw new InvalidNetworkError()

    const precision = Networks[network].decimals
    const injector = await web3FromAddress(address)
    const tx = api.tx.nominationPools.bondExtra({
      FreeBalance: amount * 10 ** precision,
    });
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
