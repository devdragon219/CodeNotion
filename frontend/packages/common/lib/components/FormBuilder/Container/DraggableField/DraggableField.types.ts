import { FormBuilderFieldFormInput } from '../../../../interfaces/FormInputs/FormBuilder';

export interface FormBuilderContainerDraggableFieldProps {
  disabled?: boolean;
  field: FormBuilderFieldFormInput;
  index: [number, number];
  readonly?: boolean;
  onChange: (field: FormBuilderFieldFormInput | null) => void;
}
