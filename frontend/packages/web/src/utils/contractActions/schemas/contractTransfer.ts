import { MAX_DATE, MIN_DATE } from '@realgimm5/frontend-common/configs';
import { getDateMaxTranslation, getDateMinTranslation, getRequiredTranslation } from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { array, date, object, string } from 'yup';

export const getContractTransferVariationContractsSchema = (t: TFunction) =>
  object().shape({
    contracts: array().min(1, t('contract.error.takeover_transfer_counterparts')),
  });

export const getContractTransferVariationManagementSubjectSchema = (language: string, t: TFunction) =>
  object().shape({
    managementSubject: object().required(getRequiredTranslation('contract.field.new_management_subject', t)),
    paymentDate: date()
      .required(getRequiredTranslation('contract.field.payment_date', t))
      .min(MIN_DATE, getDateMinTranslation('contract.field.payment_date', language, t))
      .max(MAX_DATE, getDateMaxTranslation('contract.field.payment_date', language, t)),
    takeoverDate: date()
      .required(getRequiredTranslation('contract.field.takeover_date', t))
      .min(MIN_DATE, getDateMinTranslation('contract.field.takeover_date', language, t))
      .max(MAX_DATE, getDateMaxTranslation('contract.field.takeover_date', language, t)),
    takeoverType: string().required(getRequiredTranslation('contract.field.takeover_type', t)),
    takeoverLegalRepresentativeSubject: object().required(
      getRequiredTranslation('contract.field.takeover_legal_representative', t),
    ),
  });
