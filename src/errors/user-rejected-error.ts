export class UserRejectedError extends Error {
  constructor() {
    super('You\'ve been rejected sign of transaction');
  }
}
