import { ExceptionBase } from '@libs/base-classes';
import { ExceptionCodes } from '@libs/exceptions';

export class ClientHasEmptyFieldsError extends ExceptionBase {
  public readonly code = ExceptionCodes.VALIDATION;

  constructor(message = 'Client entity has empty fields') {
    super(message);
  }
}
