import { EstateFragment } from '../../gql/RealGimm.Web.Estate.fragment';
import { CatalogueFormInput } from '../../interfaces/FormInputs/Catalogue';

export const getEmptyCatalogueFormInput = (estate?: EstateFragment): CatalogueFormInput => ({
  catalogueType: null,
  category: null,
  documents: [],
  estate: estate ?? null,
  items: [],
  subCategory: null,
});
