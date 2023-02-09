import { Module } from '@nestjs/common';
import { StaffModule } from '@modules/staff/staff.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '@src/common/guards/auth/jwt-auth.guard';
import { WarehouseModule } from '@modules/warehouse/warehouse.module';
import {
  configuration,
  ObjectionConfigService,
  validationOptions,
  validationSchema,
} from '@src/common';
import { OrderModule } from '@modules/order/order.module';

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
