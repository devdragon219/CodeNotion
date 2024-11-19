import { Box, Drawer } from '@mui/material';

import { DEFAULT_OPEN_DRAWER_WIDTH } from '../../../configs/defaults';
import { MobileDrawerProps } from './MobileDrawer.types';

export const MobileDrawer = ({ children, open, onClose }: MobileDrawerProps) => (
  <Drawer
    variant="temporary"
    anchor="left"
    open={open}
    onClose={onClose}
    sx={{
      '& .MuiDrawer-paper': {
        mt: 0,
        zIndex: 1099,
        width: DEFAULT_OPEN_DRAWER_WIDTH,
        borderRight: 'none',
      },
    }}
    ModalProps={{ keepMounted: true }}
    color="inherit"
  >
    <Box
      sx={{
        paddingLeft: 3,
        paddingRight: 3,
      }}
    >
      {children}
    </Box>
  </Drawer>
);
