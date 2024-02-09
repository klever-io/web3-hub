import { EmptyAddressError } from '@/errors/empty-address-error'
import { EmptyMessageError } from '@/errors/empty-message-error'
import { EmptySignatureError } from '@/errors/empty-signature-error'
import { signatureVerify as substrateSignatureVerify } from '@polkadot/util-crypto'

export function signatureVerify(message: string, signature: string, address: string): boolean {
  if (message.length === 0)
    throw new EmptyMessageError()

  if (signature.length === 0)
    throw new EmptySignatureError()

  if (address.length === 0)
    throw new EmptyAddressError()

  const result = substrateSignatureVerify(message, signature, address)

  return result.isValid
}
