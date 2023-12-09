import { UuidVO } from '@libs/value-objects';
import { ICommand } from '@nestjs/cqrs';

export interface CommandProps<Payload> {
  payload: Payload;
  trxId?: string;
}

export abstract class CommandBase<Payload extends Record<string, any> = unknown>
  implements ICommand
{
  public readonly payload: Payload;
  public readonly trxId: string;

  constructor(props: CommandProps<Payload>) {
    Object.assign(this, props);
    this.trxId = props.trxId || UuidVO.generate().value;
  }
}
