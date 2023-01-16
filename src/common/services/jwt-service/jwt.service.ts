import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtInterface } from '@src/common/services/jwt-service/jwt.interface';

@Injectable()
export class JwtServiceAdapter implements JwtInterface {
  constructor(private readonly jwtService: JwtService) {}

  sign(payload: string | Buffer | Record<string, unknown>): string {
    return this.jwtService.sign(payload);
  }
}
