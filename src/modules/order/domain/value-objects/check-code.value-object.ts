import { ValueObject } from '@libs/base-classes/value-object.base';
import { DomainException } from '@libs/exceptions';
import { randomInt } from 'crypto';

export class CheckCodeVO extends ValueObject<string> {
  constructor(value: string) {
    super({ value });
    this.validate();
  }

  static min: 1000;
  static max: 9999;
  static generate() {
    const code = randomInt(CheckCodeVO.min, CheckCodeVO.max).toString();

    return new CheckCodeVO(code);
  }

  public get value() {
    return this.props.value;
  }

  private validate() {
    if (+this.value < CheckCodeVO.min || +this.value > CheckCodeVO.max) {
      throw new DomainException('Check code invalid');
    }
  }
}
