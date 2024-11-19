import { FacilityContractFormInput } from '../../../../../interfaces/FormInputs/FacilityContract';

export interface FacilityContractSlasFieldSubStepProps {
  facilityContract: FacilityContractFormInput;
  onAddSlas: () => void;
  onBack: () => void;
  onChange: (facilityContract: FacilityContractFormInput) => void;
  onError: (error?: boolean | string) => void;
  onNext: () => void;
  onOpenCalendar: () => void;
}
