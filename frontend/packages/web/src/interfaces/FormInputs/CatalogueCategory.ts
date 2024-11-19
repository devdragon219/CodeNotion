import { CatalogueTypeFormInput } from './CatalogueType';

export interface CatalogueCategoryFormInput {
  catalogueTypes: CatalogueCategoryCatalogueTypeFormInput[];
  categoryId: number | null;
  internalCode: string;
  name: string;
  subCategories: CatalogueSubCategoryFormInput[];
}

export interface CatalogueSubCategoryFormInput {
  guid: string;
  internalCode: string;
  name: string;
  subCategoryId: number | null;
}

export type CatalogueCategoryCatalogueTypeFormInput = Omit<CatalogueTypeFormInput, 'category'>;
