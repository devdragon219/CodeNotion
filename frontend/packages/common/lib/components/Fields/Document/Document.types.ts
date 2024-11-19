import { ParseKeys } from 'i18next';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

import { ContentCategoryGroup } from '../../../enums/ContentCategory';
import { FileType } from '../../../enums/FileType';
import { ContentCategory } from '../../../gql/types';
import { DocumentFieldConfig } from '../../../interfaces/DocumentField';
import { DocumentFormInput } from '../../../interfaces/FormInputs/Document';

interface BaseDocumentFieldProps {
  contentCategoryGroupOptions?: ContentCategoryGroup[];
  excludedContentCategoryOptions?: ContentCategory[];
  description?: ParseKeys;
  errors?: Merge<FieldError, FieldErrorsImpl<DocumentFormInput[]>>;
  fieldsConfig?: DocumentFieldConfig[];
  fileTypes?: FileType[];
  label?: ParseKeys;
  readonly?: boolean;
  useDocumentTable?: boolean;
  maxFileSize?: number;
  maxFiles?: number;
  availableUploads?: number;
}

export interface SingleDocumentFieldProps extends BaseDocumentFieldProps {
  index: number;
  multiple?: false;
  value: DocumentFormInput;
  onChange?: (value: DocumentFormInput) => void;
}

interface MultipleDocumentFieldProps extends BaseDocumentFieldProps {
  index?: 0;
  multiple: true;
  value: DocumentFormInput[];
  onChange?: (value: DocumentFormInput[]) => void;
}

export type DocumentFieldProps = SingleDocumentFieldProps | MultipleDocumentFieldProps;
