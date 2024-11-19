import { FacilityContractFormInput } from '../../../../interfaces/FormInputs/FacilityContract';

export interface FacilityContractCatalogueTypesStepProps {
  facilityContract: FacilityContractFormInput;
  onBack: () => void;
  onChange: (facilityContract: FacilityContractFormInput) => void;
  onError: (error?: boolean | string) => void;
  onNext: () => void;
}
