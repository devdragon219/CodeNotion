import { PenaltyFormInput } from '../../../../../../interfaces/FormInputs/Penalty';

export interface FacilityContractTemplatePenaltiesDialogProps {
  penalties: PenaltyFormInput[];
  onClose: () => void;
  onSave: (penalties: PenaltyFormInput[]) => void;
}
