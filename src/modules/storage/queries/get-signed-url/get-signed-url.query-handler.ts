import { ExceptionBase } from '@libs/base-classes';
import { Result } from '@libs/utils';
import { QueryHandler } from '@nestjs/cqrs';
import { S3Service } from '@src/common/services/s3-service/s3.service';

import { GetSignedUrlQuery } from './get-signed-url.query';

@QueryHandler(GetSignedUrlQuery)
export class GetSignedUrlQueryHandler {
  constructor(private readonly s3Service: S3Service) {}

  async execute(
    query: GetSignedUrlQuery,
  ): Promise<Result<string, ExceptionBase>> {
    const res = await this.s3Service.getSignedUrl(query.params.fileName);
    return Result.ok(res);
  }
}
