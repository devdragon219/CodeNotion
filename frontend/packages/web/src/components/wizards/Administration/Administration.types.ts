import { AdministrationsFormInput } from '../../../interfaces/FormInputs/Administration';

export interface AdministrationCreateDialogProps {
  onClose: () => void;
  onSave: (administration: AdministrationsFormInput) => void;
}
