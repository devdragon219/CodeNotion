import { VatRateFormInput } from '../../../interfaces/FormInputs/VatRate';

export interface VatRateDialogProps {
  input?: VatRateFormInput;
  readonly?: boolean;
  onClose: () => void;
  onSave: (value: VatRateFormInput) => void;
}
