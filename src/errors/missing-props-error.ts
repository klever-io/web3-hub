export class MissingPropsError extends Error {
  constructor() {
    super('Missing props to build provider')
  }
}
