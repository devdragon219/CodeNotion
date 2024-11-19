import { EstateFormInput } from '../../../interfaces/FormInputs/Estate';

export interface EstateCreateDialogProps {
  onClose: () => void;
  onSave: (estate: EstateFormInput) => void;
}
