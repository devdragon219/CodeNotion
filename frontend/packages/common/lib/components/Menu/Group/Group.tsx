import { List, Theme, Typography, useMediaQuery } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { MenuListItem } from '../Item/Item';
import { MenuListItemGroup } from '../ItemGroup/ItemGroup';
import { MenuListGroupProps } from './Group.types';

export const MenuListGroup = ({ drawerOpen, group, onClose }: MenuListGroupProps) => {
  const { t } = useTranslation();
  const matchDownMd = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  return (
    <List
      className="MuiList-menu"
      disablePadding
      subheader={
        group.title &&
        (matchDownMd || drawerOpen) && (
          <Typography variant="caption" sx={{ display: 'block' }} gutterBottom>
            {t(group.title)}
            {group.caption && (
              <Typography variant="caption" sx={{ display: 'block' }} gutterBottom>
                {t(group.caption)}
              </Typography>
            )}
          </Typography>
        )
      }
    >
      {group.children.map((item, index) => {
        switch (item.type) {
          case 'group':
            return <MenuListItemGroup key={index} item={item} level={1} drawerOpen={drawerOpen} onClose={onClose} />;
          case 'link':
            return <MenuListItem key={index} item={item} level={1} drawerOpen={drawerOpen} onClose={onClose} />;
        }
      })}
    </List>
  );
};
