import { ExceptionBase } from '../base-classes/exception.base';

class Err<T> {
  constructor(public error: T) {}
}

class Ok<T> {
  constructor(public value: T = undefined) {}
}

export class Result<TValue = null, TError = null> {
  private constructor(
    private _value: Ok<TValue> = null,
    private _error: Err<TError> = null,
  ) {}

  public get isErr(): boolean {
    return Boolean(this._error);
  }

  public static ok<TValue>(value?: TValue): Result<TValue> {
    return new Result(new Ok(value), null);
  }
  public static fail<TError>(error: TError): Result<null, TError> {
    return new Result(null, new Err(error));
  }

  mapValue<V>(cb: (value: TValue) => V) {
    return new Result(
      this._value ? new Ok(cb(this._value.value)) : null,
      this._error,
    );
  }
  mapError<V extends ExceptionBase>(cb: (value: TError) => V) {
    return new Result(
      this._value,
      this._error ? new Err(cb(this._error.error)) : null,
    );
  }

  public unwrap(): TValue {
    if (this.isErr) {
      throw this._error.error;
    }
    return this._value.value;
  }
}
