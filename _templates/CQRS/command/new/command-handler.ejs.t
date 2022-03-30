---
to: src/modules/<%= module %>/commands/<%= name %>/<%= name %>.command-handler.ts
---
<%HandlerName = h.changeCase.pascal(name) + 'CommandHandler'
  CommandName = h.changeCase.pascal(name) + 'Command' %>
import { CommandHandler } from '@nestjs/cqrs';
import { <%= CommandName %> } from '@modules/<%= module %>/commands/<%= name %>/<%= name %>.command';

@CommandHandler(<%= CommandName %>)
export class <%= HandlerName %> {
  constructor(private readonly repository: ) {}

  async execute(command: <%= CommandName %>): Promise<void> {}
}
