import { ValidationError } from 'express-validator';
import { CustomError } from './custom-errors';

export class RequestValidationError extends CustomError {
  statusCode = 400;
  // private equivalent
  // errors: ValidationError[]
  // constructor( errors: ValidationError[]){
  //     super();
  //     this.errors = errors
  // }
  constructor( public errors: ValidationError[]){
    super('Invalid request parameters');

      // only because we are extending a built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);

  }

  serializeErrors() {
    return this.errors.map(error => {
      return { message: error.msg, field: error.param }
    })
  }
}