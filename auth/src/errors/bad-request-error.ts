import { CustomError } from './custom-errors';

export class BadRequestError extends CustomError {
  constructor(public message: string){
    super(message);

    Object.setPrototypeOf(this, BadRequestError.prototype )
  }
  statusCode = 400
  serializeErrors(){
    return [{message: this.message}]
  }
}