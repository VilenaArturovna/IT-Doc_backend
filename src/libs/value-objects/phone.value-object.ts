import { isPhoneNumber } from 'class-validator';

import { ValueObject } from '../base-classes/value-object.base';

export class PhoneVO extends ValueObject<string> {
  constructor(value: string) {
    if (!isPhoneNumber(value)) {
      throw new Error(`Value ${value} is not a valid phone number`);
    }
    super({ value });
  }

  public get value(): string {
    return this.props.value;
  }
}
