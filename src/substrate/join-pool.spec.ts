import { InvalidNetworkError } from '@/errors/invalid-network-error'
import { MinAmountError } from '@/errors/min-amount-error'
import { UserRejectedError } from '@/errors/user-rejected-error'
import { web3FromAddress } from '@polkadot/extension-dapp'
import { describe, expect, it, vi } from 'vitest'
import { Network, Networks } from '..'
import { joinPool } from './join-pool'

vi.mock('@polkadot/extension-dapp', () => ({
  web3FromAddress: vi.fn(),
}))

vi.mock('@/networks', () => ({
  Network: {
    POLKADOT: 'dot',
  },
  Networks: {
    dot: {
      minStakeAmount: 10,
      decimals: 12,
    },
  },
}))

const address = 'wil123'
const network = Network.POLKADOT

describe('Join pool case', () => {
  it('throws InvalidNetworkError for an unsupported network', async () => {
    const poolId = 1
    const amount = 10

    await expect(joinPool('invalidNetwork' as any, {} as any, address, poolId, amount))
      .rejects.toThrow(InvalidNetworkError);
  });

  it('throws MinAmountError if the amount is below the minimum stake amount', async () => {
    const poolId = 1
    const invalidAmount = 9

    await expect(joinPool(network, {} as any, address, poolId, invalidAmount))
      .rejects.toThrow(MinAmountError);
  });

  it('should be join a pool', async () => {
    const decimals = Networks[network].decimals
    const poolId = 1
    const amount = 10
    const mockedHash = 'hash123';
    (web3FromAddress as any).mockResolvedValue({ signer: {} })
    const apiMock = {
      tx: {
        nominationPools: {
          join: vi.fn().mockResolvedValue({ signAndSend: vi.fn().mockResolvedValue({ toString: () => mockedHash }) }),
        },
      },
    }

    const hash = await joinPool(network, apiMock as any, address, poolId, amount)
    expect(hash).toBe(mockedHash)
    expect(apiMock.tx.nominationPools.join).toHaveBeenCalledWith(amount * 10 ** decimals, poolId);
  })

  it('throws UserRejectedError on user rejection', async () => {
    const poolId = 1
    const amount = 10;
    (web3FromAddress as any).mockResolvedValue({ signer: {} })
    const apiMock = {
      tx: {
        nominationPools: {
          join: vi.fn().mockResolvedValue({ signAndSend: vi.fn().mockRejectedValue(new Error('Rejected by User')) }),
        },
      },
    };

    await expect(joinPool(network, apiMock as any, address, poolId, amount))
      .rejects.toThrow(UserRejectedError);
  });
})
