import { ExceptionBase } from '../base-classes/exception.base';
import { ExceptionCodes } from './exception.codes';

export class ForbiddenException extends ExceptionBase {
  readonly code = ExceptionCodes.FORBIDDEN;
}
