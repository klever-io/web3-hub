import { Network } from '@/networks';
import { SubstrateProvider } from '@/substrate';
import { KusamaProvider } from '@/substrate/ksm';
import { describe, expect, it } from 'vitest';

const appName = 'Web3 Hub'
const rpcProvider = 'wss://ksm-provider'

describe('Kusama provider case', () => {
  it('should be able to init new instance', () => {
    const provider = new KusamaProvider({ appName, rpcProvider })

    expect(provider).toBeInstanceOf(KusamaProvider)
    expect(provider).toBeInstanceOf(SubstrateProvider)
    expect(provider.network).toBe(Network.KUSAMA)
    expect(provider.appName).toBe(appName)
    expect(provider.rpcProvider).toBe(rpcProvider)
  })
})
