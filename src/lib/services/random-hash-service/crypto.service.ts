import { RandomHashInterface } from '@lib/services/random-hash-service/random-hash.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CryptoService implements RandomHashInterface {
  async createHash(): Promise<string> {
    const { createHash } = await import('crypto');
    return createHash('sha256').digest('hex');
  }
}
