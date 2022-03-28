---
to: src/modules/<%= module %>/commands/<%= name %>/<%= name %>.command.ts
---
<%CommandName = h.changeCase.pascal(name) + 'Command'
  RequestDtoName = h.changeCase.pascal(name) + 'RequestDto' %>
import { CommandBase } from '@lib/base-classes/command.base';
import { <%= RequestDtoName %> } from '@modules/<%= module %>/commands/<%= name %>/<%= name %>.request.dto';

export class <%= CommandName %> extends CommandBase<<%= RequestDtoName %>> {}
