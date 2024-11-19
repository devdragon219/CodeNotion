import { EstateRefactoringFormInput } from '../../../../interfaces/FormInputs/Estate';

export interface EstateRefactoringEstateUnitsStepProps {
  estateId: number;
  estateRefactoring: EstateRefactoringFormInput;
  index?: number;
  onBack: () => void;
  onChange: (estateRefactoring: EstateRefactoringFormInput) => void;
  onError: (message?: string) => void;
  onSave: (estateRefactoring: EstateRefactoringFormInput, index?: number) => void;
}
