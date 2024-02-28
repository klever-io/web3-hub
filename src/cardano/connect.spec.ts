import { NotInjectedError } from '@/errors';
import { NoAvailableAccountsError } from '@/errors/no-accounts-available-error';
import { NoProviderAvailableError } from '@/errors/no-provider-available-error';
import { web3Window } from '@/types';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { connect } from './connect';

describe('Connect wallet use case', () => {
  const cardanoWebMock = {
    yoroi: {
      icon: 'data:image/svg',
      name: 'yoroi',
      apiVersion: '0.3.0',
      enable: vi.fn(),
      isEnabled: vi.fn(),
    },
  }
  beforeEach(() => {
    delete web3Window.cardano
    web3Window.cardano = cardanoWebMock
  })
  it('should be able to throw error when window dont have Cardano object', async () => {
    delete web3Window.cardano
    await expect(connect()).rejects.toThrow(NotInjectedError)
  })

  it('should be able to throw error when have no providers', async () => {
    web3Window.cardano = {}
    await expect(connect()).rejects.toThrow(NoProviderAvailableError)
  })
})
