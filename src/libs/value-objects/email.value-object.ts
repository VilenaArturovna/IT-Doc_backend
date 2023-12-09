import { isEmail } from 'class-validator';

import { ValueObject } from '../base-classes/value-object.base';

export class EmailVO extends ValueObject<string> {
  constructor(value: string) {
    if (!isEmail(value)) {
      throw new Error(`Value ${value} is not a valid email address`);
    }

    super({ value });
  }

  public get value(): string {
    return this.props.value;
  }
}
