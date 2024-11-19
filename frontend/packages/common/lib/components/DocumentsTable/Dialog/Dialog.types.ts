import { ContentCategoryGroup } from '../../../enums/ContentCategory';
import { FileType } from '../../../enums/FileType';
import { EntryStatus } from '../../../gql/types';
import { DocumentFieldConfig } from '../../../interfaces/DocumentField';
import { DocumentFormInput } from '../../../interfaces/FormInputs/Document';

export interface DocumentDialogProps {
  contentCategoryGroupOptions?: ContentCategoryGroup[];
  entryStatus?: EntryStatus | null;
  existingDocumentNames: string[];
  fieldsConfig?: DocumentFieldConfig[];
  fileTypes?: FileType[];
  input?: DocumentFormInput;
  onClose: () => void;
  onSave: (value: DocumentFormInput | DocumentFormInput[]) => void;
}
