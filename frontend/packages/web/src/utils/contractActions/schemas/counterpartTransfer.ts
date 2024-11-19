import { MAX_DATE, MIN_DATE } from '@realgimm5/frontend-common/configs';
import { getDateMaxTranslation, getDateMinTranslation, getRequiredTranslation } from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { array, date, object } from 'yup';

export const getContractCounterpartTransferVariationTransferDataSchema = (
  isContractActive: boolean,
  language: string,
  t: TFunction,
) =>
  object().shape({
    takeoverDate: date()
      .required(getRequiredTranslation('contract.field.takeover_date', t))
      .min(MIN_DATE, getDateMinTranslation('contract.field.takeover_date', language, t))
      .max(MAX_DATE, getDateMaxTranslation('contract.field.takeover_date', language, t)),
    takeoverLegalRepresentativeSubject: object()
      .nullable()
      .requiredIf(!isContractActive, getRequiredTranslation('contract.field.takeover_legal_representative', t)),
  });

export const getContractCounterpartTransferVariationTakeoverCounterpartsSchema = (t: TFunction) =>
  object().shape({
    takeoverCounterparts: array().min(1, t('contract.error.takeover_transfer_counterparts')),
  });

export const getContractCounterpartTransferVariationOriginalCounterpartsSchema = (t: TFunction) =>
  object().shape({
    originalCounterparts: array().min(1, t('contract.error.original_transfer_counterparts')),
  });
