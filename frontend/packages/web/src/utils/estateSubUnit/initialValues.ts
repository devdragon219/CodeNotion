import { EstateSubUnitFormInput } from '../../interfaces/FormInputs/EstateSubUnit';

export const getEmptyEstateSubUnitFormInput = (estateUnitId: number): EstateSubUnitFormInput => ({
  internalCode: '',
  estateSubUnitId: null,
  estateUnitId,
  occupancyPercent: null,
  occupant: null,
  surfaceSqM: null,
  orgUnit: null,
  occupantType: null,
  usageType: null,
  since: null,
  until: null,
  notes: '',
});
