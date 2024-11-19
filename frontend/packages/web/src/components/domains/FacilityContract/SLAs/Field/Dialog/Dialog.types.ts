import { SlaFormInput } from '../../../../../../interfaces/FormInputs/SLA';

export interface FacilityContractSlasDialogProps {
  facilityContractId: number | null;
  internalCode: string;
  slas: SlaFormInput[];
  onClose: () => void;
  onSave: (slas: SlaFormInput[]) => void;
}
