import { EntryStatus } from '@realgimm5/frontend-common/gql/types';
import { getPercentMaxTranslation, getRequiredTranslation } from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { number, object, string } from 'yup';

export const getFacilityContractBillingSchema = (t: TFunction) =>
  object().shape({
    billing: object().when('entryStatus', {
      is: (entryStatus: EntryStatus) => entryStatus !== EntryStatus.IncompleteDraft,
      then: (schema) =>
        schema.shape({
          billingPeriod: string().required(getRequiredTranslation('facility_contract.field.billing_period', t)),
          vatPercentage: number()
            .nullable()
            .max(100, getPercentMaxTranslation('facility_contract.field.billing_vat_percentage', t)),
          discountPercentage: number()
            .nullable()
            .max(100, getPercentMaxTranslation('facility_contract.field.billing_discount_percentage', t)),
        }),
    }),
  });
