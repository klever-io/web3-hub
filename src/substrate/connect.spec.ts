import { NotInjectedError } from '@/errors';
import { NoAvailableAccountsError } from '@/errors/no-accounts-available-error';
import { NoProviderAvailableError } from '@/errors/no-provider-available-error';
import * as extension from '@polkadot/extension-dapp';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { connect } from './connect';

vi.mock('@polkadot/extension-dapp', () => ({
  web3Enable: vi.fn(),
  web3Accounts: vi.fn(),
}))

let appName: string

describe('Connect wallet use case', () => {
  beforeEach(() => {
    vi.resetAllMocks()

    appName = 'Web3 Hub';
    (window as any).injectedWeb3 = {}
  })

  it('should be able to throw error when window dont have web3 object', async () => {
    delete (window as any).injectedWeb3

    await expect(connect(appName)).rejects.toThrow(NotInjectedError)
  })

  it('should be able to throw error when have no providers', async () => {
    vi.mocked(extension.web3Enable).mockResolvedValueOnce([])

    await expect(connect(appName)).rejects.toThrow(NoProviderAvailableError)
  })

  it('should be able to throw error when have no accounts', async () => {
    vi.mocked(extension.web3Enable).mockResolvedValueOnce([{} as any])
    vi.mocked(extension.web3Accounts).mockResolvedValueOnce([])
    await expect(connect(appName)).rejects.toThrow(NoAvailableAccountsError)
  })

  it('should be able to return account', async () => {
    const mockedAccounts = [{ address: '0x123', meta: { name: 'Mocked Wallet', source: 'web3hub' } }]

    vi.mocked(extension.web3Enable).mockResolvedValueOnce([{} as any])
    vi.mocked(extension.web3Accounts).mockResolvedValueOnce(mockedAccounts)

    const accounts = await connect(appName)
    expect(accounts).toEqual(mockedAccounts)
  })
})
