export class BalanceFetchError extends Error {
  constructor(message: Error) {
    super(`Cannot retrieve balance from account: ${message}`)
  }
}
