import { AdministrationTermFormInput } from '../../../../interfaces/FormInputs/AdministrationTerm';

export interface AdministrationTermRecapStepProps {
  administrationTerm: AdministrationTermFormInput;
  onBack: () => void;
  onEdit: (step: number) => void;
  onSave: (administrationTerm: AdministrationTermFormInput) => void;
}
