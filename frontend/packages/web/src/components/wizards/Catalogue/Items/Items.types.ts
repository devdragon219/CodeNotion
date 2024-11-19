import { Dispatch, SetStateAction } from 'react';

import { CatalogueFormInput } from '../../../../interfaces/FormInputs/Catalogue';

export interface CatalogueItemsStepProps {
  canUseInternalCodes: Record<string, boolean>;
  catalogue: CatalogueFormInput;
  onBack: () => void;
  onChange: (catalogue: CatalogueFormInput) => void;
  onError: () => void;
  onNext: () => void;
  setCanUseInternalCodes: Dispatch<SetStateAction<Record<string, boolean>>>;
}
