import { CustomFieldType } from '../../../gql/types';

export interface FormBuilderFieldProps {
  disabled?: boolean;
  overlay?: boolean;
  type: CustomFieldType;
}
