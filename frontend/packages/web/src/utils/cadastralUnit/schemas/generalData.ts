import { MAX_DATE, MIN_DATE } from '@realgimm5/frontend-common/configs';
import { CadastralUnitStatus } from '@realgimm5/frontend-common/gql/types';
import {
  getDateMaxTranslation,
  getDateMinTranslation,
  getDateNotAfterTranslation,
  getDateNotBeforeTranslation,
  getRequiredTranslation,
} from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { date, object, ref, string } from 'yup';

import { getAddressSchema } from '../../components/addressesField/schemas/addresses';

export const getCadastralUnitGeneralDataSchema = (
  language: string,
  t: TFunction,
  options?: { minDate?: Date; variation?: boolean },
) =>
  object().shape(
    {
      internalCode: string().required(getRequiredTranslation('cadastral_unit.field.cadastral_unit_code', t)),
      status: string().required(getRequiredTranslation('cadastral_unit.field.cadastral_unit_status', t)),
      since: date()
        .required(getRequiredTranslation('cadastral_unit.field.since', t))
        .min(
          options?.minDate ?? MIN_DATE,
          getDateMinTranslation('cadastral_unit.field.since', language, t, options?.minDate ?? MIN_DATE),
        )
        .max(MAX_DATE, getDateMaxTranslation('cadastral_unit.field.since', language, t))
        .when('until', {
          is: (value: Date | null) => value !== null,
          then: (schema) =>
            schema.max(
              ref('until'),
              getDateNotAfterTranslation('cadastral_unit.field.since', 'cadastral_unit.field.until', t),
            ),
        }),
      changed: date()
        .required(getRequiredTranslation('cadastral_unit.field.since', t))
        .when(['since'], ([since], schema) =>
          options?.variation
            ? schema.min(since, getDateMinTranslation('cadastral_unit.field.since', language, t, since as Date))
            : schema,
        ),
      until: date()
        .nullable()
        .min(MIN_DATE, getDateMinTranslation('cadastral_unit.field.until', language, t))
        .max(MAX_DATE, getDateMaxTranslation('cadastral_unit.field.until', language, t))
        .when(['since', 'status'], ([since, status], schema) => {
          if (status !== CadastralUnitStatus.Existing && !since) {
            return schema.required(getRequiredTranslation('cadastral_unit.field.until', t));
          } else if (status === CadastralUnitStatus.Existing && since) {
            return schema.min(
              ref('since'),
              getDateNotBeforeTranslation('cadastral_unit.field.until', 'cadastral_unit.field.since', t),
            );
          } else if (status !== CadastralUnitStatus.Existing && since) {
            return schema
              .required(getRequiredTranslation('cadastral_unit.field.until', t))
              .min(
                ref('since'),
                getDateNotBeforeTranslation('cadastral_unit.field.until', 'cadastral_unit.field.since', t),
              );
          }
          return schema;
        }),
      address: getAddressSchema(true, t),
    },
    [['since', 'until']],
  );
