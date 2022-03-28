---
to: src/modules/<%= module %>/commands/<%= name %>/<%= name %>.controller.ts
---
<%CommandName = h.changeCase.pascal(name) + 'Command'
  ControllerName = h.changeCase.pascal(name) + 'Controller'
  FunctionName = h.changeCase.camel(name)%>
import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { routes } from '@lib/routes';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { <%= CommandName %> } from '@modules/<%= module %>/commands/<%= name %>/<%= name %>.command';

@ApiTags('<%= module %>')
@Controller()
export class <%= ControllerName %> {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({ summary:  })
  @ApiOkResponse({ type:  })
  @
  async <%= FunctionName %>(): Promise<void> {
    const command = new <%= CommandName %>({  });

    const entity = await this.commandBus.execute(command);

    return
  }
}
