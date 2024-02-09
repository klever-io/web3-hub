export class NoProviderAvailableError extends Error {
  constructor() {
    super('No provider available or installed')
  }
}
