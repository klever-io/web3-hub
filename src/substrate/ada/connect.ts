import { NotInjectedError } from '@/errors';
import { NoAvailableAccountsError } from '@/errors/no-accounts-available-error';
import { NoProviderAvailableError } from '@/errors/no-provider-available-error';
import { Account } from '@/types';

interface CardanoWeb extends Window {
  cardano: {
    [key: string]: CardanoExtension;
  };
}

interface CardanoInitializedExtension extends CardanoWeb {
  getBalance: () => Promise<string>
  getUsedAddresses: () => Promise<string[]>
  getUnusedAddresses: () => Promise<string[]>
}

interface CardanoExtension {
  apiVersion: string;
  enable: () => Promise<CardanoInitializedExtension>;
  isEnabled: () => Promise<boolean>;
  icon: string;
  name: string;
}


const CardanoWindow: CardanoWeb = (window as any)

export async function connect(appName: string): Promise<Account[]> {
  if (!(window as any).cardano)
    throw new NotInjectedError()

  const isInjected = CardanoWindow.cardano[appName].name === appName
  if (!isInjected)
    throw new NoProviderAvailableError()

  const api: CardanoInitializedExtension = await CardanoWindow.cardano[appName].enable()

  const rawAccounts = await api.getUsedAddresses()
  if (rawAccounts.length === 0)
    throw new NoAvailableAccountsError()

  const accounts = rawAccounts.map((account) => ({
    address: account
  }))

  return accounts
}
