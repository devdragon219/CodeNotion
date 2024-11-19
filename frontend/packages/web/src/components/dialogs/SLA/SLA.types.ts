import { SlaFormInput } from '../../../interfaces/FormInputs/SLA';

export interface SlaCreateDialogProps {
  contractInternalCode?: string;
  onClose: () => void;
  onSave: (value: SlaFormInput[]) => void;
}
