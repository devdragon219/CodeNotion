import { CatalogueCategoryFragment } from '../../gql/RealGimm.Web.CatalogueCategory.fragment';
import { CatalogueTypeRow } from '../../interfaces/FormInputs/CatalogueType';

export const groupCatalogueCategories = (catalogueCategories: CatalogueCategoryFragment[]) =>
  catalogueCategories.map<CatalogueTypeRow>((category) => ({
    id: `CO_${category.id}`,
    name: '',
    category,
    subCategory: null,
    subRows: category.subCategories.map((subCategory) => ({
      id: `SC_${subCategory.id}`,
      category,
      name: '',
      subCategory,
      subRows: category.catalogueTypes
        .filter((type) => subCategory.id === type.subCategory?.id)
        .map((type) => ({
          id: type.id,
          name: type.name,
          category,
          subCategory,
        })),
    })),
  }));
