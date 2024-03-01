import { BalanceFetchError } from '@/errors/balance-fetch-error';
import { describe, expect, it, vi } from 'vitest';
import { getBalance } from './getBalance';

describe('Get balance use case', () => {
  const cardanoMockedAPI = {
    getBalance: vi.fn().mockResolvedValue('00'),
    getUsedAddresses: vi.fn(),
    getUnusedAddresses: vi.fn(),
  }

  const cardanoMockedInvalidAPI = {
    getBalance: async () => {
      throw new Error('unknown error')
    },
    getUsedAddresses: vi.fn(),
    getUnusedAddresses: vi.fn(),
  }

  it('should be able to throw error when api throws error', async () => {
    await expect(getBalance(cardanoMockedInvalidAPI)).rejects.toThrow(BalanceFetchError)
  })

  it('shoud be able to return mocked free balance', async () => {
    const balance = await getBalance(cardanoMockedAPI)
    expect(balance.free).toEqual('00')
  })
})
