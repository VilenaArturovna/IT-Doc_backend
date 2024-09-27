import { Currency, MoneyVO } from '@libs/value-objects/money.value-object';
import { isInstance } from 'class-validator';

describe('MoneyVO', () => {
  test('should be an error when value is invalid string', () => {
    const invalidString = () => {
      const money = new MoneyVO({ amount: 'test', currency: Currency.RUB });
    };

    expect(invalidString).toThrow();
  });

  test('should be value-object', () => {
    const sut = MoneyVO.toVO({ amount: '90' });

    expect(isInstance(sut, MoneyVO)).toBe(true);
  });

  test('should be zero', () => {
    const sut = MoneyVO.ZERO();

    expect(+sut.amount).toBe(0);
  });
});
