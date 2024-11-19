import { parseFieldsToFormBuilderRowFormInputs } from '@realgimm5/frontend-common/utils';

import {
  CatalogueCategoryCatalogueTypeDetailFragment,
  CatalogueTypeDetailFragment,
} from '../../gql/RealGimm.Web.CatalogueType.fragment';
import { CatalogueTypeActivityFragment } from '../../gql/RealGimm.Web.CatalogueTypeActivity.fragment';
import { CatalogueCategoryCatalogueTypeFormInput } from '../../interfaces/FormInputs/CatalogueCategory';
import { CatalogueTypeActivityFormInput, CatalogueTypeFormInput } from '../../interfaces/FormInputs/CatalogueType';
import { parseCatalogueSubCategoryToCatalogueSubCategoryFormInput } from '../catalogueCategory/parseCatalogueCategoryFragment';

export const parseCatalogueTypeActivityToCatalogueTypeActivityFormInput = (
  catalogueTypeActivity: CatalogueTypeActivityFragment,
): CatalogueTypeActivityFormInput => ({
  activityId: catalogueTypeActivity.id,
  activityType: catalogueTypeActivity.activityType,
  isMandatoryByLaw: catalogueTypeActivity.isMandatoryByLaw,
  name: catalogueTypeActivity.name,
});

export const parseCatalogueTypeToCatalogueTypeFormInput = (
  catalogueType: CatalogueTypeDetailFragment,
): CatalogueTypeFormInput => ({
  activities: catalogueType.activities.map(parseCatalogueTypeActivityToCatalogueTypeActivityFormInput),
  catalogueTypeId: catalogueType.id,
  category: {
    categoryId: catalogueType.category.id,
    internalCode: catalogueType.category.internalCode,
    name: catalogueType.category.name,
    subCategories: catalogueType.category.subCategories.map(parseCatalogueSubCategoryToCatalogueSubCategoryFormInput),
  },
  fields: parseFieldsToFormBuilderRowFormInputs(catalogueType.fields ?? []),
  internalCode: catalogueType.internalCode,
  name: catalogueType.name,
  notes: catalogueType.notes ?? '',
  subCategory: catalogueType.subCategory
    ? parseCatalogueSubCategoryToCatalogueSubCategoryFormInput(catalogueType.subCategory)
    : null,
  usageTypes: catalogueType.usageTypes,
});

export const parseCatalogueTypeToCatalogueCategoryCatalogueTypeFormInput = (
  catalogueType: CatalogueCategoryCatalogueTypeDetailFragment,
): CatalogueCategoryCatalogueTypeFormInput => ({
  activities: catalogueType.activities.map(parseCatalogueTypeActivityToCatalogueTypeActivityFormInput),
  catalogueTypeId: catalogueType.id,
  fields: parseFieldsToFormBuilderRowFormInputs(catalogueType.fields ?? []),
  internalCode: catalogueType.internalCode,
  name: catalogueType.name,
  notes: catalogueType.notes ?? '',
  subCategory: catalogueType.subCategory
    ? parseCatalogueSubCategoryToCatalogueSubCategoryFormInput(catalogueType.subCategory)
    : null,
  usageTypes: catalogueType.usageTypes,
});
