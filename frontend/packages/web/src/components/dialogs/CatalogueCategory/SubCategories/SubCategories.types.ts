import { FormMode } from '@realgimm5/frontend-common/enums';

import { CatalogueCategoryFormInput } from '../../../../interfaces/FormInputs/CatalogueCategory';

export interface CatalogueCategorySubCategoriesDialogProps {
  input: CatalogueCategoryFormInput;
  mode: FormMode;
  readonly?: boolean;
  useSubCategories: boolean;
  onClose: () => void;
  onSave?: (value: CatalogueCategoryFormInput) => void;
}
