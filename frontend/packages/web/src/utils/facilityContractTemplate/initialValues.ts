import { FacilityContractTemplateFormInput } from '../../interfaces/FormInputs/FacilityContractTemplate';

export const getEmptyFacilityContractTemplateFormInput = (): FacilityContractTemplateFormInput => ({
  catalogueTypes: [],
  description: '',
  facilityContractTemplateId: null,
  facilityContractType: null,
  internalCode: '',
  penalties: [],
  slas: [],
});
