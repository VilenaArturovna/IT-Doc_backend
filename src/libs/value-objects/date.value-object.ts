import axios from 'axios';
import { isDateString } from 'class-validator';
import * as dayjs from 'dayjs';

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

  public isBefore(date: DateVO): boolean {
    return this.value.getTime() < date.value.getTime();
  }

  public isAfter(date: DateVO): boolean {
    return this.value.getTime() > date.value.getTime();
  }

  public addMinutes(minutes: number): DateVO {
    const d = dayjs(this.props.value).add(minutes, 'minutes');
    return new DateVO(d.toISOString());
  }

  public addDays(days: number): DateVO {
    const d = dayjs(this.props.value).add(days, 'days');
    return new DateVO(d.toISOString());
  }

  public getDiffMinutes(date1: DateVO, date2: DateVO) {
    return dayjs(date1.value).diff(date2.value, 'minutes');
  }

  private format(date: DateVO, format: string): string {
    return dayjs(date.ISOString).format(format);
  }

  public getRemainingMinutes(): number {
    const now = new Date().getTime();
    const date = this.value.getTime();

    const diff = Math.ceil((date - now) / 1000 / 60);

    return diff >= 0 ? diff : diff * -1;
  }

  public async addMinutesOfWorkingTime(
    minutes: number,
    date?: DateVO,
  ): Promise<DateVO> {
    const currentDate = date ?? DateVO.now();
    const lunchMinutes = 60;
    const { startWorkingDay, startLunch, endLunch } =
      this.getWorkingDay(currentDate);

    const isWorkingDate = await this.isWorkingDay(currentDate);

    const remainingMinutes = this.getRemainingMinutesForWorkingDay(
      currentDate,
      isWorkingDate,
    );

    if (minutes <= remainingMinutes) {
      if (currentDate.isBefore(startWorkingDay)) {
        return startWorkingDay.addMinutes(
          minutes > 4 * 60 ? minutes + lunchMinutes : minutes,
        );
      }

      return currentDate.addMinutes(
        this.isEndBeforeLunch(startLunch, currentDate, minutes) ||
          currentDate.isAfter(endLunch)
          ? minutes
          : minutes + lunchMinutes,
      );
    }

    const numberOfWorkingDaysToComplete = Math.ceil(
      (minutes - remainingMinutes) / (8 * 60),
    );

    const finalWorkingDay = await this.searchFinalWorkingDay(
      currentDate.addDays(1),
      numberOfWorkingDaysToComplete,
    );

    const remainingMinutesForFinalDay = (minutes - remainingMinutes) % (8 * 60);

    const {
      startWorkingDay: startFinalWorkingDay,
      startLunch: startLunchForFinalWorkingDay,
    } = this.getWorkingDay(finalWorkingDay);

    return startFinalWorkingDay.addMinutes(
      this.isEndBeforeLunch(
        startLunchForFinalWorkingDay,
        startFinalWorkingDay,
        remainingMinutesForFinalDay,
      )
        ? remainingMinutesForFinalDay
        : remainingMinutesForFinalDay + lunchMinutes,
    );
  }

  private async searchFinalWorkingDay(
    date: DateVO,
    fullWorkingDaysForMinutes: number,
  ) {
    const maxNonworkingDays = 15;
    const maxDate = date.addDays(maxNonworkingDays + fullWorkingDaysForMinutes);

    const productionCalendar = await this.getProductionCalendar(date, maxDate);
    //0 - working day
    //1 - non-working day
    const arrOfDays = productionCalendar.split(',');

    let count = 0;
    let i = 0;

    while (true) {
      const day = arrOfDays[count];
      if (day) {
        if (day === '0') {
          i++;
        }
      } else {
        throw new Error('DateVO, not next working day');
      }
      if (i == fullWorkingDaysForMinutes) break;
      count++;
    }

    return date.addDays(count);
  }

  private async getProductionCalendar(date1: DateVO, date2: DateVO) {
    const getDateForUrl = (date: DateVO) => {
      const format = 'YYYYMMDD';
      return this.format(date, format);
    };
    const productionCalendarUrl = `https://isdayoff.ru/api/getdata?date1=${getDateForUrl(
      date1,
    )}&date2=${getDateForUrl(date2)}&delimeter=,`;

    const productionCalendar = await axios.get<string>(productionCalendarUrl);

    return productionCalendar.data;
  }

  private async isWorkingDay(date: DateVO) {
    const res = await axios.get<number>(
      `https://isdayoff.ru/${this.format(date, 'YYYYMMDD')}`,
    );
    return res.data === 0;
  }

  private isEndBeforeLunch(
    startLunch: DateVO,
    date: DateVO,
    minutes: number,
  ): boolean {
    if (date.isAfter(startLunch)) {
      return false;
    }
    const remainingMinutesToLunch = this.getDiffMinutes(startLunch, date);
    return remainingMinutesToLunch >= minutes;
  }

  private getRemainingMinutesForWorkingDay(
    date: DateVO,
    isWorkingDate: boolean,
  ): number {
    const lunchHour = 1;

    if (!isWorkingDate) {
      return 0;
    }

    const { startWorkingDay, endWorkingDay, startLunch, endLunch } =
      this.getWorkingDay(date);

    if (this.isBefore(startWorkingDay)) {
      return 8 * 60;
    }
    if (this.isAfter(startWorkingDay) && this.isBefore(startLunch)) {
      return this.getDiffMinutes(endWorkingDay, date) - lunchHour * 60;
    }
    if (this.isAfter(startLunch) && this.isBefore(endLunch)) {
      return 4 * 60;
    }
    if (this.isAfter(endLunch) && this.isBefore(endWorkingDay)) {
      return this.getDiffMinutes(endWorkingDay, date);
    }
    if (this.isAfter(endWorkingDay)) {
      return 0;
    }
  }

  private getWorkingDay(date: DateVO) {
    const getDate = (period: 'start' | 'end' | 'startLunch' | 'endLunch') => {
      const start = 8;
      const end = 17;
      const startLunch = 12;
      const endLunch = 13;

      const getHour = () => {
        switch (period) {
          case 'start':
            return start;
          case 'end':
            return end;
          case 'startLunch':
            return startLunch;
          case 'endLunch':
            return endLunch;
        }
      };
      return new DateVO(
        dayjs(date.value).set('hour', getHour()).startOf('hour').toISOString(),
      );
    };

    return {
      startWorkingDay: getDate('start'),
      endWorkingDay: getDate('end'),
      startLunch: getDate('startLunch'),
      endLunch: getDate('endLunch'),
    };
  }
}
