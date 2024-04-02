import { commandControllers, commandHandlers } from '@modules/staff/commands';
import { readDaoProviders } from '@modules/staff/database';
import { GetStaffReadDao } from '@modules/staff/database/read-model';
import { StaffUnitOfWork } from '@modules/staff/database/unit-of-work';
import { queryControllers, queryHandlers } from '@modules/staff/queries';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigService, JwtServiceAdapter } from '@src/common';
import { JwtStrategy } from '@src/common/guards/auth/strategies/jwt.strategy';

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
