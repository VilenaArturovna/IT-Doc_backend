---
to: src/modules/<%= module %>/commands/<%= entity %>/<%= name %>/<%= name %>.command-handler.ts
---
<%HandlerName = h.changeCase.pascal(name) + 'CommandHandler'
  CommandName = h.changeCase.pascal(name) + 'Command'
  UnitOfWork = h.changeCase.pascal(module) + 'UnitOfWork' %>
import { CommandHandler } from '@nestjs/cqrs';
import { <%= CommandName %> } from './<%= name %>.command';
import { Result } from '@libs/utils';
import { ExceptionBase } from '@libs/base-classes';
import { CommandHandlerBase } from '@libs/base-classes/command-handler.base';
import { <%= UnitOfWork %> } from '@modules/<%= module %>/database/unit-of-work';

@CommandHandler(<%= CommandName %>)
export class <%= HandlerName %> extends CommandHandlerBase< <%= UnitOfWork %>, void> {
  constructor(unitOfWork: <%= UnitOfWork %>) {
    super(unitOfWork);
  }

  async handle(command: <%= CommandName %>): Promise<Result<void, ExceptionBase>> {}
}
