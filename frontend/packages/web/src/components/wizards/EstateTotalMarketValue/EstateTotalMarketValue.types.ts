import { EstateTotalMarketValueFormInput } from '../../../interfaces/FormInputs/Estate';

export interface EstateTotalMarketValueDialogProps {
  input?: EstateTotalMarketValueFormInput;
  onClose: () => void;
  onSave: (estateTotalMarketValue: EstateTotalMarketValueFormInput) => void;
}
