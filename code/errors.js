export class NotImplementedError extends Error {
  constructor(msg="Not Implemented!", ...rest) {
    super(msg, ...rest);
  }
}