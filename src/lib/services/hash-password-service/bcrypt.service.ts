import { HashPasswordInterface } from '@lib/services/hash-password-service/hash-password.interface';
import * as bcrypt from 'bcrypt';

export class BcryptService implements HashPasswordInterface {
  async compare(decrypted: string, encrypted: string): Promise<boolean> {
    return await bcrypt.compare(decrypted, encrypted);
  }

  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
}
