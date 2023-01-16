import { ExceptionCodes } from '@libs/exceptions';
import { ExceptionBase } from '@libs/base-classes';

export class ServiceHasEmptyFieldsError extends ExceptionBase {
  public readonly code = ExceptionCodes.VALIDATION;

  constructor(message = 'Warehouse item entity has empty fields') {
    super(message);
  }
}

export class ServiceInvalidFieldError extends ExceptionBase {
  public readonly code = ExceptionCodes.VALIDATION;

  constructor(message = 'Invalid warehouse item field') {
    super(message);
  }
}
