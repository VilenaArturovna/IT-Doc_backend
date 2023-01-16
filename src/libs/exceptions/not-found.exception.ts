import { ExceptionBase } from '../base-classes/exception.base';
import { ExceptionCodes } from './exception.codes';

export class NotFoundException extends ExceptionBase {
  readonly code = ExceptionCodes.NOT_FOUND;
}
