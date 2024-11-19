import { FormControlProps } from '@mui/material';
import { ParseKeys } from 'i18next';
import { DropzoneOptions } from 'react-dropzone';

import { FileType } from '../../../../enums/FileType';

export interface DropzoneProps extends DropzoneOptions, Pick<FormControlProps, 'error' | 'required' | 'className'> {
  description?: ParseKeys;
  fileTypes?: FileType[];
  helperText?: string;
  availableUploads?: number;
}
