---
to: src/modules/<%= module %>/commands/<%= entity %>/<%= name %>/<%= name %>.command.ts
---
<%CommandName = h.changeCase.pascal(name) + 'Command'
  RequestDtoName = h.changeCase.pascal(name) + 'RequestDto' %>
import { CommandBase } from '@libs/base-classes';
import { <%= RequestDtoName %> } from './<%= name %>.request.dto';

export class <%= CommandName %> extends CommandBase<<%= RequestDtoName %>> {}
