import { web3AccountsSubscribe } from '@polkadot/extension-dapp';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { connect } from './connect';
import type { SubscribeCallback } from './subscribe';
import { subscribe } from './subscribe';

vi.mock('@polkadot/extension-dapp', () => ({
  web3AccountsSubscribe: vi.fn(),
}))

vi.mock('./connect', () => ({
  connect: vi.fn(),
}))

let appName: string

describe('Subscribe wallets use case', () => {
  beforeEach(() => {
    appName = 'Web3 Hub'
  })

  it('should be able successfully subscribe in wallet to watch accounts', async () => {
    const mockAccounts = [{ address: '0x123', meta: { name: 'Mocked Wallet', source: 'web3hub' } }]
    const mockCallback: SubscribeCallback = vi.fn()

    vi.mocked(connect).mockResolvedValue([])
    vi.mocked(web3AccountsSubscribe).mockImplementation((callback) => {
      callback(mockAccounts)
      return Promise.resolve(() => {})
    })

    const unsubscribe = await subscribe(appName, mockCallback)

    expect(connect).toHaveBeenCalledWith(appName)
    expect(mockCallback).toHaveBeenCalledWith(mockAccounts)
    expect(unsubscribe).instanceOf(Function)
  })
})
