import { EstateRefactoringFormInput } from '../../../../interfaces/FormInputs/Estate';

export interface EstateRefactoringGeneralDataStepProps {
  estateRefactoring: EstateRefactoringFormInput;
  onChange: (estateRefactoring: EstateRefactoringFormInput) => void;
  onError: () => void;
  onNext: () => void;
}
