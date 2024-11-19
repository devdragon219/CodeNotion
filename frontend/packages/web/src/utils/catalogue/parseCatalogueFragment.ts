import { CatalogueItemDetailFragment } from '../../gql/RealGimm.Web.CatalogueItem.fragment';
import { CatalogueFormInput } from '../../interfaces/FormInputs/Catalogue';
import {
  parseCatalogueCategoryToCatalogueCategoryFormInput,
  parseCatalogueSubCategoryToCatalogueSubCategoryFormInput,
} from '../catalogueCategory/parseCatalogueCategoryFragment';
import { parseCatalogueItemToCatalogueItemFormInput } from '../catalogueItem/parseCatalogueItemFragment';
import { parseCatalogueTypeToCatalogueTypeFormInput } from '../catalogueType/parseCatalogueTypeFragment';
import { getEmptyCatalogueFormInput } from './initialValues';

export const parseCatalogueToCatalogueFormInput = (items: CatalogueItemDetailFragment[]): CatalogueFormInput => {
  if (items.length === 0) {
    return getEmptyCatalogueFormInput();
  }

  const item = items[0];
  const { catalogueType } = item;
  return {
    catalogueType: parseCatalogueTypeToCatalogueTypeFormInput(catalogueType),
    category: parseCatalogueCategoryToCatalogueCategoryFormInput(catalogueType.category),
    documents: [],
    estate: item.estate,
    items: items.map(parseCatalogueItemToCatalogueItemFormInput),
    subCategory: catalogueType.subCategory
      ? parseCatalogueSubCategoryToCatalogueSubCategoryFormInput(catalogueType.subCategory)
      : null,
  };
};
