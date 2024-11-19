import { CatalogueCategoryFormInput } from '../../../interfaces/FormInputs/CatalogueCategory';

export interface CatalogueCategoryDialogProps {
  onClose: () => void;
  onSave: (catalogueCategory: CatalogueCategoryFormInput) => void;
}
