import { isEnum } from 'class-validator';

import { ValueObject } from '../base-classes/value-object.base';

export enum Currency {
  RUB = 'RUB',
}

interface MoneyVOProps {
  amount: number;
  currency: Currency;
}

interface MoneyPrimitiveProps {
  amount: number;
  currency: Currency;
}

export class MoneyVO extends ValueObject<MoneyVOProps> {
  constructor(value: MoneyVOProps) {
    if (!isEnum(value.currency, Currency)) {
      throw new Error(
        `Значение ${value.currency} не является валидным для валюты`,
      );
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
      currency: value.currency,
      amount: value.amount,
    });
  }
}
