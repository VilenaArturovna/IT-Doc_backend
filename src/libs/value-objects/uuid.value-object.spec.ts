import { UuidVO } from '@libs/value-objects/uuid.value-object';
import { isUUID } from 'class-validator';

describe('UuidVO', () => {
  test('should be an error when value is invalid string', () => {
    const invalidString = () => {
      new UuidVO('test');
    };

    expect(invalidString).toThrow();
  });

  test('should be generated uuid', () => {
    const sut = UuidVO.generate();

    expect(isUUID(sut.value)).toBe(true);
  });
});
