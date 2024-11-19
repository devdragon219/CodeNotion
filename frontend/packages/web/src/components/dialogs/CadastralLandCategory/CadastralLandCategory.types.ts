import { CadastralLandCategoryFormInput } from '../../../interfaces/FormInputs/CadastralLandCategory';

export interface CadastralLandCategoryDialogProps {
  input?: CadastralLandCategoryFormInput;
  readonly?: boolean;
  onClose: () => void;
  onSave: (value: CadastralLandCategoryFormInput) => void;
}
