import type { Address } from '@/entities/types'
import { EmptyAddressError } from '@/errors/empty-address-error'
import { ApiPromise } from '@polkadot/api'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { getBalance } from './get-balance'

vi.mock('@polkadot/api', () => ({
  ApiPromise: {
    create: vi.fn().mockResolvedValue({
      query: {
        system: {
          account: vi.fn().mockResolvedValue({
            toJSON: () => ({
              data: {
                free: 10,
                reserved: 10,
                frozen: 10,
                flags: '',
              },
            }),
          }),
        },
      },
    }),
  },
}))

let address: Address
let api: ApiPromise

describe('Get balance use case', () => {
  beforeEach(async () => {
    address = '0x123'
    api = await ApiPromise.create()
  })

  it('should be able to throw error when address is empty', async () => {
    address = ''

    await expect(getBalance(api, address)).rejects.toThrow(EmptyAddressError)
  })

  it('shoud be able to return mocked free balance', async () => {
    const balance = await getBalance(api, address)

    expect(balance.free).toEqual(10)
  })
})
