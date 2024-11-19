import { UtilityServiceFormInput } from '../../interfaces/FormInputs/UtilityService';

export const getEmptyUtilityServiceFormInput = (): UtilityServiceFormInput => ({
  accountingItem: null,
  activationDate: null,
  contractNominalTension: '',
  contractPowerMaximum: '',
  contractPowerNominal: '',
  deactivationDate: null,
  deactivationRequestDate: null,
  deposit: null,
  description: '',
  estates: [],
  estateUnits: [],
  internalCode: '',
  isFreeMarket: false,
  notes: '',
  orgUnit: null,
  providerSubject: null,
  referenceSubject: null,
  status: null,
  utilityContractCode: '',
  utilityDeliveryPointCode: '',
  utilityMeterSerial: '',
  utilityServiceId: null,
  utilityType: null,
  utilityUserCode: '',
});