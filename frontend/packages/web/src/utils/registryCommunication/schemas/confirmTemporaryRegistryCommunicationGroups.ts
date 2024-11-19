import { MAX_DATE, MIN_DATE } from '@realgimm5/frontend-common/configs';
import { getDateMaxTranslation, getDateMinTranslation, getRequiredTranslation } from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { array, date, object } from 'yup';

export const getConfirmTemporaryRegistryCommunicationGroupsSchema = (language: string, t: TFunction) =>
  object().shape({
    inputs: array().of(
      object().shape({
        date: date()
          .required(getRequiredTranslation('registry_communication.field.date', t))
          .min(MIN_DATE, getDateMinTranslation('registry_communication.field.date', language, t))
          .max(MAX_DATE, getDateMaxTranslation('registry_communication.field.date', language, t)),
        debtBankAccount: object().required(getRequiredTranslation('registry_communication.field.bank_account', t)),
        requestingSubjectLegalRepresentative: object().required(
          getRequiredTranslation('registry_communication.field.legal_representative', t),
        ),
      }),
    ),
  });
