import { applyDecorators } from '@nestjs/common';
import { Transform } from 'class-transformer';

export const TransformToBooleanDecorator = () => {
  return applyDecorators(
    Transform(({ value }) => {
      return value === true || value === 'true';
    }),
  );
};
