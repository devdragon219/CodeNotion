import 'yup';

declare module 'yup' {
  interface ArraySchema<
    TIn extends AnyObject[] | null | undefined,
    TContext,
    TDefault = undefined,
    TFlags extends Flags = '',
  > extends Schema<TIn, TContext, TDefault, TFlags> {
    valid(condition: boolean, message?: Message): this;
  }

  interface DateSchema<
    TType extends Maybe<Date> = Date | undefined,
    TContext = AnyObject,
    TDefault = undefined,
    TFlags extends Flags = '',
  > extends Schema<TType, TContext, TDefault, TFlags> {
    requiredIf(condition: boolean, message?: Message): this;
  }

  interface MixedSchema<
    TType extends Maybe<number> = number | undefined,
    TContext = AnyObject,
    TDefault = undefined,
    TFlags extends Flags = '',
  > extends Schema<TType, TContext, TDefault, TFlags> {
    requiredIf(condition: boolean, message?: Message): this;
  }

  interface NumberSchema<
    TType extends Maybe<number> = number | undefined,
    TContext = AnyObject,
    TDefault = undefined,
    TFlags extends Flags = '',
  > extends Schema<TType, TContext, TDefault, TFlags> {
    requiredIf(condition: boolean, message?: Message): this;
  }

  interface ObjectSchema<
    TIn extends Maybe<AnyObject>,
    TContext = AnyObject,
    TDefault = undefined,
    TFlags extends Flags = '',
  > extends Schema<MakeKeysOptional<TIn>, TContext, TDefault, TFlags> {
    requiredIf(condition: boolean, message?: Message): this;
    unique(key: string, existingValues?: string[], message?: Message): this;
  }

  interface StringSchema<
    TType extends Maybe<string> = string | undefined,
    TContext = AnyObject,
    TDefault = undefined,
    TFlags extends Flags = '',
  > extends Schema<TType, TContext, TDefault, TFlags> {
    iban(message?: Message): this;
    phone(message?: Message): this;
    requiredIf(condition: boolean, message?: Message): this;
    valid(condition: boolean, message?: Message): this;
  }
}
