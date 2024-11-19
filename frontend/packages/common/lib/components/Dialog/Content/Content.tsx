import { Box } from '@mui/material';

import { DialogContentProps } from './Content.types';

export const DialogContent = ({ action, children, fixedHeight }: DialogContentProps) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box
        sx={{
          flex: 1,
          px: 2,
          ...(fixedHeight ? { height: { xs: 'calc(100% - 80px)', sm: 'calc(100% - 96px)' } } : {}),
        }}
      >
        {children}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: { xs: 2, sm: 3 }, pb: { xs: 2, sm: 3 } }}>
        {action}
      </Box>
    </Box>
  );
};
