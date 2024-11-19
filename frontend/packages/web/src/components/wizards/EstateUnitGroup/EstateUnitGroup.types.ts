import { EstateUnitGroupFormInput } from '../../../interfaces/FormInputs/EstateUnitGroup';

export interface EstateUnitGroupCreateDialogProps {
  onClose: () => void;
  onSave: (value: EstateUnitGroupFormInput) => void;
}
