---
to: src/modules/<%= module %>/commands/<%= entity %>/<%= name %>/<%= name %>.command-handler.ts
---
<%HandlerName = h.changeCase.pascal(name) + 'CommandHandler'
  CommandName = h.changeCase.pascal(name) + 'Command'
  ObjectionRepository = h.changeCase.pascal(entity) + 'ObjectionRepository' %>
import { CommandHandler } from '@nestjs/cqrs';
import { <%= CommandName %> } from './<%= name %>.command';
import { <%= ObjectionRepository %> } from '@modules/<%= module %>/database/repositories';
import { Result } from '@libs/utils';
import { ExceptionBase } from '@libs/base-classes';

@CommandHandler(<%= CommandName %>)
export class <%= HandlerName %> {
  constructor(private readonly repository: <%= ObjectionRepository %>) {}

  async execute(command: <%= CommandName %>): Promise<Result<void, ExceptionBase>> {}
}
