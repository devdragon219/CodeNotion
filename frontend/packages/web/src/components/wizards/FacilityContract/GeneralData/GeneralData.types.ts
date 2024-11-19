import { FacilityContractFormInput } from '../../../../interfaces/FormInputs/FacilityContract';

export interface FacilityContractGeneralDataStepProps {
  canUseInternalCode: boolean;
  facilityContract: FacilityContractFormInput;
  onChange: (facilityContract: FacilityContractFormInput) => void;
  onError: () => void;
  onNext: () => void;
}
