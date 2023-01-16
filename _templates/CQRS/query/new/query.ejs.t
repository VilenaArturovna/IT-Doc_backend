---
to: src/modules/<%= module %>/queries/<%= entity %>/<%= name %>/<%= name %>.query.ts
---
<%QueryName = h.changeCase.pascal(name) + 'Query'
  RequestDtoName = h.changeCase.pascal(name) + 'RequestDto' %>
import { QueryBase } from '@libs/base-classes';
import { <%= RequestDtoName %> } from '@modules/<%= module %>/queries';

export class <%= QueryName %> extends QueryBase<<%= RequestDtoName %>> {}
