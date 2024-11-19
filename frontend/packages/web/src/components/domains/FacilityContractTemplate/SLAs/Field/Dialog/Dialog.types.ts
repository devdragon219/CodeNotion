import { SlaFormInput } from '../../../../../../interfaces/FormInputs/SLA';

export interface FacilityContractTemplateSlasDialogProps {
  slas: SlaFormInput[];
  onClose: () => void;
  onSave: (slas: SlaFormInput[]) => void;
}
