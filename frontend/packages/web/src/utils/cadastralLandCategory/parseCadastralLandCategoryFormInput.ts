import { CadastralLandCategoryInput } from '@realgimm5/frontend-common/gql/types';

import { CadastralLandCategoryFormInput } from '../../interfaces/FormInputs/CadastralLandCategory';

export const parseCadastralLandCategoryFormInputToCadastralLandCategoryInput = (
  cadastralLandCategory: CadastralLandCategoryFormInput,
): CadastralLandCategoryInput => ({
  internalCode: cadastralLandCategory.internalCode,
  description: cadastralLandCategory.description,
  countryISO: cadastralLandCategory.countryISO,
  ordering: cadastralLandCategory.ordering,
});
