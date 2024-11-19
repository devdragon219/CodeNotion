import { ServiceCategoryFormInput, ServiceSubCategoryFormInput } from '../../interfaces/FormInputs/ServiceCategory';

export const getEmptyServiceSubCategoryFormInput = (): ServiceSubCategoryFormInput => ({
  guid: crypto.randomUUID(),
  internalCode: '',
  name: '',
  subCategoryId: null,
});

export const getEmptyServiceCategoryFormInput = (): ServiceCategoryFormInput => ({
  categoryId: null,
  internalCode: '',
  name: '',
  subCategories: [],
});
