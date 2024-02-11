import { describe, expect, it } from 'vitest';
import { InvalidNetworkError } from './errors/invalid-network-error';
import { Networks, getNetworkKeyById, isValidNetwork } from './networks';

describe('Networks object struct', () => {
  it('contains the expected networks with correct properties', () => {
    expect(Networks).toHaveProperty('dot')
    expect(Networks.dot).toEqual(expect.objectContaining({
      id: expect.any(Number),
      name: expect.any(String),
      decimals: expect.any(Number),
    }))
  })
})

describe('isValidNetwork function', () => {
  it('should be able to return result of invalid network', () => {
    const key = 'invalid'

    expect(isValidNetwork(key)).toBeFalsy()
  })

  it('should be able to return result of valid network', () => {
    const key = 'dot'

    expect(isValidNetwork(key)).toBeTruthy()
  })
})

describe('getNetworkKeyById function', () => {
  it('should be able to return the correct key for valid id', () => {
    expect(getNetworkKeyById(1)).toBe('dot')
  })

  it('should be able to return error when pass invalid id', () => {
    expect(() => getNetworkKeyById(-1)).toThrow(InvalidNetworkError)
  })
})
