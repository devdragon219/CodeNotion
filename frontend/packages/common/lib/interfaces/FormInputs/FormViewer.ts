import { CustomFieldType } from '../../gql/types';
import { SelectOption } from '../SelectOption';

export interface FormViewerFieldFormInput {
  fieldType: CustomFieldType;
  isMandatory: boolean;
  label?: string;
  name: string;
  templateTypeId: string;
  validValues: SelectOption<string>[];
  value: string;
}

export interface FormViewerFieldValues {
  fields: FormViewerFieldFormInput[][];
}
