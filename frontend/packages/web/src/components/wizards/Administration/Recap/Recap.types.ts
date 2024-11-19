import { AdministrationsFormInput } from '../../../../interfaces/FormInputs/Administration';

export interface AdministrationRecapStepProps {
  administration: AdministrationsFormInput;
  onBack: () => void;
  onEdit: (step: number) => void;
  onSave: (administration: AdministrationsFormInput) => void;
}
