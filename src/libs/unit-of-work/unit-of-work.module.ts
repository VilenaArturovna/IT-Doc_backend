import { UnitOfWork } from '@libs/unit-of-work/unit-of-work';
import { UnitOfWorkProvider } from '@libs/unit-of-work/unit-of-work.provider';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  providers: [UnitOfWorkProvider],
  exports: [UnitOfWork],
})
export class UnitOfWorkModule {}
