import { NotInjectedError } from '@/errors';
import { NoAvailableAccountsError } from '@/errors/no-accounts-available-error';
import { NoProviderAvailableError } from '@/errors/no-provider-available-error';
import { web3Window } from '@/types';
import { availableWallets } from './available-wallets';
import type { CardanoUsedAddress } from './types';

export async function connect(wallet?: string): Promise<CardanoUsedAddress[]> {
  if (!web3Window.cardano)
    throw new NotInjectedError()

  let injectedWallet = wallet
  if (typeof injectedWallet === 'undefined') {
    for (const availableWallet of availableWallets) {
      if (web3Window.cardano[availableWallet])
        injectedWallet = availableWallet
    }
  }

  if (typeof injectedWallet === 'undefined')
    throw new NoProviderAvailableError()

  const api = await web3Window.cardano[injectedWallet].enable()

  const usedAddresses: CardanoUsedAddress[] = await api.getUsedAddresses()
  if (usedAddresses.length === 0)
    throw new NoAvailableAccountsError()

  return usedAddresses
}
