import {
  CatalogueCategoryFormInput,
  CatalogueSubCategoryFormInput,
} from '../../interfaces/FormInputs/CatalogueCategory';

export const getEmptyCatalogueCategoryFormInput = (): CatalogueCategoryFormInput => ({
  catalogueTypes: [],
  categoryId: null,
  internalCode: '',
  name: '',
  subCategories: [],
});

export const getEmptyCatalogueSubCategoryFormInput = (): CatalogueSubCategoryFormInput => ({
  guid: crypto.randomUUID(),
  internalCode: '',
  name: '',
  subCategoryId: null,
});
