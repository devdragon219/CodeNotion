import { FacilityContractTemplateFormInput } from '../../../../interfaces/FormInputs/FacilityContractTemplate';

export interface FacilityContractTemplateSlasStepProps {
  facilityContractTemplate: FacilityContractTemplateFormInput;
  onAddSlas: () => void;
  onBack: () => void;
  onChange: (facilityContractTemplate: FacilityContractTemplateFormInput) => void;
  onError: (error?: boolean | string) => void;
  onNext: () => void;
  onOpenCalendar: () => void;
}
