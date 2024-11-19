import { FacilityContractTypeFormInput } from '../../interfaces/FormInputs/FacilityContractType';

export const getEmptyFacilityContractTypeFormInput = (): FacilityContractTypeFormInput => ({
  facilityContractTypeId: null,
  internalCode: '',
  name: '',
  ordering: 0,
});
