import { FormViewerFieldFormInput } from '@realgimm5/frontend-common/interfaces';

import { UtilityServiceFragment } from '../../gql/RealGimm.Web.UtilityService.fragment';
import { ReadingValueFormInput } from './Reading';

export interface CostChargeConsumptionFormInput {
  since: Date | null;
  until: Date | null;
  values: ReadingValueFormInput[];
}

export interface CostChargeFormInput {
  consumptions: {
    actual: CostChargeConsumptionFormInput | null;
    expected: CostChargeConsumptionFormInput | null;
  };
  costChargeId: number | null;
  dueDate: Date | null;
  fields: FormViewerFieldFormInput[][];
  invoicedConsumptionAmount: number | null;
  invoiceNumber: string;
  periodEnd: Date | null;
  periodStart: Date | null;
  referenceDate: Date | null;
  totalAmount: number | null;
  totalVatAmount: number | null;
  utilityService: UtilityServiceFragment | null;
}
