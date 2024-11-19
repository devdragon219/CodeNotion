import { Dispatch, SetStateAction } from 'react';

import { CatalogueSubCategoryFormInput } from '../../../../../interfaces/FormInputs/CatalogueCategory';

export interface SubCategoryDialogInput {
  subcategory: CatalogueSubCategoryFormInput;
  index: number;
}

export interface SubCategoryDialogProps {
  canUseInternalCodes: Record<string, boolean>;
  existingInternalCodes: string[];
  input?: SubCategoryDialogInput;
  internalCode: string;
  name: string;
  onClose: () => void;
  onSave: (value: CatalogueSubCategoryFormInput[] | SubCategoryDialogInput) => void;
  setCanUseInternalCodes: Dispatch<SetStateAction<Record<string, boolean>>>;
}
