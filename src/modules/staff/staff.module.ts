import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigService, JwtServiceAdapter } from '@src/common';
import { GetStaffReadDao } from '@modules/staff/database/read-model';
import { readDaoProviders, repositories } from '@modules/staff/database';
import { queriesControllers, queryHandlers } from '@modules/staff/queries';
import { commandControllers, commandHandlers } from '@modules/staff/commands';

@Module({
  imports: [
    CqrsModule,
    JwtModule.registerAsync({ useClass: JwtConfigService }),
  ],
  controllers: [...queriesControllers, ...commandControllers],
  providers: [
    JwtServiceAdapter,
    ...readDaoProviders,
    ...queryHandlers,
    ...repositories,
    ...commandHandlers,
  ],
  exports: [GetStaffReadDao],
})
export class StaffModule {}
