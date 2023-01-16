---
to: src/modules/<%= module %>/queries/<%= entity %>/<%= name %>/<%= name %>.controller.ts
---
<%QueryName = h.changeCase.pascal(name) + 'Query'
  ControllerName = h.changeCase.pascal(name) + 'Controller'
  FunctionName = h.changeCase.camel(name)
  DaoModel = h.changeCase.pascal(name) + 'DaoModel'
  OperationName = h.changeCase.sentence(name)
  RequestDto = h.changeCase.pascal(name) + 'RequestDto' %>
import { Controller, Get } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { Result } from '@libs/utils';
import { routes } from '@libs/routes';
import { ExceptionBase } from '@libs/base-classes';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { <%= QueryName %> } from '@modules/<%= module %>/queries';
import { <%= DaoModel %> } from '@modules/<%= module %>/database/read-model';
import { <%= RequestDto %> } from './<%= name %>.request.dto';

@ApiTags('<%= module %>/<%= entity %>')
@Controller()
export class <%= ControllerName %> {
  constructor(private readonly queryBus: QueryBus) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: '<%= OperationName %>' })
  @ApiOkResponse({ type: () => <%= DaoModel %> })
  @Get(routes.)
  async <%= FunctionName %>(): Promise<<%= DaoModel %>> {
    const query = new <%= QueryName %>({  });

    const result: Result<<%= DaoModel %>, ExceptionBase> =
      await this.queryBus.execute(query);

    return result.unwrap();
  }
}
