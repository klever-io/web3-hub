export class NoSignerAvailableError extends Error {
  constructor() {
    super('No one signer available for chosen address')
  }
}
