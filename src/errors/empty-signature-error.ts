export class EmptySignatureError extends Error {
  constructor() {
    super('Signature cannot be empty')
  }
}
