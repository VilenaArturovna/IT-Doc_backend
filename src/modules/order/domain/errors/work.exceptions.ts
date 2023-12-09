import { ExceptionBase } from '@libs/base-classes';
import { ExceptionCodes } from '@libs/exceptions';

export class WorkHasEmptyFieldsError extends ExceptionBase {
  public readonly code = ExceptionCodes.VALIDATION;

  constructor(message = 'Work entity has empty fields') {
    super(message);
  }
}

export class WorkInvalidFieldError extends ExceptionBase {
  public readonly code = ExceptionCodes.VALIDATION;

  constructor(message = 'Invalid work field') {
    super(message);
  }
}
