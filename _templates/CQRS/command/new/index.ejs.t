---
to: src/modules/<%= module %>/commands/<%= entity %>/<%= name %>/index.ts
---
export * from './<%= name %>.command-handler';
export * from './<%= name %>.command';
export * from './<%= name %>.controller';
export * from './<%= name %>.request.dto';
