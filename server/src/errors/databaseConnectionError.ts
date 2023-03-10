import { CustomError } from './customError';

export class DatabaseConnectionError extends CustomError {
  statusCode: number = 500;
  reason: string = 'Error connecting to database';
  constructor() {
    super('Error connecting to database');

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
