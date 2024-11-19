import { FiberManualRecord } from '@mui/icons-material';
import { Box, ListItemButton, ListItemIcon, ListItemText, Theme, Typography, useMediaQuery } from '@mui/material';
import classNames from 'classnames';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

import { isCurrentRoute } from '../../../utils/navigationUtils';
import { MenuListItemProps } from './Item.types';

export const MenuListItem = ({ item, level, drawerOpen, onClose }: MenuListItemProps) => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const matchDownMd = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  const isSelected = useMemo(() => isCurrentRoute(pathname, item.url, item.match), [item.match, item.url, pathname]);

  return (
    <Box
      sx={{
        zIndex: 1201,
        ...((matchDownMd || drawerOpen) && {
          mb: 0.5,
          pl: `${level * 24}px`,
        }),
      }}
    >
      <ListItemButton
        className={classNames('MuiListItemButton-menuItem', {
          open: drawerOpen,
        })}
        component={Link}
        to={item.url}
        onClick={onClose}
        target={item.external ? '_blank' : undefined}
        disabled={item.disabled}
        disableRipple={!drawerOpen}
        selected={isSelected}
        sx={{
          gap: '12px',
          ...((matchDownMd || drawerOpen) && {
            minHeight: '48px',
          }),
          ...(!matchDownMd &&
            !drawerOpen && {
              py: 0,
              px: 0.75,
            }),
        }}
      >
        {(matchDownMd || drawerOpen) && (
          <ListItemIcon sx={{ minWidth: 0 }}>
            <FiberManualRecord
              sx={{
                width: 5,
                height: 5,
                fontSize: '5px',
              }}
            />
          </ListItemIcon>
        )}

        {(matchDownMd || drawerOpen || level !== 1) && (
          <ListItemText
            sx={{ m: 0 }}
            primary={
              <Typography variant="bodyMd" sx={{ color: 'inherit', whiteSpace: 'pre-wrap' }}>
                {t(item.title)}
              </Typography>
            }
            secondary={
              item.caption && (
                <Typography variant="caption" sx={{ display: 'block' }} gutterBottom>
                  {t(item.caption)}
                </Typography>
              )
            }
          />
        )}
      </ListItemButton>
    </Box>
  );
};
