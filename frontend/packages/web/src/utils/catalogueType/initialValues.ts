import { CatalogueTypeActivityFormInput, CatalogueTypeFormInput } from '../../interfaces/FormInputs/CatalogueType';

export const getEmptyCatalogueTypeActivityFormInput = (): CatalogueTypeActivityFormInput => ({
  activityId: null,
  activityType: null,
  isMandatoryByLaw: false,
  name: '',
});

export const getEmptyCatalogueTypeFormInput = (): CatalogueTypeFormInput => ({
  activities: [],
  catalogueTypeId: null,
  category: null,
  fields: [],
  internalCode: '',
  name: '',
  notes: '',
  subCategory: null,
  usageTypes: [],
});
