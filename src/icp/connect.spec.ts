import { NoAvailableAccountsError, NoProviderAvailableError } from '@/errors';
import { UserRejectedError } from '@/errors/user-rejected-error';
import { describe, expect, it, vi } from 'vitest';
import { web3Window } from '..';
import { connect } from './connect';

vi.mock('@/types', () => ({
  web3Window: {
    ic: {
      plug: {
        requestConnect: vi.fn(),
        principalId: 'wil-123',
      },
    },
  },
}))

const principalId = 'wil-123';

describe('Connect case', () => {
  it('should successfully connects and retrieves an account', async () => {
    web3Window.ic.plug.requestConnect.mockResolvedValue(true)
    const account = await connect()

    expect(account).toEqual(principalId)
  })

  it('should throws error when no provider is available', async () => {
    web3Window.ic.plug.requestConnect.mockResolvedValue(false)

    await expect(connect()).rejects.toThrow(NoProviderAvailableError)
  })

  it('should throws error when no accounts are available', async () => {
    web3Window.ic.plug.requestConnect.mockResolvedValue(true)
    web3Window.ic.plug.principalId = undefined;

    await expect(connect()).rejects.toThrow(NoAvailableAccountsError)
  })

  it('should throws error when the user rejects the connection', async () => {
    web3Window.ic.plug.requestConnect.mockRejectedValue(new Error('The agent creation was rejected'))

    await expect(connect()).rejects.toThrow(UserRejectedError)
  })
})
