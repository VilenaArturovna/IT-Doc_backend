import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: true })
class IsNotJustSpacesConstraint implements ValidatorConstraintInterface {
  validate(value: string) {
    if (typeof value !== 'string') return false;

    return value.trim().length > 0;
  }

  defaultMessage() {
    return `Название не должно состоять только из пробелов`;
  }
}

export function IsNotJustSpaces(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsNotJustSpacesConstraint,
    });
  };
}
