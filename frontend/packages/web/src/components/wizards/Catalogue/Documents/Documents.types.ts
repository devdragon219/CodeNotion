import { CatalogueFormInput } from '../../../../interfaces/FormInputs/Catalogue';

export interface CatalogueDocumentsStepProps {
  catalogue: CatalogueFormInput;
  onBack: () => void;
  onChange: (catalogue: CatalogueFormInput) => void;
  onError: () => void;
  onNext: () => void;
}
