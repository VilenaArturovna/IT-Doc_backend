import { ValueObject } from '../base-classes/value-object.base';

export class IdVO extends ValueObject<string> {
  constructor(value: string) {
    super({ value });
  }

  public get value(): string {
    return this.props.value;
  }
}
