import { Box, CSSObject, Drawer, Theme } from '@mui/material';

import {
  DEFAULT_CLOSE_DRAWER_WIDTH,
  DEFAULT_CLOSE_DRAWER_WIDTH_LOW_VIEWPORT,
  DEFAULT_DRAWER_TRANSITION_MS,
  DEFAULT_HEADER_HEIGHT,
  DEFAULT_OPEN_DRAWER_WIDTH,
  DEFAULT_OPEN_DRAWER_WIDTH_LOW_VIEWPORT,
} from '../../../configs/defaults';
import { DesktopDrawerProps } from './DesktopDrawer.types';

const openedMixin = (theme: Theme): CSSObject => ({
  width: `${DEFAULT_OPEN_DRAWER_WIDTH}px`,
  borderRight: 'none',
  zIndex: 1099,
  overflowX: 'hidden',
  boxShadow: 'none',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: DEFAULT_DRAWER_TRANSITION_MS,
  }),
  [theme.breakpoints.down('lg')]: {
    width: `${DEFAULT_OPEN_DRAWER_WIDTH_LOW_VIEWPORT}px`,
  },
});

const closedMixin = (theme: Theme): CSSObject => ({
  borderRight: 'none',
  zIndex: 1099,
  overflowX: 'hidden',
  width: `${DEFAULT_CLOSE_DRAWER_WIDTH}px`,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: DEFAULT_DRAWER_TRANSITION_MS,
  }),
  [theme.breakpoints.down('lg')]: {
    width: `${DEFAULT_CLOSE_DRAWER_WIDTH_LOW_VIEWPORT}px`,
  },
});

export const DesktopDrawer = ({ children, open }: DesktopDrawerProps) => (
  <Drawer
    variant="permanent"
    sx={(theme) => ({
      borderRight: '0px',
      flexShrink: 0,
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
      }),
      ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
      }),
    })}
  >
    <Box
      sx={{
        height: `calc(100vh - ${DEFAULT_HEADER_HEIGHT}px)`,
        marginTop: `${DEFAULT_HEADER_HEIGHT}px`,
        overflowY: 'auto',
        scrollbarGutter: 'stable',
      }}
    >
      <Box
        sx={(theme) => ({
          px: 1.5,
          [theme.breakpoints.up('lg')]: {
            px: 2,
          },
        })}
      >
        {children}
      </Box>
    </Box>
  </Drawer>
);
