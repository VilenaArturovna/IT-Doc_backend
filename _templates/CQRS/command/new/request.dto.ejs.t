---
to: src/modules/<%= module %>/commands/<%= entity %>/<%= name %>/<%= name %>.request.dto.ts
---
<%RequestDtoName = h.changeCase.pascal(name) + 'RequestDto' %>
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class <%= RequestDtoName %> {}
