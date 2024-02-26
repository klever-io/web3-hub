import { NotInjectedError } from '@/errors';
import { NoAvailableAccountsError } from '@/errors/no-accounts-available-error';
import { web3Window } from '@/types';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { connect } from './connect';

describe('Connect wallet use case', () => {
  beforeEach(() => {
    vi.resetAllMocks()

    web3Window.kleverWeb = {
      initialize: vi.fn(),
      getWalletAddress: vi.fn(() => 'mockedAddress'),
    }
  })

  it('should be able to throw error when window dont have kleverWeb object', async () => {
    delete web3Window.kleverWeb

    await expect(connect()).rejects.toThrow(NotInjectedError)
  })

  it('should be able to throw error when have no accounts', async () => {
    vi.mocked(web3Window.kleverWeb.getWalletAddress).mockImplementation(() => undefined)

    await expect(connect()).rejects.toThrow(NoAvailableAccountsError)
  })

  it('should be able to return account', async () => {
    const account = await connect();

    expect(account).toEqual('mockedAddress');
  })
})
