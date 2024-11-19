import { EstateUnitType } from '@realgimm5/frontend-common/gql/types';
import { getRequiredTranslation } from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { object, string } from 'yup';

import { UsageTypeFormInput } from '../../../interfaces/FormInputs/UsageType';
import { getEstateUnitGeneralDataSchema } from '../../estateUnit/schemas/generalData';

export const getEstateUnitTransformToEstateUnitSchema = (
  initialType: EstateUnitType | null,
  initialUsageTypeId: number | null,
  language: string,
  t: TFunction,
  minDate?: Date,
) =>
  getEstateUnitGeneralDataSchema(language, t, minDate).concat(
    object().shape(
      {
        estateUnitType: string()
          .required(getRequiredTranslation('estate_unit.field.estate_unit_type', t))
          .when('usageType', {
            is: (value: UsageTypeFormInput | null) => value?.usageTypeId === initialUsageTypeId,
            then: (schema) =>
              schema.test('valid', function (value) {
                const { createError, path } = this;
                return (
                  (value as EstateUnitType) !== initialType ||
                  createError({ path, message: t('estate_unit_transform.error.estate_unit_types') })
                );
              }),
          }),
        usageType: object()
          .required(getRequiredTranslation('estate_unit.field.usage_type', t))
          .when('estateUnitType', {
            is: initialType,
            then: (schema) =>
              schema.test('valid', function (value) {
                const { createError, path } = this;
                return (
                  (value as UsageTypeFormInput | null)?.usageTypeId !== initialUsageTypeId ||
                  createError({ path, message: t('estate_unit_transform.error.estate_unit_types') })
                );
              }),
          }),
      },
      [['estateUnitType', 'usageType']],
    ),
  );
