import { ExceptionBase } from '../base-classes/exception.base';
import { ExceptionCodes } from './exception.codes';

export class ValidationException extends ExceptionBase {
  readonly code = ExceptionCodes.VALIDATION;
}
