import { Module } from '@nestjs/common';
import { StaffModule } from '@modules/staff/staff.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '@src/common/guards/auth/jwt-auth.guard';
import { WarehouseModule } from '@modules/warehouse/warehouse.module';
import { ObjectionConfigService } from '@src/common';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    StaffModule,
    WarehouseModule,
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
