import { FacilityContractTemplateFormInput } from '../../../../interfaces/FormInputs/FacilityContractTemplate';

export interface FacilityContractTemplateGeneralDataStepProps {
  canUseInternalCode: boolean;
  facilityContractTemplate: FacilityContractTemplateFormInput;
  onChange: (facilityContractTemplate: FacilityContractTemplateFormInput) => void;
  onError: () => void;
  onNext: () => void;
}
