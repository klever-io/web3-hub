export class EmptyMessageError extends Error {
  constructor() {
    super('Message to sign cannot be empty')
  }
}
