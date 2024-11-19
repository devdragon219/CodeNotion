import { CatalogueCategoryInput, CatalogueSubCategoryInput } from '@realgimm5/frontend-common/gql/types';

import {
  CatalogueCategoryFormInput,
  CatalogueSubCategoryFormInput,
} from '../../interfaces/FormInputs/CatalogueCategory';

export const parseCatalogueCategoryFormInputToCatalogueCategoryInput = (
  catalogueCategory: CatalogueCategoryFormInput,
): CatalogueCategoryInput => ({
  internalCode: catalogueCategory.internalCode,
  name: catalogueCategory.name,
  subCategories: catalogueCategory.subCategories.map(parseCatalogueSubCategoryFormInputToCatalogueSubCategoryInput),
});

export const parseCatalogueSubCategoryFormInputToCatalogueSubCategoryInput = (
  catalogueSubCategory: CatalogueSubCategoryFormInput,
): CatalogueSubCategoryInput => ({
  id: catalogueSubCategory.subCategoryId,
  internalCode: catalogueSubCategory.internalCode,
  name: catalogueSubCategory.name,
});
