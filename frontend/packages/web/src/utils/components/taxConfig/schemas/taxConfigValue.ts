import { SubValueType } from '@realgimm5/frontend-common/gql/types';
import { getRequiredTranslation } from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { array, object } from 'yup';

import { TaxConfigFieldFormInput } from '../../../../interfaces/FormInputs/TaxConfig';

export const getTaxConfigValueSchema = (t: TFunction, canCreateTaxConfigTableValue = true) =>
  object().shape({
    fields: array().of(
      object().test('validValue', function (value) {
        const field = value as TaxConfigFieldFormInput;
        if (!field.isMandatory) return true;

        const { createError, path } = this;
        switch (field.fieldType) {
          case SubValueType.Boolean:
            return true;
          case SubValueType.City:
            return (
              !!field.value?.id ||
              createError({
                path: `${path}.value`,
                message: getRequiredTranslation(field.label, t),
              })
            );
          case SubValueType.Currency:
          case SubValueType.Date:
            return (
              field.value !== null ||
              createError({
                path: `${path}.value`,
                message: getRequiredTranslation(field.label, t),
              })
            );
          case SubValueType.Number: {
            if (field.code !== 'year' || canCreateTaxConfigTableValue) {
              return (
                field.value !== null ||
                createError({
                  path: `${path}.value`,
                  message: getRequiredTranslation(field.label, t),
                })
              );
            }

            return createError({
              path: `${path}.value`,
              message: t('tax_config.error.existing_value'),
            });
          }
          case SubValueType.String:
            return (
              field.value !== '' ||
              createError({
                path: `${path}.value`,
                message: getRequiredTranslation(field.label, t),
              })
            );
        }
      }),
    ),
  });
