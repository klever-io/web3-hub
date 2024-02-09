import type { Address } from '@/entities/types';
import { EmptyAddressError } from '@/errors/empty-address-error';
import { EmptyMessageError } from '@/errors/empty-message-error';
import { EmptySignatureError } from '@/errors/empty-signature-error';
import { signatureVerify as substrateSignatureVerify } from '@polkadot/util-crypto';
import { beforeEach, describe, expect, it } from 'vitest';
import { signatureVerify } from './signature-verify';

let message: string
let signature: string
let address: Address

describe('Signature verify use case', () => {
  beforeEach(() => {
    message = 'to validated'
    signature = 'signed message'
    address = '0x123'
  })

  it('should be able to throw empty message error', () => {
    message = ''
    expect(() => signatureVerify(message, signature, address)).toThrow(EmptyMessageError)
  })

  it('should be able to throw empty signature error', () => {
    signature = ''
    expect(() => signatureVerify(message, signature, address)).toThrow(EmptySignatureError)
  })

  it('should be able to throw empty address error', () => {
    address = ''
    expect(() => signatureVerify(message, signature, address)).toThrow(EmptyAddressError)
  })

  it('should be able to calculate real signed message', () => {
    address = '5DcSXn5e8DWrTNEM14kpifUAN8CczJJgTiKgFPV7XjWr6HS5'
    signature = '0xba21fce39c0ea58dc28f34634d8075a15ffd8d996e6d533cf21f2a4e2baa3569323846fbb3b095563012f9fd8abc3565837cf108b7bd6930b9e0c3579f785e88'

    substrateSignatureVerify(message, signature, address);
    const result = signatureVerify(message, signature, address)

    expect(result).toBeTruthy()
  })
})
