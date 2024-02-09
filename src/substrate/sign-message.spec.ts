import type { Address } from '@/entities/types';
import { EmptyAddressError } from '@/errors/empty-address-error';
import { EmptyMessageError } from '@/errors/empty-message-error';
import { NoSignerAvailableError } from '@/errors/no-signer-available-error';
import { web3FromAddress } from '@polkadot/extension-dapp';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { signMessage } from './sign-message';

let address: Address
let message: string

vi.mock('@polkadot/extension-dapp', () => ({
  web3FromAddress: vi.fn().mockResolvedValue({
    signer: {
      signRaw: vi.fn(() => Promise.resolve(({ signature: '123' }))),
    },
  }),
}))

describe('Sign message use case', () => {
  beforeEach(async () => {
    address = '0x123'
    message = 'to validate'
  })

  it('should be able to throw empty message error', async () => {
    message = ''
    await expect(signMessage(address, message)).rejects.toThrow(EmptyMessageError)
  })

  it('should be able to throw empty address error', async () => {
    address = ''
    await expect(signMessage(address, message)).rejects.toThrow(EmptyAddressError)
  })

  it('should be able eto throw no signer available error', async () => {
    vi.mocked(web3FromAddress).mockResolvedValueOnce({ signer: {} } as any)

    await expect(signMessage(address, message)).rejects.toThrow(NoSignerAvailableError)
  })

  it('should be able to return signed message', async () => {
    const expectedSignature = await signMessage(address, message)

    expect(expectedSignature).toEqual('123')
  })
})
