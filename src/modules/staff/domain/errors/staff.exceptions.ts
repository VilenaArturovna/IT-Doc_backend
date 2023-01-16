import { ExceptionCodes } from '@libs/exceptions';
import { ExceptionBase } from '@libs/base-classes';

export class StaffHasEmptyFieldsError extends ExceptionBase {
  public readonly code = ExceptionCodes.VALIDATION;

  constructor(message = 'Staff entity has empty fields') {
    super(message);
  }
}

export class StaffInvalidFieldError extends ExceptionBase {
  public readonly code = ExceptionCodes.VALIDATION;

  constructor(message = 'Invalid staff field') {
    super(message);
  }
}
