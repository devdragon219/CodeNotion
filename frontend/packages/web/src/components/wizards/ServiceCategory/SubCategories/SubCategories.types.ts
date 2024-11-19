import { Dispatch, SetStateAction } from 'react';

import { ServiceCategoryFormInput } from '../../../../interfaces/FormInputs/ServiceCategory';

export interface ServiceCategorySubCategoriesStepProps {
  canUseInternalCodes: Record<string, boolean>;
  serviceCategory: ServiceCategoryFormInput;
  onBack: () => void;
  onChange: (serviceCategory: ServiceCategoryFormInput) => void;
  onError: (message?: string) => void;
  onSave: (serviceCategory: ServiceCategoryFormInput) => void;
  setCanUseInternalCodes: Dispatch<SetStateAction<Record<string, boolean>>>;
}
