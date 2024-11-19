import { VatRateFragment } from '../../gql/RealGimm.Web.VatRate.fragment';
import { VatRateFormInput } from '../../interfaces/FormInputs/VatRate';

export const parseVatRateToVatRateFormInput = (vatRate: VatRateFragment): VatRateFormInput => ({
  vatRateId: vatRate.id,
  description: vatRate.description,
  internalCode: vatRate.internalCode,
  ratePercent: vatRate.ratePercent,
  vatRateType: vatRate.type,
});
