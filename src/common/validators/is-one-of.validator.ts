import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsOneOf' })
class IsOneOfConstraint implements ValidatorConstraintInterface {
  validate(_: string, args: ValidationArguments) {
    let hasOccurred = false;
    return args.constraints[0].every((key: string) => {
      if (args.object[key] !== undefined && args.object[key] !== null)
        return hasOccurred ? false : (hasOccurred = true);
      return true;
    });
  }

  defaultMessage(args: ValidationArguments) {
    return `Должно присутствовать только одно из значений: ${args.constraints[0]}`;
  }
}

export function IsOneOf<Obj extends Record<string, any> = Record<string, any>>(
  property: (keyof Obj)[],
  validationOptions?: ValidationOptions,
) {
  return (object: Obj, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: IsOneOfConstraint,
    });
  };
}
