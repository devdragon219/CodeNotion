import { CustomFieldType } from '../../gql/types';

export interface FormBuilderFieldFormInput {
  fieldId: string | null;
  fieldType: CustomFieldType;
  guid: string;
  isMandatory: boolean;
  name: string;
  validValues: string[];
}

export interface FormBuilderRowFormInput {
  guid: string;
  fields: FormBuilderFieldFormInput[];
}
