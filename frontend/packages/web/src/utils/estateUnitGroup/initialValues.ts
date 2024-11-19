import { EstateUnitGroupFormInput } from '../../interfaces/FormInputs/EstateUnitGroup';

export const getEmptyEstateUnitGroupFormInput = (): EstateUnitGroupFormInput => ({
  estateUnitGroupId: null,
  estateUnits: [],
  internalCode: '',
  managementSubject: null,
  name: '',
});
