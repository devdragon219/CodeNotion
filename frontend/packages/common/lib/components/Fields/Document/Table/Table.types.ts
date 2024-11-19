import { DocumentFieldConfig } from '../../../../interfaces/DocumentField';
import { DocumentFormInput } from '../../../../interfaces/FormInputs/Document';

export interface DocumentFieldTableProps {
  fieldsConfig?: DocumentFieldConfig[];
  rows: DocumentFormInput[];
  onDelete?: (row: DocumentFormInput) => void;
}
