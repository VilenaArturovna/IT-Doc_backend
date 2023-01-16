import { ExceptionBase } from '../base-classes/exception.base';
import { ExceptionCodes } from './exception.codes';

export class ConflictException extends ExceptionBase {
  readonly code = ExceptionCodes.CONFLICT;
}
