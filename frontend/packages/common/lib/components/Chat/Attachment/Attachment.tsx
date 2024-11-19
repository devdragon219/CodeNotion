import { CancelTwoTone } from '@mui/icons-material';
import { Chip } from '@mui/material';

import { AttachmentProps } from './Attachment.types';

export const Attachment = ({ name, onClick, onDelete }: AttachmentProps) => (
  <Chip
    variant="outlined"
    label={name}
    onClick={onClick}
    onDelete={onDelete}
    sx={(theme) => ({
      borderColor: theme.palette.blue[500],
      color: theme.palette.blue[500],
      height: '24px',
      fontSize: '10px',
      fontWeight: '500',
    })}
    deleteIcon={
      <CancelTwoTone
        sx={(theme) => ({
          color: `${theme.palette.blue[500]} !important`,
          fontSize: '16px !important',
          right: '16px !important',
        })}
      />
    }
  />
);
