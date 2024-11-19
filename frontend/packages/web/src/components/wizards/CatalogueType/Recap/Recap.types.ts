import { CatalogueTypeFormInput } from '../../../../interfaces/FormInputs/CatalogueType';

export interface CatalogueTypeRecapStepProps {
  catalogueType: CatalogueTypeFormInput;
  onBack: () => void;
  onEdit: (step: number) => void;
  onSave: (catalogueType: CatalogueTypeFormInput) => void;
}
