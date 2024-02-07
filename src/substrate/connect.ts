import type { Network } from '@/entities/types'

export function connect(network: Network) {
  return Promise.resolve(`${network} 0x123`)
}
