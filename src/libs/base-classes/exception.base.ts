import { ExceptionCodes } from '../exceptions';

export interface SerializedException {
  message: string;
  code: ExceptionCodes;
}

export abstract class ExceptionBase extends Error {
  abstract code: ExceptionCodes;

  constructor(message: string) {
    super(message);
  }

  public toJSON(): SerializedException {
    return {
      message: this.message,
      code: this.code,
    };
  }
}
