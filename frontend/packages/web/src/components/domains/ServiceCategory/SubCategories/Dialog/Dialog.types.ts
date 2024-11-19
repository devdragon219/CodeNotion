import { Dispatch, SetStateAction } from 'react';

import { ServiceSubCategoryFormInput } from '../../../../../interfaces/FormInputs/ServiceCategory';

export interface SubCategoryDialogInput {
  subcategory: ServiceSubCategoryFormInput;
  index: number;
}

export interface SubCategoryDialogProps {
  canUseInternalCodes: Record<string, boolean>;
  existingInternalCodes: string[];
  input?: SubCategoryDialogInput;
  internalCode: string;
  name: string;
  onClose: () => void;
  onSave: (value: ServiceSubCategoryFormInput[] | SubCategoryDialogInput) => void;
  setCanUseInternalCodes: Dispatch<SetStateAction<Record<string, boolean>>>;
}
