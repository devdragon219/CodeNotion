import { FacilityContractTemplateFormInput } from '../../../../interfaces/FormInputs/FacilityContractTemplate';

export interface FacilityContractTemplateCatalogueTypesStepProps {
  facilityContractTemplate: FacilityContractTemplateFormInput;
  onBack: () => void;
  onChange: (facilityContractTemplate: FacilityContractTemplateFormInput) => void;
  onError: (error?: boolean | string) => void;
  onNext: () => void;
}
