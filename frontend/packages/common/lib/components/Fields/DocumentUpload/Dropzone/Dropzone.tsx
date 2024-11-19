import { FileUploadTwoTone } from '@mui/icons-material';
import { Box, Button, FormLabel, Typography } from '@mui/material';
import { useId, useMemo } from 'react';
import { ErrorCode, useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';

import { DEFAULT_MAX_FILE_SIZE, DEFAULT_MAX_UPLOADABLE_FILES } from '../../../../configs/defaults';
import { FileType } from '../../../../enums/FileType';
import { parseFileTypesToAccept, parseFileTypesToExtensions } from '../../../../utils/fileUtils';
import { DropzoneProps } from './Dropzone.types';

const Dropzone = ({
  className,
  description,
  disabled,
  fileTypes = Object.values(FileType),
  maxFiles,
  maxSize = DEFAULT_MAX_FILE_SIZE,
  multiple = false,
  availableUploads,
  ...props
}: DropzoneProps) => {
  const { t } = useTranslation();
  const id = useId();
  const { getInputProps, getRootProps, open, fileRejections } = useDropzone({
    ...props,
    accept: parseFileTypesToAccept(fileTypes),
    disabled,
    maxFiles: availableUploads ?? maxFiles,
    maxSize,
    multiple,
    noClick: true,
    noKeyboard: true,
  });

  const rejectionMessage = useMemo(() => {
    const errorCode = fileRejections[0]?.errors?.[0].code as ErrorCode;

    switch (errorCode) {
      case ErrorCode.FileInvalidType:
        return t('common.error.upload_type_invalid');
      case ErrorCode.FileTooLarge:
        return t('common.error.upload_size_exceeded', { maxSize: DEFAULT_MAX_FILE_SIZE / 1000000 });
      case ErrorCode.TooManyFiles:
        if (!multiple && fileRejections.length > 1) {
          return t('common.error.upload_single_exceeded');
        }
        return t('common.error.upload_limit_exceeded', { maxUploads: DEFAULT_MAX_UPLOADABLE_FILES });
      default:
        return null;
    }
  }, [fileRejections, multiple, t]);

  const uploadLimitReached = useMemo(() => availableUploads !== undefined && availableUploads <= 0, [availableUploads]);

  return (
    <Box
      {...getRootProps()}
      sx={(theme) => ({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        py: '30px',
        px: '24px',
        borderColor: rejectionMessage ? theme.palette.danger[300] + '!important' : undefined,
      })}
      className={className}
    >
      <input {...getInputProps({ id })} />
      <FileUploadTwoTone />
      {uploadLimitReached ? (
        <>
          <Box className="title" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h5" sx={{ textAlign: 'center', whiteSpace: 'pre-wrap' }}>
              {t('common.component.document_upload.no_uploads_remaining', { maxUploads: DEFAULT_MAX_UPLOADABLE_FILES })}
            </Typography>
          </Box>
          <Box className="description" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h5" sx={{ textAlign: 'center', whiteSpace: 'pre-wrap' }}>
              {t('common.component.document_upload.further_uploads')}
            </Typography>
          </Box>
        </>
      ) : (
        <>
          <Box className="title" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <FormLabel htmlFor={id}>{t('common.component.document_upload.title')}</FormLabel>
            <Typography variant="bodySm">{t('common.component.document_upload.subtitle')}</Typography>
          </Box>
          <Button color="tertiary" disabled={disabled} variant={disabled ? 'outlined' : 'contained'} onClick={open}>
            {t('common.component.document_upload.select_file')}
          </Button>
          <Box className="description" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {description && (
              <Typography variant="bodySm" sx={{ textAlign: 'center', whiteSpace: 'pre-wrap' }}>
                {t(description)}
              </Typography>
            )}
            <Typography variant="bodySm" sx={{ textAlign: 'center', whiteSpace: 'pre-wrap' }}>
              {t('common.component.document_upload.upload_requirements', {
                extensions: parseFileTypesToExtensions(fileTypes),
                maxSize: `${maxSize / 1000000}MB`,
              })}
            </Typography>
            {rejectionMessage ? (
              <Typography
                variant="h5"
                sx={(theme) => ({
                  color: theme.palette.danger[300],
                  textAlign: 'center',
                  whiteSpace: 'pre-wrap',
                  mt: 2,
                })}
              >
                {rejectionMessage}
              </Typography>
            ) : availableUploads !== undefined ? (
              <Typography
                variant="h5"
                sx={(theme) => ({ color: theme.palette.grey[700], textAlign: 'center', whiteSpace: 'pre-wrap', mt: 2 })}
              >
                {t('common.component.document_upload.uploads_remaining', {
                  remainingUploads: availableUploads,
                  maxUploads: DEFAULT_MAX_UPLOADABLE_FILES,
                })}
              </Typography>
            ) : maxFiles !== undefined ? (
              <Typography
                variant="h5"
                sx={(theme) => ({ color: theme.palette.grey[700], textAlign: 'center', whiteSpace: 'pre-wrap', mt: 2 })}
              >
                {t('common.component.document_upload.max_uploads', {
                  maxUploads: DEFAULT_MAX_UPLOADABLE_FILES,
                })}
              </Typography>
            ) : (
              <></>
            )}
          </Box>
        </>
      )}
    </Box>
  );
};
Dropzone.displayName = 'Dropzone';

export { Dropzone };
