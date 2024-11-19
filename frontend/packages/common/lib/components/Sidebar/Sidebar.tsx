import { Box, Theme, useMediaQuery } from '@mui/material';
import { useMemo } from 'react';

import { useAuth } from '../../contexts/auth/hook';
import { MenuItem } from '../../interfaces/Menu';
import { Menu } from '../Menu/Menu';
import { DesktopDrawer } from './DesktopDrawer/DesktopDrawer';
import { MobileDrawer } from './MobileDrawer/MobileDrawer';
import { SidebarProps } from './Sidebar.types';

export const Sidebar = ({ menu, open, unsupportedFeatures = [], onClose }: SidebarProps) => {
  const { permissions } = useAuth();
  const matchDownMd = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  const items = useMemo(() => {
    const removeUnauthorizedItems = (items: MenuItem[]): MenuItem[] => {
      const features = Object.keys(permissions).filter((featureCode) => !unsupportedFeatures.includes(featureCode));
      return items
        .filter((item) => {
          switch (item.type) {
            case 'group':
              return !item.features || item.features.some((feature) => features.includes(feature));
            case 'link':
              return !item.feature || features.includes(item.feature);
          }
        })
        .map((item) => {
          switch (item.type) {
            case 'group':
              return {
                ...item,
                children: removeUnauthorizedItems(item.children),
              };
            case 'link':
              return item;
          }
        });
    };

    return menu.map((config) => ({
      ...config,
      children: removeUnauthorizedItems(config.children),
    }));
  }, [menu, permissions, unsupportedFeatures]);

  return (
    <Box component="nav" sx={{ flexShrink: { md: 0 } }} aria-label="mailbox folders">
      {matchDownMd ? (
        <MobileDrawer open={open} onClose={onClose}>
          <Menu items={items} open={open} onClose={onClose} />
        </MobileDrawer>
      ) : (
        <DesktopDrawer open={open}>
          <Menu items={items} open={open} />
        </DesktopDrawer>
      )}
    </Box>
  );
};
