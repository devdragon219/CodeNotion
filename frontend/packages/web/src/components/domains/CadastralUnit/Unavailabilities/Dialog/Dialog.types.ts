import { CadastralUnavailabilityFormInput } from '../../../../../interfaces/FormInputs/CadastralUnit';

export interface UnavailabilityDialogInput {
  unavailability: CadastralUnavailabilityFormInput;
  index: number;
}

export interface UnavailabilityDialogProps {
  input?: UnavailabilityDialogInput;
  onClose: () => void;
  onSave: (value: CadastralUnavailabilityFormInput[] | UnavailabilityDialogInput) => void;
}
