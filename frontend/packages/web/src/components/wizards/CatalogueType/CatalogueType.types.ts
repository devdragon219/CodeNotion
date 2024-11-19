import { CatalogueTypeFormInput } from '../../../interfaces/FormInputs/CatalogueType';

export interface CatalogueTypeCreateDialogProps {
  onClose: () => void;
  onSave: (catalogueType: CatalogueTypeFormInput) => void;
}
