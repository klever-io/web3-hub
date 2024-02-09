import { web3AccountsSubscribe } from '@polkadot/extension-dapp';
import { connect } from './connect';
import type { SubstrateAccountWithMeta, UnsubscribeFunction } from './types';

export type SubscribeCallback = (injectedAccounts: SubstrateAccountWithMeta[]) => Promise<void>

export async function subscribe(appName: string, callback: SubscribeCallback): Promise<UnsubscribeFunction> {
  await connect(appName)

  const unsubscribe = await web3AccountsSubscribe(async (accounts) => {
    await callback(accounts)
  })

  return unsubscribe
}
