import { VatRateType } from '@realgimm5/frontend-common/gql/types';

export interface VatRateFormInput {
  description: string;
  internalCode: string;
  ratePercent: number | null;
  vatRateId: number | null;
  vatRateType: VatRateType | null;
}
