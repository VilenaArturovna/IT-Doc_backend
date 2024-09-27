import { UrlVO } from '@libs/value-objects/url.value-object';

describe('UrlVO', () => {
  test('should be an error when value is invalid string', () => {
    const invalidString = () => {
      new UrlVO('test');
    };

    console.log(isNaN(+'jh'));

    expect(invalidString).toThrow();
  });
});
