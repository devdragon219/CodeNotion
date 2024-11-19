import { CatalogueFormInput } from '../../../../interfaces/FormInputs/Catalogue';

export interface CatalogueRecapStepProps {
  catalogue: CatalogueFormInput;
  onBack: () => void;
  onEdit: (step: number) => void;
  onSave: (catalogue: CatalogueFormInput) => void;
}
