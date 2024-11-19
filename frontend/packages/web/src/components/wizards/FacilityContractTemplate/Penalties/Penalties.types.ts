import { FacilityContractTemplateFormInput } from '../../../../interfaces/FormInputs/FacilityContractTemplate';

export interface FacilityContractTemplatePenaltiesStepProps {
  facilityContractTemplate: FacilityContractTemplateFormInput;
  onAddPenalties: () => void;
  onBack: () => void;
  onChange: (facilityContractTemplate: FacilityContractTemplateFormInput) => void;
  onError: (error?: boolean | string) => void;
  onNext: () => void;
  onOpenCalendar: () => void;
}
