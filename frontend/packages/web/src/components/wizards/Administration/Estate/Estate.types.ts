import { AdministrationsFormInput } from '../../../../interfaces/FormInputs/Administration';

export interface AdministrationEstateStepProps {
  administration: AdministrationsFormInput;
  onChange: (administration: AdministrationsFormInput) => void;
  onError: (message?: string) => void;
  onNext: () => void;
}
