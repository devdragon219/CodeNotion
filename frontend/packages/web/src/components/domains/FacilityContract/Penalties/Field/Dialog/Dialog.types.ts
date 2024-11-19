import { PenaltyFormInput } from '../../../../../../interfaces/FormInputs/Penalty';

export interface FacilityContractPenaltiesDialogProps {
  facilityContractId: number | null;
  internalCode: string;
  penalties: PenaltyFormInput[];
  onClose: () => void;
  onSave: (penalties: PenaltyFormInput[]) => void;
}
