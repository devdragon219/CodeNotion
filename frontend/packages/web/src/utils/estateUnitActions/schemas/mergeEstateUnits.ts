import { TFunction } from 'i18next';
import { array, object } from 'yup';

import { EstateUnitFormInput } from '../../../interfaces/FormInputs/EstateUnit';

export const getEstateUnitMergeEstateUnitsSchema = (t: TFunction) =>
  object().shape({
    fromEstateUnits: array()
      .min(2, t('estate_unit_merge.error.no_estate_units'))
      .test('validEstateUnits', function (value) {
        const { createError, path } = this;
        const valid =
          new Set(((value ?? []) as EstateUnitFormInput[]).map(({ address }) => address?.city.name)).size === 1;
        return valid || createError({ path, message: t('estate_unit_merge.error.invalid_estate_units') });
      }),
  });
