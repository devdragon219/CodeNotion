import { Box, FormControl, FormHelperText, Typography } from '@mui/material';
import classNames from 'classnames';
import { ForwardedRef, ReactElement, forwardRef, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { DEFAULT_MAX_FILE_SIZE } from '../../../configs/defaults';
import { useAuth } from '../../../contexts/auth/hook';
import { DocumentFormInput } from '../../../interfaces/FormInputs/Document';
import { getEmptyDocumentFormInput } from '../../../utils/documentField/initialValues';
import { DocumentUploadFieldProps, DocumentUploadValue } from './DocumentUpload.types';
import { Dropzone } from './Dropzone/Dropzone';

const DocumentUploadField = <Multiple extends boolean | undefined>(
  {
    multiple = false,
    availableUploads,
    maxSize = DEFAULT_MAX_FILE_SIZE,
    maxFiles,
    readonly,
    value,
    onChange,
    disabled,
    error,
    required,
    label,
    helperText,
    ...props
  }: DocumentUploadFieldProps<Multiple>,
  ref: ForwardedRef<HTMLDivElement>,
) => {
  const { user } = useAuth();
  const { t } = useTranslation();

  const isUploadLimitReached = useMemo(
    () => availableUploads !== undefined && availableUploads <= 0,
    [availableUploads],
  );

  const parseFileToDocumentFormInput = useCallback(
    (file: File, value?: DocumentFormInput | null): DocumentFormInput => ({
      ...(value ?? getEmptyDocumentFormInput(user?.username)),
      content: file,
      fileName: file.name,
      mimeType: file.type,
    }),
    [user?.username],
  );

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (multiple) {
        const change = [
          ...(value as DocumentFormInput[]),
          ...acceptedFiles.map((file) => parseFileToDocumentFormInput(file)),
        ] as DocumentUploadValue<Multiple>;
        onChange?.(change);
      } else {
        const change = (
          acceptedFiles.length
            ? parseFileToDocumentFormInput(acceptedFiles[0], value as DocumentFormInput | null)
            : null
        ) as DocumentUploadValue<Multiple>;
        onChange?.(change);
      }
    },
    [multiple, value, parseFileToDocumentFormInput, onChange],
  );

  if (readonly || (!multiple && (value as DocumentFormInput | null)?.content)) {
    return null;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {label && (
        <Typography variant="body2" sx={{ pl: 2, pb: 2 }}>
          {t(label)}
        </Typography>
      )}
      <FormControl
        disabled={disabled}
        error={error}
        ref={ref}
        required={required}
        className={classNames('file-upload', {
          'Mui-disabled': disabled,
          'Mui-error': error,
        })}
        fullWidth
      >
        <Dropzone
          className={classNames('dropzone', { 'Mui-disabled': isUploadLimitReached })}
          {...props}
          maxSize={maxSize}
          maxFiles={maxFiles}
          multiple={multiple}
          onDrop={handleDrop}
          disabled={disabled}
          availableUploads={availableUploads}
        />
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    </Box>
  );
};
DocumentUploadField.displayName = 'DocumentUploadField';

const ForwardedDocumentUploadField = forwardRef(DocumentUploadField) as <
  Multiple extends boolean | undefined = undefined,
>(
  props: DocumentUploadFieldProps<Multiple>,
  ref: ForwardedRef<HTMLDivElement>,
) => ReactElement;

export { ForwardedDocumentUploadField as DocumentUploadField };
