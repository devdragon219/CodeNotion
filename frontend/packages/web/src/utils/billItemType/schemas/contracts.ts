import { getRequiredTranslation } from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';
import { object, string } from 'yup';

export const getBillItemTypeContractSchema = (t: TFunction) =>
  object().shape({
    activeSubjectVR: object().required(getRequiredTranslation('common.enum.vat_rate_type.RATE', t)),
    activeExemptVR: object().required(getRequiredTranslation('common.enum.vat_rate_type.EXEMPT', t)),
    activeNonTaxableVR: object().required(getRequiredTranslation('common.enum.vat_rate_type.NON_TAXABLE', t)),
    passiveSubjectVR: object().required(getRequiredTranslation('common.enum.vat_rate_type.RATE', t)),
    passiveExemptVR: object().required(getRequiredTranslation('common.enum.vat_rate_type.EXEMPT', t)),
    passiveNonTaxableVR: object().required(getRequiredTranslation('common.enum.vat_rate_type.NON_TAXABLE', t)),
    administrationVatRateType: string().required(getRequiredTranslation('bill_item_type.field.vat_rate_type', t)),
    administrationVR: object().required(getRequiredTranslation('bill_item_type.field.vat_rate', t)),
  });
