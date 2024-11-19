import { getRequiredTranslation } from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { array, boolean, object, string } from 'yup';

export const getBillItemTypeGeneralDataSchema = (canUseInternalCode: boolean, t: TFunction) =>
  object().shape({
    internalCode: string()
      .required(getRequiredTranslation('bill_item_type.field.internal_code', t))
      .valid(canUseInternalCode, t('bill_item_type.error.internal_code')),
    description: string().required(getRequiredTranslation('bill_item_type.field.description', t)),
    isPositive: boolean().required(getRequiredTranslation('bill_item_type.field.sign', t)),
    applicability: array().min(1, getRequiredTranslation('bill_item_type.field.applicability', t)),
  });
