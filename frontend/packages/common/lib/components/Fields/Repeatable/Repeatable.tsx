import { Box } from '@mui/material';

import { DeletableField } from '../Deletable/Deletable';
import { RepeatableFieldProps } from './Repeatable.types';

export const RepeatableField = ({ children, iconPositionAbsolute = true, index, onDelete }: RepeatableFieldProps) =>
  onDelete ? (
    <DeletableField
      iconPositionAbsolute={iconPositionAbsolute}
      onDelete={() => {
        onDelete(index);
      }}
    >
      {children}
    </DeletableField>
  ) : (
    <Box>{children}</Box>
  );
