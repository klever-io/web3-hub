import { NotInjectedError } from '@/errors';
import { NoAvailableAccountsError } from '@/errors/no-accounts-available-error';
import { NoProviderAvailableError } from '@/errors/no-provider-available-error';
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp';
import type { SubstrateAccountWithMeta } from './types';

export async function connect(appName: string): Promise<SubstrateAccountWithMeta[]> {
  if (!(window as any).injectedWeb3)
    throw new NotInjectedError()

  const isInjected = await web3Enable(appName)
  if (!isInjected || isInjected.length === 0)
    throw new NoProviderAvailableError()

  const accounts = await web3Accounts() as SubstrateAccountWithMeta[]
  if (accounts.length === 0)
    throw new NoAvailableAccountsError()

  return accounts
}
