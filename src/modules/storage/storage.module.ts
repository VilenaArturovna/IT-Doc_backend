import { queryControllers, queryHandlers } from '@modules/storage/queries';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { S3Module } from '@src/common/services/s3-service/s3.module';

@Module({
  imports: [CqrsModule, S3Module],
  providers: queryHandlers,
  controllers: queryControllers,
})
export class StorageModule {}
