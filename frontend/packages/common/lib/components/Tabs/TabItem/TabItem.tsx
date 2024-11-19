import { Tab as MuiTab, Typography } from '@mui/material';
import classNames from 'classnames';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { TabItemProps } from './TabItem.types';

export const TabItem = ({ error, index, label, selected, ...props }: TabItemProps) => {
  const { t } = useTranslation();

  const a11yProps = useMemo(
    () => ({
      id: `tab-${index}`,
      'aria-controls': `tabpanel-${index}`,
    }),
    [index],
  );

  return (
    <MuiTab
      className={classNames({ 'Mui-error': error, 'Mui-selected': selected })}
      label={<Typography variant="bodyMd">{t(label)}</Typography>}
      {...props}
      {...a11yProps}
    />
  );
};
