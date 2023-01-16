import { IdVO } from './id.value-object';
import { v4 as uuid } from 'uuid';
import { isUUID } from 'class-validator';

export class UuidVO extends IdVO {
  constructor(value: string) {
    if (!isUUID(value)) {
      throw new Error(`Value ${value} is not a valid UUID`);
    }
    super(value);
  }

  public static generate(): UuidVO {
    return new UuidVO(uuid());
  }

  public get value(): string | null {
    return this.props.value;
  }

  public isEqualTo(id: UuidVO): boolean {
    return this.props.value === id.value;
  }
}
