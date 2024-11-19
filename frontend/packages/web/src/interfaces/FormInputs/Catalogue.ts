import { DocumentFormInput } from '@realgimm5/frontend-common/interfaces';

import { EstateFragment } from '../../gql/RealGimm.Web.Estate.fragment';
import { CatalogueCategoryFormInput, CatalogueSubCategoryFormInput } from './CatalogueCategory';
import { CatalogueItemFormInput } from './CatalogueItem';
import { CatalogueTypeFormInput } from './CatalogueType';

export interface CatalogueFormInput {
  catalogueType: CatalogueTypeFormInput | null;
  category: CatalogueCategoryFormInput | null;
  documents: DocumentFormInput[];
  estate: EstateFragment | null;
  items: CatalogueItemFormInput[];
  subCategory: CatalogueSubCategoryFormInput | null;
}
