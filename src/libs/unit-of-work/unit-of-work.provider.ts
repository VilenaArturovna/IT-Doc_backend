import { UnitOfWork } from '@libs/unit-of-work/unit-of-work';
import { UnitOfWorkObjection } from '@libs/unit-of-work/unit-of-work.objection';
import { Provider } from '@nestjs/common';

export const UnitOfWorkProvider: Provider<UnitOfWork> = {
  provide: UnitOfWork,
  useClass: UnitOfWorkObjection,
};
