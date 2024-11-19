import { InterventionTypeFormInput } from '../../../interfaces/FormInputs/InterventionType';

export interface InterventionTypeDialogProps {
  input?: InterventionTypeFormInput;
  readonly?: boolean;
  onClose: () => void;
  onSave: (value: InterventionTypeFormInput) => void;
}
