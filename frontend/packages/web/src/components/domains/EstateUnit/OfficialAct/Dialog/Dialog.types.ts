import { EstateUnitOfficialActFormInput } from '../../../../../interfaces/FormInputs/EstateUnit';

export interface OfficialActDialogProps {
  onClose: () => void;
  onSave: (value: EstateUnitOfficialActFormInput) => void;
}
