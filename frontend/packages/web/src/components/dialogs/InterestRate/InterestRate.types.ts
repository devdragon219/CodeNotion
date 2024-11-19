import { InterestRateFormInput } from '../../../interfaces/FormInputs/InterestRate';

export interface InterestRateDialogProps {
  input?: InterestRateFormInput;
  readonly?: boolean;
  onClose: () => void;
  onSave: (value: InterestRateFormInput) => void;
}
