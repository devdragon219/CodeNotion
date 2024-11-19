import { CatalogueCategoryFormInput } from '../../../../interfaces/FormInputs/CatalogueCategory';

export interface CatalogueCategoryGeneralDataStepProps {
  canUseInternalCode: boolean;
  catalogueCategory: CatalogueCategoryFormInput;
  onChange: (catalogueCategory: CatalogueCategoryFormInput) => void;
  onError: () => void;
  onNext: () => void;
}
