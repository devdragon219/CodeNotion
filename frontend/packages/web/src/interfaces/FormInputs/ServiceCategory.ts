export interface ServiceSubCategoryFormInput {
  guid: string;
  internalCode: string;
  name: string;
  subCategoryId: number | null;
}

export interface ServiceCategoryFormInput {
  categoryId: number | null;
  internalCode: string;
  name: string;
  subCategories: ServiceSubCategoryFormInput[];
}
