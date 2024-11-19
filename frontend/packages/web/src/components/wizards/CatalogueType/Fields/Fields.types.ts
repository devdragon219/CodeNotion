import { CatalogueTypeFormInput } from '../../../../interfaces/FormInputs/CatalogueType';

export interface CatalogueTypeFieldsStepProps {
  catalogueType: CatalogueTypeFormInput;
  onBack: () => void;
  onChange: (catalogueType: CatalogueTypeFormInput) => void;
  onError: (message?: string) => void;
  onNext: () => void;
}
