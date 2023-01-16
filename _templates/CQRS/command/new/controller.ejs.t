---
to: src/modules/<%= module %>/commands/<%= entity %>/<%= name %>/<%= name %>.controller.ts
---
<%CommandName = h.changeCase.pascal(name) + 'Command'
  ControllerName = h.changeCase.pascal(name) + 'Controller'
  FunctionName = h.changeCase.camel(name)
  OperationName = h.changeCase.sentence(name)
  RequestDto = h.changeCase.pascal(name) + 'RequestDto' %>
import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { routes } from '@libs/routes';
import { Result } from '@libs/utils';
import { ExceptionBase } from '@libs/base-classes';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { <%= CommandName %> } from './<%= name %>.command';
import { <%= RequestDto %> } from './<%= name %>.request.dto';

@ApiTags('<%= module %>/<%= entity %>')
@Controller()
export class <%= ControllerName %> {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: '<%= OperationName %>' })
  @ApiOkResponse({ type:  })
  @
  async <%= FunctionName %>(): Promise<void> {
    const command = new <%= CommandName %>({  });

    const result: Result<void, ExceptionBase> = await this.commandBus.execute(command);

    return result.unwrap()
  }
}
