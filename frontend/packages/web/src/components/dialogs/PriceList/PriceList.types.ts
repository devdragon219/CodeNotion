import { PriceListFormInput } from '../../../interfaces/FormInputs/PriceList';

export interface PriceListCreateDialogProps {
  onClose: () => void;
  onSave: (value: PriceListFormInput) => void;
}
