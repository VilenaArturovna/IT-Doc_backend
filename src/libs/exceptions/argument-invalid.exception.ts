import { ExceptionBase } from '@libs/base-classes';

import { ExceptionCodes } from './exception.codes';

export class ArgumentInvalidException extends ExceptionBase {
  readonly code = ExceptionCodes.ARGUMENT_INVALID;
}
