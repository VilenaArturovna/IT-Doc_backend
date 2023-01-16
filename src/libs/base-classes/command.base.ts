import { ICommand } from '@nestjs/cqrs';

export type CommandProps<Payload> = CommandBase<Payload>;
export abstract class CommandBase<Payload extends Record<string, any> = unknown>
  implements ICommand
{
  public readonly payload: Payload;

  constructor(props: CommandProps<Payload>) {
    Object.assign(this, props);
  }
}
