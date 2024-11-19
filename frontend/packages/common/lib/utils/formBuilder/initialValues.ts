import { CustomFieldType } from '../../gql/types';
import { FormBuilderFieldFormInput } from '../../interfaces/FormInputs/FormBuilder';

export const getEmptyFormBuilderFieldFormInput = (fieldType: CustomFieldType): FormBuilderFieldFormInput => ({
  fieldId: null,
  fieldType,
  guid: crypto.randomUUID(),
  isMandatory: false,
  name: '',
  validValues: [],
});

export const getPlaceholderFormBuilderFieldFormInput = (): FormBuilderFieldFormInput => ({
  fieldId: 'placeholder',
  fieldType: CustomFieldType.SimpleText,
  guid: crypto.randomUUID(),
  isMandatory: false,
  name: '',
  validValues: [],
});
