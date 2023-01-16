import { ValueObject } from '@libs/base-classes/value-object.base';
import { isURL } from 'class-validator';

export class UrlVO extends ValueObject<string> {
  constructor(value: string) {
    if (!isURL(value)) {
      throw new Error(`Value ${value} is not a valid url`);
    }
    super({ value });
  }

  public get value(): string {
    return this.props.value;
  }
}
