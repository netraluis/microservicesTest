import { CustomError } from './custom-errors';

export class NotAuthorizedError extends CustomError {
  statusCode = 401;

  constructor(){
    super('Not authorized');

    // extending build in function
    Object.setPrototypeOf(this, NotAuthorizedError.prototype)
  }

  serializeErrors(){
    return [{ message: 'Not authorized' }]
  }
}