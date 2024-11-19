import { UtilityServiceInput } from '@realgimm5/frontend-common/gql/types';
import { getStringOrNull, parseDateToString } from '@realgimm5/frontend-common/utils';

import { UtilityServiceFormInput } from '../../interfaces/FormInputs/UtilityService';

export const parseUtilityServiceFormInputToUtilityServiceInput = (
  utilityService: UtilityServiceFormInput,
): UtilityServiceInput => ({
  accountingItemId: utilityService.accountingItem!.id,
  activationDate: parseDateToString(utilityService.activationDate)!,
  contractNominalTension: getStringOrNull(utilityService.contractNominalTension),
  contractPowerMaximum: getStringOrNull(utilityService.contractPowerMaximum),
  contractPowerNominal: getStringOrNull(utilityService.contractPowerNominal),
  deposit: utilityService.deposit,
  description: getStringOrNull(utilityService.description),
  estateIds: utilityService.estates.map(({ id }) => id),
  estateUnitIds: utilityService.estateUnits.map(({ id }) => id),
  internalCode: utilityService.internalCode,
  isFreeMarket: utilityService.isFreeMarket,
  notes: getStringOrNull(utilityService.notes),
  orgUnitId: utilityService.orgUnit!.id,
  providerSubjectId: utilityService.providerSubject!.id,
  referenceSubjectId: utilityService.referenceSubject!.id,
  status: utilityService.status!,
  utilityContractCode: utilityService.utilityContractCode,
  utilityDeliveryPointCode: getStringOrNull(utilityService.utilityDeliveryPointCode),
  utilityMeterSerial: getStringOrNull(utilityService.utilityMeterSerial),
  utilityTypeId: utilityService.utilityType!.id,
  utilityUserCode: utilityService.utilityUserCode,
});
