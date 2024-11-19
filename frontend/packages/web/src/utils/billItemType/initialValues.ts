import { BillItemTypeFormInput } from '../../interfaces/FormInputs/BillItemType';

export const getEmptyBillItemTypeFormInput = (): BillItemTypeFormInput => ({
  billItemTypeId: null,
  internalCode: '',
  description: '',
  isPositive: null,
  applicability: [],
  defaultAccountingItem: null,
  activeSubjectVR: null,
  activeExemptVR: null,
  activeNonTaxableVR: null,
  passiveSubjectVR: null,
  passiveExemptVR: null,
  passiveNonTaxableVR: null,
  administrationVatRateType: null,
  administrationVR: null,
});
