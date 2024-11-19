import { FacilityContractTemplateFormInput } from '../../../interfaces/FormInputs/FacilityContractTemplate';

export interface FacilityContractTemplateCreateDialogProps {
  onClose: () => void;
  onSave: (facilityContractTemplate: FacilityContractTemplateFormInput) => void;
}
