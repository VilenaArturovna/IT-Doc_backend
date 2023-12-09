import { CommandBase } from '@libs/base-classes/command.base';
import { ExceptionBase } from '@libs/base-classes/exception.base';
import { UnitOfWorkPort } from '@libs/unit-of-work';
import { Result } from '@libs/utils/result.util';

export abstract class CommandHandlerBase<
  UnitOfWork extends UnitOfWorkPort,
  ReturnType,
> {
  protected readonly unitOfWork: UnitOfWork;

  protected constructor(unitOfWork: UnitOfWork) {
    this.unitOfWork = unitOfWork;
  }

  public abstract handle(
    command: CommandBase,
  ): Promise<Result<ReturnType, ExceptionBase>>;

  public async execute(
    command: CommandBase,
  ): Promise<Result<ReturnType, ExceptionBase>> {
    const trxId = command.trxId;

    await this.unitOfWork.startFromId(trxId);

    return this.unitOfWork.execute(trxId, async () => {
      return this.handle(command);
    });
  }
}
