import { FormControlProps } from '@mui/material';
import { ParseKeys } from 'i18next';
import { ForwardedRef } from 'react';
import { DropzoneOptions } from 'react-dropzone';

import { FileType } from '../../../enums/FileType';
import { DocumentFormInput } from '../../../interfaces/FormInputs/Document';

export type DocumentUploadValue<Multiple extends boolean | undefined = undefined> = Multiple extends true
  ? DocumentFormInput[]
  : DocumentFormInput | null;

export interface DocumentUploadFieldProps<Multiple extends boolean | undefined = undefined>
  extends Pick<DropzoneOptions, 'disabled' | 'maxSize' | 'maxFiles'>,
    Pick<FormControlProps, 'error' | 'required'> {
  ref?: ForwardedRef<HTMLDivElement>;
  availableUploads?: number;
  description?: ParseKeys;
  fileTypes?: FileType[];
  helperText?: string;
  label?: ParseKeys;
  multiple?: Multiple;
  readonly?: boolean;
  value?: DocumentUploadValue<Multiple>;
  onChange?: (value: DocumentUploadValue<Multiple>) => void;
}
