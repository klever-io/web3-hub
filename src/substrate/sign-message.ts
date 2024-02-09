import type { Address } from '@/entities/types';
import { EmptyAddressError } from '@/errors/empty-address-error';
import { EmptyMessageError } from '@/errors/empty-message-error';
import { NoSignerAvailableError } from '@/errors/no-signer-available-error';
import { web3FromAddress } from '@polkadot/extension-dapp';

export async function signMessage(address: Address, message: string): Promise<string> {
  if (message.length === 0)
    throw new EmptyMessageError()

  if (address.length === 0)
    throw new EmptyAddressError()

  const injector = await web3FromAddress(address)
  const signRaw = injector.signer.signRaw
  if (!signRaw)
    throw new NoSignerAvailableError()

  const { signature } = await signRaw({
    address,
    data: message,
    type: 'payload',
  })

  return signature
}
