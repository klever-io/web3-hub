import { UserRejectedError } from '@/errors/user-rejected-error';
import { web3FromAddress } from '@polkadot/extension-dapp';
import { describe, expect, it, vi } from 'vitest';
import { claim } from './claim';

vi.mock('@polkadot/extension-dapp', () => ({
  web3FromAddress: vi.fn(),
}))

const address = 'wil123'

describe('Claim case', () => {
  it('should successfully submit claim tx and return hash', async () => {
    const injector = { signer: 'signer' };
    (web3FromAddress as any).mockResolvedValue(injector)

    const signAndSendMock = vi.fn().mockResolvedValue({ toString: () => 'hash123' })
    const claimPayoutMock = vi.fn().mockImplementation(() => ({
      signAndSend: signAndSendMock,
    }))

    const api: any = {
      tx: {
        nominationPools: {
          claimPayout: claimPayoutMock,
        },
      },
    }

    const hash = await claim(api, address)

    expect(web3FromAddress).toHaveBeenCalledWith(address)
    expect(claimPayoutMock).toHaveBeenCalled()
    expect(signAndSendMock).toHaveBeenCalledWith(address, { signer: injector.signer })
    expect(hash).toBe('hash123')
  })

  it('should throw error when the user reject tx', async () => {
    (web3FromAddress as any).mockResolvedValue({ signer: 'signer' })

    const api: any = {
      tx: {
        nominationPools: {
          claimPayout: vi.fn().mockImplementation(() => ({
            signAndSend: vi.fn().mockRejectedValue(new Error('Rejected by user')),
          })),
        },
      },
    }

    await expect(claim(api, address)).rejects.toThrow(UserRejectedError)
  })
})
