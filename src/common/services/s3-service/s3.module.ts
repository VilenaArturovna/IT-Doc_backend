import { Module } from '@nestjs/common';
import { s3Provider } from '@src/common/services/s3-service/s3.provider';
import { S3Service } from '@src/common/services/s3-service/s3.service';

@Module({
  providers: [s3Provider],
  exports: [S3Service],
})
export class S3Module {}
