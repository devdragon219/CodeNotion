import { isEmail, isIBAN, isMobilePhone } from 'validator';
import { Schema, addMethod, object, string } from 'yup';

addMethod(string, 'email', function (this, message: string) {
  return this.test('email', message, function (value) {
    if (!value || value.length === 0) {
      return true;
    }
    const { createError, path } = this;
    return isEmail(value) || createError({ path, message });
  });
});

addMethod(string, 'iban', function (this, message: string) {
  return this.test('iban', message, function (value) {
    if (!value || value.length === 0) {
      return true;
    }
    const { createError, path } = this;
    return isIBAN(value) || createError({ path, message });
  });
});

addMethod(string, 'phone', function (this, message: string) {
  return this.test('phone', message, function (value) {
    if (!value || value.length === 0) {
      return true;
    }
    const { createError, path } = this;
    return isMobilePhone(value) || createError({ path, message });
  });
});

addMethod(Schema, 'requiredIf', function (this, condition: boolean, message: string) {
  return condition ? this.required(message) : this;
});

addMethod(Schema, 'valid', function (this, condition: boolean, message: string) {
  return this.test('valid', message, function () {
    const { createError, path } = this;
    return condition || createError({ path, message });
  });
});

addMethod(object, 'unique', function (this, key: string, existingValues: string[], message: string) {
  return this.test('unique', message, function (objectValue) {
    // We use index to exclude first occurrence to be threated as error
    const { index } = this.options as { index: number };
    const value = objectValue[key] as string;
    const values = (this.parent as Record<string, string>[]).map((it) => it[key]);
    if (
      !value ||
      value.length === 0 ||
      (!existingValues.includes(value) && !values.some((it) => it === value && values.indexOf(it) !== index))
    ) {
      return true;
    }
    const { createError, path } = this;
    return createError({ path: `${path}.${key}`, message });
  });
});
