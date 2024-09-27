import { PhoneVO } from '@libs/value-objects/phone.value-object';

describe('PhoneVO', () => {
  test('should be an error when value is invalid string', () => {
    const invalidString = () => {
      new PhoneVO('test');
    };

    expect(invalidString).toThrow();
  });
});
