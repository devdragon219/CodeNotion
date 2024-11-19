import { FacilityContractTemplateFormInput } from '../../../../interfaces/FormInputs/FacilityContractTemplate';

export interface FacilityContractTemplateRecapStepProps {
  facilityContractTemplate: FacilityContractTemplateFormInput;
  onBack: () => void;
  onEdit: (step: number) => void;
  onSave: (facilityContractTemplate: FacilityContractTemplateFormInput) => void;
}
