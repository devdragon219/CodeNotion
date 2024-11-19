import { FacilityContractFormInput } from '../../../../interfaces/FormInputs/FacilityContract';

export interface FacilityContractPenaltiesStepProps {
  facilityContract: FacilityContractFormInput;
  onAddPenalties: () => void;
  onBack: () => void;
  onChange: (facilityContract: FacilityContractFormInput) => void;
  onError: (error?: boolean | string) => void;
  onNext: () => void;
  onOpenCalendar: () => void;
}
