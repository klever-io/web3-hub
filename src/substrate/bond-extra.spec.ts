import { UserRejectedError } from '@/errors/user-rejected-error'
import { Networks } from '@/networks'
import { web3FromAddress } from '@polkadot/extension-dapp'
import { describe, expect, it, vi } from 'vitest'
import { bondExtra } from './bond-extra'

vi.mock('@/networks', () => ({
  Networks: {
    validNetwork: { decimals: 10 },
  },
}))

vi.mock('@polkadot/extension-dapp', () => ({
  web3FromAddress: vi.fn(),
}))

const address = 'wil123'
const amount = 100
const validHash = 'hash123'

describe('Bond Extra value case', () => {
  it('should call bondExtra function with correct params', async () => {
    const injector = { signer: 'signer' };
    (web3FromAddress as any).mockResolvedValue(injector)

    const bondExtraMock = vi.fn().mockImplementation(() => ({
      signAndSend: vi.fn().mockResolvedValue({ toString: () => validHash }),
    }))

    const api: any = { tx: { nominationPools: { bondExtra: bondExtraMock } } }
    const hash = await bondExtra('validNetwork' as any, api, address, amount)

    expect(web3FromAddress).toHaveBeenCalledWith(address)
    expect(bondExtraMock).toHaveBeenCalledWith({
      FreeBalance: 100 * 10 ** (Networks as any).validNetwork.decimals,
    })
    expect(hash).toEqual(validHash)
  })

  it('should throw error when the tx is rejected by user', async () => {
    (web3FromAddress as any).mockResolvedValue({ signer: 'signer' })

    const bondExtraMock = vi.fn().mockImplementation(() => ({
      signAndSend: vi.fn().mockRejectedValue(new Error('Rejected by user')),
    }))
    const api: any = { tx: { nominationPools: { bondExtra: bondExtraMock } } }

    await expect(bondExtra('validNetwork' as any, api, address, amount)).rejects.toThrow(UserRejectedError)
  })
})
