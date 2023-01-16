---
to: src/modules/<%= module %>/database/read-model/<%= entity %>/<%= name %>/index.ts
---
export * from './<%= name %>.read.dao';
export * from './<%= name %>.read.dao.provider';
export * from './<%= name %>.objection.read.dao';
