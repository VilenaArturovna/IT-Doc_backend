import { isDateString } from 'class-validator';
import { ValueObject } from '../base-classes/value-object.base';

export class DateVO extends ValueObject<Date> {
  constructor(value: Date | string | number) {
    if (typeof value === 'string') {
      if (!isDateString(value))
        throw new Error(`Значение ${value} не является валидным для даты`);
    }
    const date = new Date(value);
    super({ value: date });
  }

  public get value(): Date {
    return new Date(this.props.value);
  }

  public static now(): DateVO {
    return new DateVO(Date.now());
  }

  public get ISOString(): string {
    return new Date(this.props.value).toISOString();
  }

  public get ISOStringWithoutMs(): string {
    return this.ISOString.slice(0, -5) + 'Z';
  }

  public isBefore(date: DateVO): boolean {
    return this.value.getTime() < date.value.getTime();
  }

  public isAfter(date: DateVO): boolean {
    return this.value.getTime() > date.value.getTime();
  }
}
