import { ExceptionBase } from '../base-classes/exception.base';
import { ExceptionCodes } from './exception.codes';

export class DomainException extends ExceptionBase {
  readonly code = ExceptionCodes.DOMAIN;
}
