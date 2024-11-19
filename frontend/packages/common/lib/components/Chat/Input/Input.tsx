import { AttachmentOutlined, ImageOutlined, SendOutlined } from '@mui/icons-material';
import { Box, Divider, IconButton, InputAdornment, Stack } from '@mui/material';
import { ChangeEvent, useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { DEFAULT_BORDER_RADIUS } from '../../../configs/defaults';
import { FileType } from '../../../enums/FileType';
import { TextField } from '../../Fields/Text/Text';
import { Attachment } from '../Attachment/Attachment';
import { InputProps } from './Input.types';

const ImageFileTypes = [
  FileType.ImageGif,
  FileType.ImageJpeg,
  FileType.ImagePng,
  FileType.ImageSvg,
  FileType.ImageTiff,
];
export const Input = ({ disabled, onSend }: InputProps) => {
  const { t } = useTranslation();
  const [attachments, setAttachments] = useState<File[]>([]);
  const [message, setMessage] = useState('');
  const documentInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setAttachments((files) => [...files, ...(e.target.files ?? [])]);
  }, []);

  const handleFileRemove = useCallback(
    (index: number) => () => {
      setAttachments((files) => files.filter((_, idx) => idx !== index));
    },
    [],
  );

  const handleDocumentUpload = useCallback(() => {
    documentInputRef.current?.click();
  }, []);

  const handleImageUpload = useCallback(() => {
    imageInputRef.current?.click();
  }, []);

  const handleSend = useCallback(() => {
    onSend(message, attachments);
  }, [attachments, message, onSend]);

  return (
    <Box
      sx={(theme) => ({
        backgroundColor: theme.palette.background.default,
        borderRadius: `${DEFAULT_BORDER_RADIUS}px`,
      })}
    >
      <input
        type="file"
        multiple
        accept={ImageFileTypes.join(',')}
        ref={imageInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <input
        type="file"
        multiple
        accept={Object.values(FileType)
          .filter((it) => !ImageFileTypes.includes(it))
          .join(',')}
        ref={documentInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <TextField
        variant="standard"
        value={message}
        onChange={setMessage}
        disabled={disabled}
        placeholder={t('common.component.chat.field.message')}
        slotProps={{
          input: {
            endAdornment: !disabled && (
              <InputAdornment position="end" sx={{ marginLeft: 0, marginRight: 2 }}>
                <Stack direction="row" spacing={1.5}>
                  <IconButton size="small" onClick={handleImageUpload}>
                    <ImageOutlined sx={(theme) => ({ color: theme.palette.grey[700] })} />
                  </IconButton>
                  <IconButton size="small" onClick={handleDocumentUpload}>
                    <AttachmentOutlined sx={(theme) => ({ color: theme.palette.grey[700] })} />
                  </IconButton>
                  <Divider orientation="vertical" flexItem sx={(theme) => ({ borderColor: theme.palette.blue[50] })} />
                  <IconButton
                    size="small"
                    disabled={message.trim() === '' && attachments.length === 0}
                    onClick={handleSend}
                  >
                    <SendOutlined sx={(theme) => ({ color: theme.palette.blue[500] })} />
                  </IconButton>
                </Stack>
              </InputAdornment>
            ),
          },
        }}
      />
      {attachments.length !== 0 && (
        <Stack direction="row" spacing={1} sx={{ px: 2, pb: 1 }}>
          {attachments.map((file, index) => (
            <Attachment key={index} name={file.name} onDelete={handleFileRemove(index)} />
          ))}
        </Stack>
      )}
    </Box>
  );
};
