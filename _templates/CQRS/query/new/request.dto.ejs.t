---
to: src/modules/<%= module %>/queries/<%= name %>/<%= name %>.request.dto.ts
---
<%RequestDtoName = h.changeCase.pascal(name) + 'RequestDto' %>
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class <%= RequestDtoName %> {}
