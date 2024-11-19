import { TFunction } from 'i18next';
import { array } from 'yup';

import { CustomFieldType } from '../../../gql/types';
import { FormBuilderRowFormInput } from '../../../interfaces/FormInputs/FormBuilder';

export const getFormBuilderSchema = (t: TFunction) =>
  array().test('validFields', function (value) {
    const { createError, path } = this;
    const hasNoName = (value ?? []).some(({ fields }: FormBuilderRowFormInput) =>
      fields.some((field) => field.name.length === 0),
    );
    const hasNoValidValues = (value ?? []).some(({ fields }: FormBuilderRowFormInput) =>
      fields.some((field) => field.fieldType === CustomFieldType.SingleItemFromList && field.validValues.length === 0),
    );
    const message = hasNoName
      ? t('common.component.form_builder.error.name')
      : hasNoValidValues
        ? t('common.component.form_builder.error.values')
        : undefined;
    return !message || createError({ path, message });
  });
