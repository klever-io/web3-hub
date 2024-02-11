import { MissingPropsError } from '@/errors/missing-props-error';
import { Network } from '@/networks';
import { SubstrateProvider } from '@/substrate';
import { PolkadotProvider } from '@/substrate/dot';
import { describe, expect, it } from 'vitest';

const appName = 'Web3 Hub'
const rpcProvider = 'wss://dot-provider'

describe('Kusama provider case', () => {
  it('should be throw missing props error', () => {
    expect(() => new PolkadotProvider({ appName } as any)).toThrow(MissingPropsError)
  })

  it('should be able to init new instance', () => {
    const provider = new PolkadotProvider({ appName, rpcProvider })

    expect(provider).toBeInstanceOf(PolkadotProvider)
    expect(provider).toBeInstanceOf(SubstrateProvider)
    expect(provider.network).toBe(Network.POLKADOT)
    expect(provider.appName).toBe(appName)
    expect(provider.rpcProvider).toBe(rpcProvider)
  })
})
