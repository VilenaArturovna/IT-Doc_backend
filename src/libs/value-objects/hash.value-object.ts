import { ValueObject } from '../base-classes/value-object.base';
import * as bcrypt from 'bcrypt';

export class HashVO extends ValueObject<string> {
  constructor(value: string) {
    super({ value });
  }

  public get value() {
    return this.props.value;
  }

  static async generateHash(value: string): Promise<HashVO> {
    const hash = await bcrypt.hash(value, parseInt(process.env.SALT));
    return new HashVO(hash);
  }
}
