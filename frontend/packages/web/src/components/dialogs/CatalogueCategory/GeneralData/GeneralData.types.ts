import { CatalogueCategoryFormInput } from '../../../../interfaces/FormInputs/CatalogueCategory';

export interface CatalogueCategoryGeneralDataDialogProps {
  onClose: () => void;
  onSave: (value: CatalogueCategoryFormInput) => void;
}
