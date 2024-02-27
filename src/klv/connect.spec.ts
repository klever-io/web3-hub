import { NotInjectedError } from '@/errors';
import { NoAvailableAccountsError } from '@/errors/no-accounts-available-error';
import { web3Window } from '@/types';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { connect } from './connect';
import type { KleverHub } from './types';

const defaultKleverHub: Required<KleverHub> = {
  account: {
    address: 'my_address',
    chain: 1,
    name: 'My wallet',
    provider: 'kleverWeb',
  },
  accountChangeListeners: [],
  blockChainChangeListeners: [],
  communication: { waitingResponse: false },
  isConnected: true,
  isKleverHub: true,
  name: 'kleverHub',
  initialize: vi.fn(),
}

describe('Connect wallet use case', () => {
  beforeEach(() => {
    vi.resetAllMocks()

    web3Window.kleverHub = defaultKleverHub
  })

  it('should be able to return account', async () => {
    const account = await connect();

    expect(account.address).toEqual(defaultKleverHub.account.address);
    expect(account.name).toEqual(defaultKleverHub.account.name);
  })

  it('should be able to throw error when window dont have kleverHub object', async () => {
    delete web3Window.kleverHub

    await expect(connect()).rejects.toThrow(NotInjectedError)
  })

  it('should be able to throw error when have no accounts', async () => {
    web3Window.kleverHub = { ...defaultKleverHub, account: undefined }

    await expect(connect()).rejects.toThrow(NoAvailableAccountsError)
  })
})
