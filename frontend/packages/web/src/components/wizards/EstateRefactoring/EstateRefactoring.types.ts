import { EstateRefactoringFormInput } from '../../../interfaces/FormInputs/Estate';

export interface EstateRefactoringDialogInput {
  estateRefactoring: EstateRefactoringFormInput;
  index: number;
}

export interface EstateRefactoringDialogProps {
  estateId: number;
  input?: EstateRefactoringDialogInput;
  onClose: () => void;
  onSave: (estateRefactoring: EstateRefactoringFormInput, index?: number) => void;
}
