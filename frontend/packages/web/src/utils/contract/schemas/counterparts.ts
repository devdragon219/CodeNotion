import { MAX_DATE, MIN_DATE } from '@realgimm5/frontend-common/configs';
import {
  getDateMaxTranslation,
  getDateMinTranslation,
  getPercentMaxTranslation,
  getRequiredTranslation,
} from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { array, boolean, date, number, object, string } from 'yup';

export const getContractCounterpartsSchema = (
  isContractActive: boolean,
  validateAll: boolean,
  language: string,
  t: TFunction,
) =>
  object().shape({
    counterparts: array()
      .min(1, t(`contract.error.no_counterparts_${isContractActive ? 'tenant' : 'landlord'}`))
      .of(
        object().shape({
          isMainCounterpart: boolean(),
          since: date()
            .nullable()
            .requiredIf(validateAll, getRequiredTranslation('contract.field.counterpart_since', t))
            .min(MIN_DATE, getDateMinTranslation('contract.field.counterpart_since', language, t))
            .max(MAX_DATE, getDateMaxTranslation('contract.field.counterpart_since', language, t)),
          contractSharePercent: number()
            .nullable()
            .max(100, getPercentMaxTranslation('contract.field.counterpart_percent', t))
            .requiredIf(validateAll, getRequiredTranslation('contract.field.counterpart_percent', t)),
          counterpartType: string()
            .nullable()
            .requiredIf(validateAll, getRequiredTranslation('contract.field.counterpart_type', t)),
        }),
      )
      .test('validCounterparts', function (value) {
        if (!validateAll) {
          return true;
        }

        const { createError, path } = this;
        const mainCounterparts = (value ?? []).filter((counterpart) => counterpart.isMainCounterpart);
        const contractSharePercent = (value ?? []).reduce<number>(
          (acc, counterpart) => acc + (counterpart.contractSharePercent ?? 0),
          0,
        );
        const message =
          mainCounterparts.length === 0
            ? t('contract.error.no_main_counterpart')
            : mainCounterparts.length > 1
              ? t('contract.error.multiple_main_counterparts')
              : contractSharePercent !== 100
                ? t('contract.error.invalid_share_percent')
                : undefined;
        return !message || createError({ path, message });
      }),
  });
