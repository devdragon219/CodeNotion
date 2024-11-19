import { UtilityServiceFragment } from '../../gql/RealGimm.Web.UtilityService.fragment';
import { CostChargeConsumptionFormInput, CostChargeFormInput } from '../../interfaces/FormInputs/CostCharge';
import { parseUtilityTypeChargeFieldsToFormViewerFieldFormInputs } from './parseCostChargeFragment';

export const getEmptyCostChargeConsumptionFormInput = (timeOfUseRateCount = 0): CostChargeConsumptionFormInput => ({
  since: null,
  until: null,
  values: Array.from(Array(timeOfUseRateCount)).map((_, index) => ({
    readingValueId: null,
    touRateIndex: index,
    value: null,
  })),
});

export const getEmptyCostChargeFormInput = (utilityService?: UtilityServiceFragment): CostChargeFormInput => ({
  consumptions: {
    actual: getEmptyCostChargeConsumptionFormInput(utilityService?.utilityType.timeOfUseRateCount),
    expected: getEmptyCostChargeConsumptionFormInput(utilityService?.utilityType.timeOfUseRateCount),
  },
  costChargeId: null,
  dueDate: null,
  fields: utilityService
    ? parseUtilityTypeChargeFieldsToFormViewerFieldFormInputs(utilityService.utilityType.chargeFields ?? [], [])
    : [],
  invoicedConsumptionAmount: null,
  invoiceNumber: '',
  periodEnd: null,
  periodStart: null,
  referenceDate: null,
  totalAmount: null,
  totalVatAmount: null,
  utilityService: utilityService ?? null,
});
