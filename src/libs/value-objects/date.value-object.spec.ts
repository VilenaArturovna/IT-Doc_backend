import { DateVO } from '@libs/value-objects/date.value-object';

describe('DateVO', () => {
  test('should be now', () => {
    const sut = DateVO.now();
    const now = new Date();

    expect(sut.value.getTime() <= now.getTime()).toBe(true);
  });

  test('should be before or after', () => {
    const jan = new DateVO('2024-01-01T00:00:00.000Z');
    const feb = new DateVO('2024-02-01T00:00:00.000Z');

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
});
