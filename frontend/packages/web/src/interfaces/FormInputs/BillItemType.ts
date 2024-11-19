import { VatRateType } from '@realgimm5/frontend-common/gql/types';

import { Applicability } from '../../enums/Applicability';
import { AccountingItemFieldValue } from '../FieldValues/AccountingItem';
import { VatRateFieldValue } from '../FieldValues/VatRate';

export interface BillItemTypeFormInput {
  billItemTypeId: number | null;
  internalCode: string;
  description: string;
  isPositive: boolean | null;
  applicability: Applicability[];
  defaultAccountingItem: AccountingItemFieldValue | null;
  activeSubjectVR: VatRateFieldValue | null;
  activeExemptVR: VatRateFieldValue | null;
  activeNonTaxableVR: VatRateFieldValue | null;
  passiveSubjectVR: VatRateFieldValue | null;
  passiveExemptVR: VatRateFieldValue | null;
  passiveNonTaxableVR: VatRateFieldValue | null;
  administrationVatRateType: VatRateType | null;
  administrationVR: VatRateFieldValue | null;
}
