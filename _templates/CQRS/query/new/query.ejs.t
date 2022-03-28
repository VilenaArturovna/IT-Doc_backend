---
to: src/modules/<%= module %>/queries/<%= name %>/<%= name %>.command.ts
---
<%QueryName = h.changeCase.pascal(name) + 'Query'
  RequestDtoName = h.changeCase.pascal(name) + 'RequestDto' %>
import { QueryBase } from '@lib/base-classes/query.base';
import { <%= RequestDtoName %> } from '@modules/<%= module %>/queries/<%= name %>/<%= name %>.request.dto';

export class <%= QueryName %> extends QueryBase<<%= RequestDtoName %>> {}
