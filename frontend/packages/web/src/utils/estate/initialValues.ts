import { AsstAddressType, EstateStatus } from '@realgimm5/frontend-common/gql/types';

import {
  EstateAssetValueFormInput,
  EstateCoefficientFormInput,
  EstateFormInput,
  EstateMarketValueFormInput,
  EstateRefactoringFormInput,
  EstateTotalMarketValueFormInput,
} from '../../interfaces/FormInputs/Estate';
import { StairFormInput } from '../../interfaces/FormInputs/Stair';
import { getEmptyAddressFormInput } from '../components/addressesField/initialValues';

export const getEmptyEstateStairFormInput = (): StairFormInput => ({
  description: '',
  stairId: null,
});

export const getEmptyEstateCoefficientFormInput = (): EstateCoefficientFormInput => ({
  coefficientId: null,
  coefficientType: null,
  value: null,
});

export const getEmptyEstateMarketValueFormInput = (): EstateMarketValueFormInput => ({
  marketValueId: null,
  marketValueType: null,
  value: null,
});

export const getEmptyEstateTotalMarketValueFormInput = (): EstateTotalMarketValueFormInput => ({
  totalSurfaceAreaSqM: null,
  notes: '',
  coefficients: [],
  marketValues: [getEmptyEstateMarketValueFormInput()],
});

export const getEmptyEstateAssetValueFormInput = (): EstateAssetValueFormInput => ({
  assetValueId: null,
  depreciation: null,
  ias: null,
  rba: null,
  reclamationInterventions: null,
  transferYear: null,
  year: null,
});

export const getEmptyEstateRefactoringFormInput = (): EstateRefactoringFormInput => ({
  referenceYear: null,
  buildingPermitYear: null,
  condition: null,
  ageCoefficient: null,
  estateUnits: [],
});

export const getEmptyEstateFormInput = (): EstateFormInput => ({
  addresses: [getEmptyAddressFormInput(AsstAddressType.Primary)],
  assetValues: [],
  buildYear: null,
  decommissioningDate: null,
  documents: [],
  estateId: null,
  externalCode: '',
  floors: [],
  images: [],
  internalCode: '',
  mainUsageType: null,
  managementOrgUnit: null,
  managementSubject: null,
  name: '',
  notes: '',
  ownership: null,
  refactorings: [],
  stairs: [],
  status: EstateStatus.Operational,
  surfaceAreaSqM: null,
  totalMarketValue: null,
  estateType: null,
  usageType: null,
});
