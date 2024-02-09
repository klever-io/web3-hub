export class NoAvailableAccountsError extends Error {
  constructor() {
    super('No accounts available')
  }
}
