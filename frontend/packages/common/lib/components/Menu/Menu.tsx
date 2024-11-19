import { Box, Divider, Stack, Theme, useMediaQuery } from '@mui/material';

import { MenuListGroup } from './Group/Group';
import { MenuProps } from './Menu.types';

export const Menu = ({ items, open, onClose }: MenuProps) => {
  const matchDownMd = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  return (
    <Box sx={{ mb: 2, ...(matchDownMd ? { mt: 2 } : {}) }}>
      <Stack divider={<Divider flexItem />} spacing={1}>
        {items.map((group, index) => (
          <MenuListGroup key={index} drawerOpen={open} group={group} onClose={onClose} />
        ))}
      </Stack>
    </Box>
  );
};
