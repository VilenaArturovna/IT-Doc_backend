import { EmailVO } from "@libs/value-objects/email.value-object";

describe('EmailVO', () => {
  test('should be an error when value is invalid string', () => {
    const invalidString = () => {
      new EmailVO('test');
    };

    expect(invalidString).toThrow();
  });
})
