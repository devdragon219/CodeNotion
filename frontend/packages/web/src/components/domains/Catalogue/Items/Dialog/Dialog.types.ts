import { Dispatch, SetStateAction } from 'react';

import { EstateFragment } from '../../../../../gql/RealGimm.Web.Estate.fragment';
import { CatalogueItemFormInput } from '../../../../../interfaces/FormInputs/CatalogueItem';
import { CatalogueTypeFormInput } from '../../../../../interfaces/FormInputs/CatalogueType';

export interface ItemDialogInput {
  item: CatalogueItemFormInput;
  index: number;
}

export interface ItemDialogProps {
  canUseInternalCodes: Record<string, boolean>;
  catalogueType: CatalogueTypeFormInput;
  estate: EstateFragment | null;
  existingInternalCodes: string[];
  input?: ItemDialogInput;
  onClose: () => void;
  onSave: (value: CatalogueItemFormInput[] | ItemDialogInput) => void;
  setCanUseInternalCodes: Dispatch<SetStateAction<Record<string, boolean>>>;
}
