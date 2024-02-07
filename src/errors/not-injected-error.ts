export class NotInjectedError extends Error {
  constructor() {
    super('Provider not injected yet')
  }
}
