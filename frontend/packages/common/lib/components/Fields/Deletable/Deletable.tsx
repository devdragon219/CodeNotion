import { DeleteTwoTone } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';

import { DeletableFieldProps } from './Deletable.types';

export const DeletableField = ({ children, iconPositionAbsolute = true, onDelete }: DeletableFieldProps) => (
  <Box sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
    <Box
      sx={(theme) => ({
        paddingRight: '16px',
        marginRight: '8px',
        borderRight: `1px solid ${theme.palette.divider}`,
        flex: 1,
        [theme.breakpoints.up('md')]: iconPositionAbsolute && {
          marginRight: '-16px',
        },
      })}
    >
      {children}
    </Box>
    <IconButton
      sx={(theme) => ({
        [theme.breakpoints.up('md')]: iconPositionAbsolute && {
          position: 'absolute',
          right: '-56px',
          top: 'calc(50% - 16px)',
        },
      })}
      onClick={onDelete}
    >
      <DeleteTwoTone />
    </IconButton>
  </Box>
);
