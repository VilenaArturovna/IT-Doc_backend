import { JwtInterface } from '@lib/services/jwt-service/jwt.interface';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtServiceAdapter implements JwtInterface {
  constructor(private readonly jwtService: JwtService) {}

  // eslint-disable-next-line @typescript-eslint/ban-types
  sign(payload: string | Buffer | object): string {
    return this.jwtService.sign(payload);
  }
}
