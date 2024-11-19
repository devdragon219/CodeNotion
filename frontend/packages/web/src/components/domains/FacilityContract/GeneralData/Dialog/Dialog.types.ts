import { FacilityContractFrameworkAgreementFormInput } from '../../../../../interfaces/FormInputs/FacilityContract';

export interface FrameworkAgreementDialogInput {
  frameworkAgreement: FacilityContractFrameworkAgreementFormInput;
  index: number;
}

export interface FrameworkAgreementDialogProps {
  input?: FrameworkAgreementDialogInput;
  onClose: () => void;
  onSave: (value: FacilityContractFrameworkAgreementFormInput[] | FrameworkAgreementDialogInput) => void;
}
