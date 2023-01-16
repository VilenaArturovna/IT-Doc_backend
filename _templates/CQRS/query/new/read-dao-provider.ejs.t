---
to: src/modules/<%= module %>/database/read-model/<%= entity %>/<%= name %>/<%= name %>.read.dao.provider.ts
---
<%ReadDao = h.changeCase.pascal(name) + 'ReadDao'
  Provider = ReadDao + 'Provider'
  ObjectionReadDao = h.changeCase.pascal(name) + 'ObjectionReadDao'%>
import { Provider } from '@nestjs/common';

import { <%= ObjectionReadDao %> } from './<%= name %>.objection.read.dao';
import { <%= ReadDao %> } from './<%= name %>.read.dao';

export const <%= Provider %>: Provider<<%= ReadDao %>> =
  {
    provide: <%= ReadDao %>,
    useClass: <%= ObjectionReadDao %>,
  };
