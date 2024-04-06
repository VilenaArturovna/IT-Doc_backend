import { ArgumentInvalidException } from '@libs/exceptions';
import { Currency, MoneyVO } from '@libs/value-objects';

export class MoneyCalculator {
  private readonly currency: Currency;
  private integerPart: number;
  private floatPart: number;

  constructor(currency: Currency);
  constructor(currency: Currency, amount: string);
  constructor(currency: Currency, amount?: string) {
    new MoneyVO({
      currency: currency,
      amount: amount ? amount : '0.00',
    });

    this.currency = currency;

    if (amount) {
      const parts = this.getAmountParts(amount);

      this.integerPart = parts.integerPart;
      this.floatPart = parts.floatPart;
    } else {
      this.integerPart = 0;
      this.floatPart = 0;
    }
  }

  public static fromMoney(money: MoneyVO): MoneyCalculator {
    return new MoneyCalculator(money.currency, money.amount);
  }

  public static fromRUB(): MoneyCalculator {
    return new MoneyCalculator(Currency.RUB);
  }

  public divide(divisor: number): this {
    if (divisor == 0) {
      throw new ArgumentInvalidException('Divisor cannot be equal to zero');
    }
    const amount = Number(this.result().amount);
    const result = amount / divisor;
    const parts = this.getAmountParts(result.toFixed(2));
    this.integerPart = parts.integerPart;
    this.floatPart = parts.floatPart;

    return this;
  }

  public multiply(multiplier: number): this {
    if (multiplier < 0) {
      throw new ArgumentInvalidException('Multiplier cannot be less than 0');
    }

    const amount = Number(this.result().amount);
    const result = amount * multiplier;
    const parts = this.getAmountParts(result.toFixed(2));
    this.integerPart = parts.integerPart;
    this.floatPart = parts.floatPart;

    return this;
  }

  public multiplyOnPercent(multiplier: number): this {
    if (multiplier < 0) {
      throw new ArgumentInvalidException('Multiplier cannot be less than 0');
    }

    const amount = Number(this.result().amount);
    const result = (amount * multiplier) / 100;
    const parts = this.getAmountParts(result.toFixed(2));
    this.integerPart = parts.integerPart;
    this.floatPart = parts.floatPart;

    return this;
  }

  public roundUp(): this {
    this.floatPart = 99;
    return this;
  }

  public clear(): this {
    this.integerPart = 0;
    this.floatPart = 0;
    return this;
  }

  public plus(money: MoneyVO): this {
    if (!this.sameCurrency(money)) {
      throw new ArgumentInvalidException(
        'To add up, there must be the same currencies',
      );
    }

    const plus = this.getAmountParts(money.amount);

    let integerPart = Math.round(this.integerPart + plus.integerPart);
    let floatPart = Math.round(this.floatPart + plus.floatPart);

    if (floatPart >= 100) {
      integerPart = Math.round(integerPart + 1);
      floatPart = Math.round(floatPart % 100);
    }

    this.integerPart = integerPart;
    this.floatPart = floatPart;

    return this;
  }

  public minus(money: MoneyVO): this {
    if (!this.sameCurrency(money)) {
      throw new ArgumentInvalidException(
        'To add up, there must be the same currencies',
      );
    }

    const minus = this.getAmountParts(money.amount);

    let integerPart = Math.round(this.integerPart - minus.integerPart);
    let floatPart = Math.round(this.floatPart - minus.floatPart);

    if (floatPart < 0) {
      integerPart = Math.round(integerPart - 1);
      floatPart = Math.round(100 + floatPart);
    }

    if (integerPart < 0) {
      integerPart = 0;
      floatPart = 0;
    }

    this.integerPart = integerPart;
    this.floatPart = floatPart;

    return this;
  }

  private getAmountParts(amount: string) {
    const [integerPart, floatPart] = amount.split('.');
    return {
      integerPart: parseInt(integerPart),
      floatPart: parseInt(floatPart),
    };
  }

  private sameCurrency(money: MoneyVO): boolean {
    return money.currency === this.currency;
  }

  public result(): MoneyVO {
    const integerPart = String(this.integerPart);
    const floatPart =
      this.floatPart < 10 ? `0${this.floatPart}` : `${this.floatPart}`;

    switch (this.currency) {
      case Currency.RUB:
        return new MoneyVO({
          amount: `${integerPart}.${floatPart}`,
          currency: Currency.RUB,
        });
      default:
        throw new ArgumentInvalidException('Not processable currency');
    }
  }
}
