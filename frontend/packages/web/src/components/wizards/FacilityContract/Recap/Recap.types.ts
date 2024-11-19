import { FacilityContractFormInput } from '../../../../interfaces/FormInputs/FacilityContract';

export interface FacilityContractRecapStepProps {
  facilityContract: FacilityContractFormInput;
  onBack: () => void;
  onEdit: (step: number) => void;
  onSave: (facilityContract: FacilityContractFormInput) => void;
}
