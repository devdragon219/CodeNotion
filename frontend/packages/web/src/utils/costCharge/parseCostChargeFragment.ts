import { FormViewerFieldFormInput } from '@realgimm5/frontend-common/interfaces';
import { parseStringToDate } from '@realgimm5/frontend-common/utils';

import { CostChargeDetailFragment } from '../../gql/RealGimm.Web.CostCharge.fragment';
import { CostChargeConsumptionFragment } from '../../gql/RealGimm.Web.CostChargeConsumption.fragment';
import { CostChargeFieldFragment } from '../../gql/RealGimm.Web.CostChargeField.fragment';
import { UtilityChargeFieldFragment } from '../../gql/RealGimm.Web.UtilityChargeField.fragment';
import { CostChargeConsumptionFormInput, CostChargeFormInput } from '../../interfaces/FormInputs/CostCharge';

export const parseCostChargeConsumptionToCostChargeConsumptionFormInput = (
  consumption?: CostChargeConsumptionFragment | null,
): CostChargeConsumptionFormInput | null =>
  consumption
    ? {
        since: parseStringToDate(consumption.since),
        until: parseStringToDate(consumption.until),
        values: consumption.values.map((value) => ({
          readingValueId: value.id,
          touRateIndex: value.touRateIndex,
          value: value.value ?? null,
        })),
      }
    : null;

export const parseUtilityTypeChargeFieldsToFormViewerFieldFormInputs = (
  chargeFields: UtilityChargeFieldFragment[][],
  costChargeFields: CostChargeFieldFragment[],
): FormViewerFieldFormInput[][] =>
  chargeFields.map((fields) =>
    fields.map((field) => ({
      fieldType: field.type,
      isMandatory: field.isMandatory,
      name: field.name,
      templateTypeId: field.id,
      validValues: field.validValues ?? [],
      value: costChargeFields.find(({ templateTypeId }) => templateTypeId === field.id)?.value ?? '',
    })),
  );

export const parseCostChargeToCostChargeFormInput = (costCharge: CostChargeDetailFragment): CostChargeFormInput => ({
  consumptions: {
    actual: parseCostChargeConsumptionToCostChargeConsumptionFormInput(costCharge.actualConsumption),
    expected: parseCostChargeConsumptionToCostChargeConsumptionFormInput(costCharge.expectedConsumption),
  },
  costChargeId: costCharge.id,
  dueDate: parseStringToDate(costCharge.dueDate),
  fields: parseUtilityTypeChargeFieldsToFormViewerFieldFormInputs(
    costCharge.service.utilityType.chargeFields ?? [],
    costCharge.fields,
  ),
  invoicedConsumptionAmount: costCharge.invoicedConsumptionAmount,
  invoiceNumber: costCharge.invoiceNumber,
  periodEnd: parseStringToDate(costCharge.periodEnd),
  periodStart: parseStringToDate(costCharge.periodStart),
  referenceDate: parseStringToDate(costCharge.referenceDate),
  totalAmount: costCharge.totalAmount,
  totalVatAmount: costCharge.totalVATAmount,
  utilityService: costCharge.service,
});
