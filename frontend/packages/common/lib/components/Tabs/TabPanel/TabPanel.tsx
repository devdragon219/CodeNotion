import { Box } from '@mui/material';

import { TabPanelProps } from './TabPanel.types';

export const TabPanel = ({ children, index, selected }: TabPanelProps) => (
  <Box role="tabpanel" hidden={!selected} id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`} sx={{ px: 2 }}>
    {selected && children}
  </Box>
);
