export class MinAmountError extends Error {
  constructor() {
    super('Provided amount is too low for this operation');
  }
}
