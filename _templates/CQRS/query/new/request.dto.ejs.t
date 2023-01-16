---
to: src/modules/<%= module %>/queries/<%= entity %>/<%= name %>/<%= name %>.request.dto.ts
---
<%RequestDtoName = h.changeCase.pascal(name) + 'RequestDto' %>
import { ApiPropertyOptional } from '@nestjs/swagger';

export class <%= RequestDtoName %> {}
