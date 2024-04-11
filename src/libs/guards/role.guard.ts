import { Role } from '@modules/staff/types';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Type,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '@src/common';

export function RoleGuard(roles: Role[]): Type<CanActivate> {
  @Injectable()
  class Guard implements CanActivate {
    private readonly roles: Role[];

    constructor(private readonly reflector: Reflector) {
      this.roles = roles || [];
    }

    canActivate(context: ExecutionContext): boolean {
      const req = context.switchToHttp().getRequest();

      const isPublic = this.reflector.getAllAndOverride<boolean>(
        IS_PUBLIC_KEY,
        [context.getHandler(), context.getClass()],
      );
      if (isPublic) {
        return true;
      }

      return this.roles.includes(req.user.role);
    }
  }

  return Guard;
}
