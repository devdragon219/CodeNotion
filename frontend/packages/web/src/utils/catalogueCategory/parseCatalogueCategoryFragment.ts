import { CatalogueCategoryFragment } from '../../gql/RealGimm.Web.CatalogueCategory.fragment';
import { CatalogueSubCategoryFragment } from '../../gql/RealGimm.Web.CatalogueSubCategory.fragment';
import {
  CatalogueCategoryFormInput,
  CatalogueSubCategoryFormInput,
} from '../../interfaces/FormInputs/CatalogueCategory';
import { parseCatalogueTypeToCatalogueCategoryCatalogueTypeFormInput } from '../catalogueType/parseCatalogueTypeFragment';

export const parseCatalogueCategoryToCatalogueCategoryFormInput = (
  catalogueCategory: CatalogueCategoryFragment,
): CatalogueCategoryFormInput => ({
  catalogueTypes: catalogueCategory.catalogueTypes.map(parseCatalogueTypeToCatalogueCategoryCatalogueTypeFormInput),
  categoryId: catalogueCategory.id,
  internalCode: catalogueCategory.internalCode,
  name: catalogueCategory.name,
  subCategories: catalogueCategory.subCategories.map(parseCatalogueSubCategoryToCatalogueSubCategoryFormInput),
});

export const parseCatalogueSubCategoryToCatalogueSubCategoryFormInput = (
  catalogueSubCategory: CatalogueSubCategoryFragment,
): CatalogueSubCategoryFormInput => ({
  internalCode: catalogueSubCategory.internalCode,
  guid: crypto.randomUUID(),
  name: catalogueSubCategory.name,
  subCategoryId: catalogueSubCategory.id,
});
