---
to: src/modules/<%= module %>/queries/<%= name %>/<%= name %>.controller.ts
---
<%QueryName = h.changeCase.pascal(name) + 'Query'
  ControllerName = h.changeCase.pascal(name) + 'Controller'
  FunctionName = h.changeCase.camel(name)%>
import { Controller, Get } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { routes } from '@lib/routes';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { <%= QueryName %> } from '@modules/<%= module %>/queries/<%= name %>/<%= name %>.query';

@ApiTags('<%= module %>')
@Controller()
export class <%= ControllerName %> {
  constructor(private readonly queryBus: QueryBus) {}

  @ApiBearerAuth()
  @ApiOperation({ summary:  })
  @ApiOkResponse({ type:  })
  @Get(routes.)
  async <%= FunctionName %>(): Promise<void> {
    const query = new <%= QueryName %>({  });

    const entity = await this.queryBus.execute(query);

    return
  }
}
