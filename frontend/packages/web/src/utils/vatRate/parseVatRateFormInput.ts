import { VatRateInput } from '@realgimm5/frontend-common/gql/types';

import { VatRateFormInput } from '../../interfaces/FormInputs/VatRate';

export const parseVatRateFormInputToVatRateInput = (vatRate: VatRateFormInput): VatRateInput => ({
  internalCode: vatRate.internalCode,
  description: vatRate.description,
  ratePercent: vatRate.ratePercent!,
  type: vatRate.vatRateType!,
});
