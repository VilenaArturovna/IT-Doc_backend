import { ExceptionCodes } from '@libs/exceptions';
import { ExceptionBase } from '@libs/base-classes';

export class ClientHasEmptyFieldsError extends ExceptionBase {
  public readonly code = ExceptionCodes.VALIDATION;

  constructor(message = 'Client entity has empty fields') {
    super(message);
  }
}
