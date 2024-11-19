import { FormBuilderRowFormInput } from '../../interfaces/FormInputs/FormBuilder';

export interface FormBuilderProps {
  disabled?: boolean;
  readonly?: boolean;
  value?: FormBuilderRowFormInput[];
  onChange?: (value: FormBuilderRowFormInput[]) => void;
}
