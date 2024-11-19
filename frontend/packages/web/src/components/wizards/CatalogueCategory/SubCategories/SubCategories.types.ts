import { Dispatch, SetStateAction } from 'react';

import { CatalogueCategoryFormInput } from '../../../../interfaces/FormInputs/CatalogueCategory';

export interface CatalogueCategorySubCategoriesStepProps {
  canUseInternalCodes: Record<string, boolean>;
  catalogueCategory: CatalogueCategoryFormInput;
  onBack: () => void;
  onChange: (catalogueCategory: CatalogueCategoryFormInput) => void;
  onError: (message?: string) => void;
  onSave: (catalogueCategory: CatalogueCategoryFormInput) => void;
  setCanUseInternalCodes: Dispatch<SetStateAction<Record<string, boolean>>>;
}
