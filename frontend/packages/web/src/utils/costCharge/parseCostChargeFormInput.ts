import { CostChargeInput } from '@realgimm5/frontend-common/gql/types';
import { parseDateToString } from '@realgimm5/frontend-common/utils';

import { CostChargeFormInput } from '../../interfaces/FormInputs/CostCharge';

export const parseCostChargeFormInputToCostChargeInput = (costCharge: CostChargeFormInput): CostChargeInput => ({
  actualConsumption: costCharge.consumptions.actual?.since
    ? {
        since: parseDateToString(costCharge.consumptions.actual.since)!,
        until: parseDateToString(costCharge.consumptions.actual.until)!,
        values: costCharge.consumptions.actual.values.map((value) => ({
          id: value.readingValueId,
          touRateIndex: value.touRateIndex,
          value: value.value,
        })),
      }
    : null,
  dueDate: parseDateToString(costCharge.dueDate)!,
  expectedConsumption: costCharge.consumptions.expected?.since
    ? {
        since: parseDateToString(costCharge.consumptions.expected.since)!,
        until: parseDateToString(costCharge.consumptions.expected.until)!,
        values: costCharge.consumptions.expected.values.map((value) => ({
          id: value.readingValueId,
          touRateIndex: value.touRateIndex,
          value: value.value,
        })),
      }
    : null,
  fields: costCharge.fields.flatMap((fields) =>
    fields.map((field) => ({
      isMandatory: field.isMandatory,
      name: field.name,
      templateTypeId: field.templateTypeId,
      type: field.fieldType,
      value: field.value,
    })),
  ),
  invoiceNumber: costCharge.invoiceNumber,
  invoicedConsumptionAmount: costCharge.invoicedConsumptionAmount!,
  periodEnd: parseDateToString(costCharge.periodEnd)!,
  periodStart: parseDateToString(costCharge.periodStart)!,
  referenceDate: parseDateToString(costCharge.referenceDate)!,
  serviceId: costCharge.utilityService!.id,
  totalAmount: costCharge.totalAmount!,
  totalVATAmount: costCharge.totalVatAmount!,
});
