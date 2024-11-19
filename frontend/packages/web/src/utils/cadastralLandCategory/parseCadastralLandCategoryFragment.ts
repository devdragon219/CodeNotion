import { CadastralLandCategoryFragment } from '../../gql/RealGimm.Web.CadastralLandCategory.fragment';
import { CadastralLandCategoryFormInput } from '../../interfaces/FormInputs/CadastralLandCategory';

export const parseCadastralLandCategoryToCadastralLandCategoryFormInput = (
  cadastralLandCategory: CadastralLandCategoryFragment,
): CadastralLandCategoryFormInput => ({
  cadastralLandCategoryId: cadastralLandCategory.id,
  internalCode: cadastralLandCategory.internalCode,
  description: cadastralLandCategory.description,
  countryISO: cadastralLandCategory.countryISO,
  ordering: cadastralLandCategory.ordering,
});
