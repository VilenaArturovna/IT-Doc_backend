import { OrderModule } from '@modules/order/order.module';
import { StaffModule } from '@modules/staff/staff.module';
import { TaskModule } from '@modules/task/task.module';
import { WarehouseModule } from '@modules/warehouse/warehouse.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import {
  configuration,
  ObjectionConfigService,
  validationOptions,
  validationSchema,
} from '@src/common';
import { JwtAuthGuard } from '@src/common/guards/auth/jwt-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema: validationSchema,
      validationOptions: validationOptions,
    }),
    StaffModule,
    WarehouseModule,
    OrderModule,
    TaskModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    ObjectionConfigService,
  ],
})
export class AppModule {}
