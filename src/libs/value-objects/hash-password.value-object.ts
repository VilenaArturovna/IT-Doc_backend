import { ValueObject } from '../base-classes/value-object.base';
import * as bcrypt from 'bcrypt';

export class HashPasswordVO extends ValueObject<string> {
  constructor(value: string) {
    super({ value });
  }

  get value(): string {
    return this.props.value;
  }

  static async hash(value: string): Promise<HashPasswordVO> {
    const hash = await bcrypt.hash(value, parseInt(process.env.SALT));

    return new HashPasswordVO(hash);
  }

  public async compare(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.value);
  }
}
