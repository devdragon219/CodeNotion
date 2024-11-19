import { AdministrationTermFormInput } from '../../../../interfaces/FormInputs/AdministrationTerm';

export interface AdministrationTermInstallmentsStepProps {
  administrationTerm: AdministrationTermFormInput;
  onBack: () => void;
  onChange: (administrationTern: AdministrationTermFormInput) => void;
  onError: () => void;
  onNext: () => void;
}
