/* eslint-disable no-restricted-imports */
import { Box, Tabs as MuiTabs } from '@mui/material';
import { SyntheticEvent, useCallback, useState } from 'react';

import { TabItem } from './TabItem/TabItem';
import { TabPanel } from './TabPanel/TabPanel';
import { TabsProps } from './Tabs.types';

export const Tabs = ({ initialTab = 0, tabs, onChange }: TabsProps) => {
  const [value, setValue] = useState(initialTab);

  const handleChange = useCallback(
    (_: SyntheticEvent, newValue: number) => {
      setValue(newValue);
      onChange?.(newValue);
    },
    [onChange],
  );

  return (
    <Box sx={{ width: '100%' }}>
      <MuiTabs value={value} onChange={handleChange} sx={{ pt: 2.5, px: 2.5, mb: 4 }}>
        {tabs.map(({ error, icon, iconPosition, label }, index) => (
          <TabItem
            key={index}
            error={error}
            icon={icon}
            iconPosition={iconPosition}
            index={index}
            label={label}
            selected={index === value}
          />
        ))}
      </MuiTabs>
      {tabs.map(({ children }, index) => (
        <TabPanel key={index} index={index} selected={index === value}>
          {children}
        </TabPanel>
      ))}
    </Box>
  );
};
