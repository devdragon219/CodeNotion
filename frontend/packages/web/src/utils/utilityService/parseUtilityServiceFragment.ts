import { parseStringToDate } from '@realgimm5/frontend-common/utils';

import { SubjectFragment } from '../../gql/RealGimm.Web.Subject.fragment';
import { UtilityServiceDetailFragment } from '../../gql/RealGimm.Web.UtilityService.fragment';
import { UtilityServiceFormInput } from '../../interfaces/FormInputs/UtilityService';
import { parseCadastralCoordinatesToString } from '../cadastralUnit/parseCadastralCoordinatesToString';
import { getSubjectVatNumber } from '../subject/subjectUtils';

export const parseUtilityServiceToUtilityServiceFormInput = (
  utilityService: UtilityServiceDetailFragment,
): UtilityServiceFormInput => ({
  accountingItem: {
    description: utilityService.accountingItem.description,
    id: utilityService.accountingItem.id,
    internalCode: utilityService.accountingItem.internalCode,
  },
  activationDate: parseStringToDate(utilityService.activationDate),
  contractNominalTension: utilityService.contractNominalTension ?? '',
  contractPowerMaximum: utilityService.contractPowerMaximum ?? '',
  contractPowerNominal: utilityService.contractPowerNominal ?? '',
  deactivationDate: parseStringToDate(utilityService.deactivationDate),
  deactivationRequestDate: parseStringToDate(utilityService.deactivationRequestDate),
  deposit: utilityService.deposit ?? null,
  description: utilityService.description ?? '',
  estates: utilityService.estates.map((estate) => ({
    addresses: estate.addresses,
    id: estate.id,
    internalCode: estate.internalCode,
    managementSubjectName: estate.managementSubject.name,
    name: estate.name ?? '',
    status: estate.status,
    type: estate.type,
    usageTypeName: estate.usageType.name,
  })),
  estateUnits: utilityService.estateUnits.map((estateUnit) => ({
    address: estateUnit.address,
    cadastralUnitCoordinates: parseCadastralCoordinatesToString(estateUnit.currentCadastralUnit?.coordinates),
    estateId: estateUnit.estate.id,
    id: estateUnit.id,
    internalCode: estateUnit.internalCode,
    name: estateUnit.name ?? '',
    subNumbering: estateUnit.subNumbering ?? '',
    type: estateUnit.type,
    usageTypeName: estateUnit.usageType.name,
  })),
  internalCode: utilityService.internalCode,
  isFreeMarket: utilityService.isFreeMarket,
  notes: utilityService.notes ?? '',
  orgUnit: {
    id: utilityService.orgUnit.id,
    name: utilityService.orgUnit.name ?? '',
  },
  providerSubject: {
    id: utilityService.providerSubject.id,
    internalCode: utilityService.providerSubject.internalCode,
    name: utilityService.providerSubject.name,
    vatNumber: getSubjectVatNumber(utilityService.providerSubject as SubjectFragment) ?? '',
  },
  referenceSubject: {
    id: utilityService.referenceSubject.id,
    name: utilityService.referenceSubject.name,
  },
  status: utilityService.status,
  utilityContractCode: utilityService.utilityContractCode,
  utilityDeliveryPointCode: utilityService.utilityDeliveryPointCode ?? '',
  utilityMeterSerial: utilityService.utilityMeterSerial ?? '',
  utilityServiceId: utilityService.id,
  utilityType: utilityService.utilityType,
  utilityUserCode: utilityService.utilityUserCode,
});
