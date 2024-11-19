import { FacilityContractFormInput } from '../../../interfaces/FormInputs/FacilityContract';

export interface FacilityContractCreateDialogProps {
  onClose: () => void;
  onSave: (facilityContract: FacilityContractFormInput) => void;
}
