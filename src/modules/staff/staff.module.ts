import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigService, JwtServiceAdapter } from '@src/common';
import { GetStaffReadDao } from '@modules/staff/database/read-model';
import { readDaoProviders, repositories } from '@modules/staff/database';
import { queryControllers, queryHandlers } from '@modules/staff/queries';
import { commandControllers, commandHandlers } from '@modules/staff/commands';
import { JwtStrategy } from '@src/common/guards/auth/strategies/jwt.strategy';
import { StaffObjectionRepository } from '@modules/staff/database/repositories';

@Module({
  imports: [
    CqrsModule,
    JwtModule.registerAsync({ useClass: JwtConfigService }),
  ],
  controllers: [...queryControllers, ...commandControllers],
  providers: [
    JwtStrategy,
    JwtServiceAdapter,
    ...readDaoProviders,
    ...queryHandlers,
    ...repositories,
    ...commandHandlers,
  ],
  exports: [GetStaffReadDao, StaffObjectionRepository],
})
export class StaffModule {}
