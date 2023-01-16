import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import dayjs from 'dayjs';

@ValidatorConstraint({ async: false })
class IsAdultValidatorConstraint implements ValidatorConstraintInterface {
  validate(
    value: string,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> | boolean {
    const date = dayjs().subtract(18, 'year');
    return dayjs(value) < date;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return 'В системе может зарегистрироваться только совершеннолетний';
  }
}

export function IsAdult(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsAdultValidatorConstraint,
    });
  };
}
