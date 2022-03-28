---
to: src/modules/<%= module %>/queries/<%= name %>/<%= name %>.query-handler.ts
---
<%HandlerName = h.changeCase.pascal(name) + 'QueryHandler'
  QueryName = h.changeCase.pascal(name) + 'Query' %>
import { QueryHandler } from '@nestjs/cqrs';
import { <%= QueryName %> } from '@modules/<%= module %>/queries/<%= name %>/<%= name %>.query';

@QueryHandler(<%= QueryName %>)
export class <%= HandlerName %> {
  constructor(private readonly repository: ) {}

  async execute(query: <%= QueryName %>): Promise<void> {}
}
