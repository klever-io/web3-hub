export class EmptyAddressError extends Error {
  constructor() {
    super('Address cannot be empty')
  }
}
