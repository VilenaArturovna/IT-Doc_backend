import { isEnum } from 'class-validator';

import { ValueObject } from '../base-classes/value-object.base';

export enum Currency {
  RUB = 'RUB',
}

interface MoneyVOProps {
  amount: string;
  currency: Currency;
}

interface MoneyPrimitiveProps {
  amount: string;
  currency?: Currency;
}

export class MoneyVO extends ValueObject<MoneyVOProps> {
  constructor(value: MoneyVOProps) {
    if (!isEnum(value.currency, Currency)) {
      throw new Error(
        `Значение ${value.currency} не является валидным для валюты`,
      );
    }
    if (isNaN(+value.amount)) {
      throw new Error('Значение суммы невалидно');
    }
    super(value);
  }

  public get amount() {
    return this.props.amount;
  }

  public get currency() {
    return this.props.currency;
  }

  public static toJSON(value: MoneyVOProps): MoneyPrimitiveProps {
    return {
      currency: value.currency,
      amount: value.amount,
    };
  }

  public static toVO(value: MoneyPrimitiveProps): MoneyVO {
    return new MoneyVO({
      currency: value?.currency ?? Currency.RUB,
      amount: value.amount,
    });
  }

  public static ZERO() {
    return new MoneyVO({ amount: '0.00', currency: Currency.RUB });
  }
}
