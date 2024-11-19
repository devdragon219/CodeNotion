import { EstateFormInput } from '../../../../interfaces/FormInputs/Estate';

export interface EstateDocumentsStepProps {
  estate: EstateFormInput;
  onBack: () => void;
  onChange: (estate: EstateFormInput) => void;
  onError: () => void;
  onNext: () => void;
}
