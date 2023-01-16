---
to: src/modules/<%= module %>/queries/<%= entity %>/<%= name %>/index.ts
---
export * from './<%= name %>.controller';
export * from './<%= name %>.query';
export * from './<%= name %>.query-handler';
export * from './<%= name %>.request.dto';
