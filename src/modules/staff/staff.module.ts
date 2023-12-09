import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigService, JwtServiceAdapter } from '@src/common';
import { GetStaffReadDao } from '@modules/staff/database/read-model';
import { readDaoProviders } from '@modules/staff/database';
import { queryControllers, queryHandlers } from '@modules/staff/queries';
import { commandControllers, commandHandlers } from '@modules/staff/commands';
import { JwtStrategy } from '@src/common/guards/auth/strategies/jwt.strategy';
import { StaffUnitOfWork } from '@modules/staff/database/unit-of-work';

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
    ...commandHandlers,
    StaffUnitOfWork,
  ],
  exports: [GetStaffReadDao],
})
export class StaffModule {}
