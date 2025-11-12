import { DateVO } from '@libs/value-objects/date.value-object';

describe('DateVO', () => {
  test('should be now', () => {
    const sut = DateVO.now();
    const now = new Date();

    expect(sut.value.getTime() <= now.getTime()).toBe(true);
  });

  test('should be before or after', () => {
    const jan = new DateVO('2025-01-01T00:00:00.000Z');
    const feb = new DateVO('2025-02-01T00:00:00.000Z');

    expect(feb.isAfter(jan)).toBe(true);
    expect(jan.isBefore(feb)).toBe(true);
  });

  test('should be added minutes', () => {
    const minutes = 14;
    const sut = DateVO.now();
    const ms1 = sut.value.getTime();
    const ms2 = sut.addMinutes(minutes).value.getTime();
    const diff = (ms2 - ms1) / 1000 / 60;

    expect(minutes).toBe(diff);
  });

  test('should get the remaining minutes', () => {
    const minutes = 14;
    const sut = DateVO.now().addMinutes(minutes);

    expect(sut.getRemainingMinutes()).toBe(minutes);
  });

  test('should be an error when value is invalid string', () => {
    const invalidString = () => {
      new DateVO('test');
    };

    expect(invalidString).toThrow();
  });

  describe('should be deadline is valid', () => {
    enum Options {
      BEFORE_WORKING_DAY = 'before working day',
      FROM_EIGHT_TO_TWELVE = '8-12',
      DURING_LUNCH = 'during lunch',
      FROM_THIRTEEN_TO_SEVENTEEN = '13-17',
      AFTER_WORKING_DAY = 'after working day',
      ON_A_DAY_OFF = 'on a day off',
    }
    enum Durations {
      TWO_HOURS = '2 hours',
      SIX_HOURS = '6 hours',
      FOURTEEN_HOURS = '14 hours',
    }

    //2 hours
    test(`${Durations.TWO_HOURS}, ${Options.BEFORE_WORKING_DAY}`, async () => {
      const now = new DateVO('2025-02-19T07:00:00+06:00');
      const deadline = await now.addMinutesOfWorkingTime(2 * 60, now);
      expect(deadline.ISOString).toBe('2025-02-19T04:00:00.000Z');
    });
    test(`${Durations.TWO_HOURS}, ${Options.FROM_EIGHT_TO_TWELVE}`, async () => {
      const now = new DateVO('2025-02-19T09:30:00+06:00');
      const deadline = await now.addMinutesOfWorkingTime(2 * 60, now);
      expect(deadline.ISOString).toBe('2025-02-19T05:30:00.000Z');
    });
    test(`${Durations.TWO_HOURS}, ${Options.DURING_LUNCH}`, async () => {
      const now = new DateVO('2025-02-19T12:20:00+06:00');
      const deadline = await now.addMinutesOfWorkingTime(2 * 60, now);
      expect(deadline.ISOString).toBe('2025-02-19T09:20:00.000Z');
    });
    test(`${Durations.TWO_HOURS}, ${Options.FROM_THIRTEEN_TO_SEVENTEEN}`, async () => {
      const now = new DateVO('2025-02-19T14:00:00+06:00');
      const deadline = await now.addMinutesOfWorkingTime(2 * 60, now);
      expect(deadline.ISOString).toBe('2025-02-19T10:00:00.000Z');
    });
    test(`${Durations.TWO_HOURS}, ${Options.AFTER_WORKING_DAY}`, async () => {
      const now = new DateVO('2025-02-19T18:00:00+06:00');
      const deadline = await now.addMinutesOfWorkingTime(2 * 60, now);
      expect(deadline.ISOString).toBe('2025-02-20T04:00:00.000Z');
    });
    test(`${Durations.TWO_HOURS}, ${Options.ON_A_DAY_OFF}`, async () => {
      const now = new DateVO('2025-02-22T07:00:00+06:00');
      const deadline = await now.addMinutesOfWorkingTime(2 * 60, now);
      expect(deadline.ISOString).toBe('2025-02-24T04:00:00.000Z');
    });

    //6 hours
    test(`${Durations.SIX_HOURS}, ${Options.BEFORE_WORKING_DAY}`, async () => {
      const now = new DateVO('2025-02-19T07:00:00+06:00');
      const deadline = await now.addMinutesOfWorkingTime(6 * 60, now);
      expect(deadline.ISOString).toBe('2025-02-19T09:00:00.000Z');
    });
    test(`${Durations.SIX_HOURS}, ${Options.FROM_EIGHT_TO_TWELVE}`, async () => {
      const now = new DateVO('2025-02-19T08:20:00+06:00');
      const deadline = await now.addMinutesOfWorkingTime(6 * 60, now);
      expect(deadline.ISOString).toBe('2025-02-19T09:20:00.000Z');
    });
    test(`${Durations.SIX_HOURS}, ${Options.DURING_LUNCH}`, async () => {
      const now = new DateVO('2025-02-19T12:10:00+06:00');
      const deadline = await now.addMinutesOfWorkingTime(6 * 60, now);
      expect(deadline.ISOString).toBe('2025-02-20T04:00:00.000Z');
    });
    test(`${Durations.SIX_HOURS}, ${Options.FROM_THIRTEEN_TO_SEVENTEEN}`, async () => {
      const now = new DateVO('2025-02-19T15:40:00+06:00');
      const deadline = await now.addMinutesOfWorkingTime(6 * 60, now);
      expect(deadline.ISOString).toBe('2025-02-20T07:40:00.000Z');
    });
    test(`${Durations.SIX_HOURS}, ${Options.AFTER_WORKING_DAY}`, async () => {
      const now = new DateVO('2025-02-19T17:30:00+06:00');
      const deadline = await now.addMinutesOfWorkingTime(6 * 60, now);
      expect(deadline.ISOString).toBe('2025-02-20T09:00:00.000Z');
    });
    test(`${Durations.SIX_HOURS}, ${Options.ON_A_DAY_OFF}`, async () => {
      const now = new DateVO('2025-02-23T07:00:00+06:00');
      const deadline = await now.addMinutesOfWorkingTime(6 * 60, now);
      expect(deadline.ISOString).toBe('2025-02-24T09:00:00.000Z');
    });

    //14 hours
    test(`${Durations.FOURTEEN_HOURS}, ${Options.BEFORE_WORKING_DAY}`, async () => {
      const now = new DateVO('2025-02-19T07:00:00+06:00');
      const deadline = await now.addMinutesOfWorkingTime(14 * 60, now);
      expect(deadline.ISOString).toBe('2025-02-20T09:00:00.000Z');
    });
    test(`${Durations.FOURTEEN_HOURS}, ${Options.FROM_EIGHT_TO_TWELVE}`, async () => {
      const now = new DateVO('2025-02-19T11:00:00+06:00');
      const deadline = await now.addMinutesOfWorkingTime(14 * 60, now);
      expect(deadline.ISOString).toBe('2025-02-21T03:00:00.000Z');
    });
    test(`${Durations.FOURTEEN_HOURS}, ${Options.DURING_LUNCH}`, async () => {
      const now = new DateVO('2025-02-19T12:13:00+06:00');
      const deadline = await now.addMinutesOfWorkingTime(14 * 60, now);
      expect(deadline.ISOString).toBe('2025-02-21T04:00:00.000Z');
    });
    test(`${Durations.FOURTEEN_HOURS}, ${Options.FROM_THIRTEEN_TO_SEVENTEEN}`, async () => {
      const now = new DateVO('2025-02-20T14:00:00+06:00');
      const deadline = await now.addMinutesOfWorkingTime(14 * 60, now);
      expect(deadline.ISOString).toBe('2025-02-24T05:00:00.000Z');
    });
    test(`${Durations.FOURTEEN_HOURS}, ${Options.AFTER_WORKING_DAY}`, async () => {
      const now = new DateVO('2025-02-19T17:16:00+06:00');
      const deadline = await now.addMinutesOfWorkingTime(14 * 60, now);
      expect(deadline.ISOString).toBe('2025-02-21T09:00:00.000Z');
    });
    test(`${Durations.FOURTEEN_HOURS}, ${Options.ON_A_DAY_OFF}`, async () => {
      const now = new DateVO('2025-02-22T07:00:00+06:00');
      const deadline = await now.addMinutesOfWorkingTime(14 * 60, now);
      expect(deadline.ISOString).toBe('2025-02-25T09:00:00.000Z');
    });
  });
});
