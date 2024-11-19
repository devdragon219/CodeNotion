import { CadastralLandCategoryFormInput } from '../../interfaces/FormInputs/CadastralLandCategory';

export const getEmptyCadastralLandCategoryFormInput = (): CadastralLandCategoryFormInput => ({
  cadastralLandCategoryId: null,
  internalCode: '',
  description: '',
  countryISO: '',
  ordering: 0,
});
