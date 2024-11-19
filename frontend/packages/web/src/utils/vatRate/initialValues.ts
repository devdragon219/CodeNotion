import { VatRateFormInput } from '../../interfaces/FormInputs/VatRate';

export const getEmptyVatRateFormInput = (): VatRateFormInput => ({
  vatRateId: null,
  description: '',
  internalCode: '',
  ratePercent: null,
  vatRateType: null,
});
