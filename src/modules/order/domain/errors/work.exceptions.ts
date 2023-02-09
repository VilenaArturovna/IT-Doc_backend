import { ExceptionCodes } from '@libs/exceptions';
import { ExceptionBase } from '@libs/base-classes';

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
