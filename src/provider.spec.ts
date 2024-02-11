import { describe, expect, it } from 'vitest';
import { InvalidNetworkError } from './errors/invalid-network-error';
import { Network, type NetworkData } from './networks';
import { Provider } from './provider';
import { SubstrateProvider } from './substrate';

describe('Provider case', () => {
  it('should be able to throw error of invalid network when pass key', () => {
    const network = 'invalid' as any

    expect(() => new Provider(network)).toThrow(InvalidNetworkError)
  })

  it('should be able to throw error of invalid network when pass id', () => {
    const networkData: NetworkData = {
      id: -1,
      decimals: -1,
      name: 'Invalid network',
    }

    expect(() => new Provider(networkData)).toThrow(InvalidNetworkError)
  })

  it('should be able to return valid substrate provider', () => {
    const appName = 'Web3 Hub'
    const rpcProvider = 'wss://rpc-provider'

    const dotProvider = new Provider(Network.POLKADOT).build({ appName, rpcProvider })
    expect(dotProvider).toBeInstanceOf(SubstrateProvider)

    const ksmProvider = new Provider(Network.KUSAMA).build({ appName, rpcProvider })
    expect(ksmProvider).toBeInstanceOf(SubstrateProvider)
  })
})
