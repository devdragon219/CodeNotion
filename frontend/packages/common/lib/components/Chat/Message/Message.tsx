import { Stack, Typography } from '@mui/material';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { DEFAULT_BORDER_RADIUS } from '../../../configs/defaults';
import { useAuth } from '../../../contexts/auth/hook';
import { DocumentFormInput } from '../../../interfaces/FormInputs/Document';
import { parseDateToLocalizedString } from '../../../utils/dateUtils';
import { getDocumentDownloadUrl } from '../../../utils/documentsTable/documentsTableUtils';
import { Slider } from '../../Slider/Slider';
import { Attachment } from '../Attachment/Attachment';
import { MessageProps } from './Message.types';

export const Message = ({ message }: MessageProps) => {
  const {
    i18n: { language },
  } = useTranslation();
  const { user } = useAuth();

  const images = useMemo(
    () =>
      message.attachments.images.reduce<string[]>((acc, row) => {
        const { cmisId, entityId } = row;
        const url = getDocumentDownloadUrl(cmisId, entityId);
        if (url) return [...acc, url];
        return acc;
      }, []),
    [message.attachments.images],
  );

  const handleDownloadDocument = useCallback(
    (document: DocumentFormInput) => () => {
      const { cmisId, entityId } = document;
      const url = getDocumentDownloadUrl(cmisId, entityId);
      if (url) {
        window.open(url, '_blank');
      }
    },
    [],
  );

  return (
    <Stack
      spacing={0.5}
      sx={(theme) => ({
        backgroundColor: message.user.userName === user?.username ? theme.palette.blue[10] : theme.palette.grey[200],
        borderRadius: `${DEFAULT_BORDER_RADIUS}px`,
        p: 2,
      })}
    >
      <Typography variant="h5" sx={(theme) => ({ color: theme.palette.grey[800] })}>
        {message.user.fullName}
      </Typography>
      <Typography variant="bodySm" sx={(theme) => ({ color: theme.palette.grey[800] })}>
        {message.text}
      </Typography>
      {images.length !== 0 && <Slider images={images} useExpand />}
      {message.attachments.documents.length !== 0 && (
        <Stack direction="row" spacing={1} sx={{ px: 2, pb: 1 }}>
          {message.attachments.documents.map((document, index) => (
            <Attachment key={index} name={document.fileName} onClick={handleDownloadDocument(document)} />
          ))}
        </Stack>
      )}
      <Typography variant="caption" sx={(theme) => ({ color: theme.palette.grey[500], textAlign: 'right' })}>
        {parseDateToLocalizedString(message.timestamp, language, {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })}
      </Typography>
    </Stack>
  );
};
