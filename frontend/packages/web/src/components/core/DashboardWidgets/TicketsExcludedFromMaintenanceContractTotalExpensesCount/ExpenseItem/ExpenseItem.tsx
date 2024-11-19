import { TrendingDown, TrendingFlat, TrendingUp } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';
import { DEFAULT_BORDER_RADIUS } from '@realgimm5/frontend-common/configs';
import { Trend } from '@realgimm5/frontend-common/gql/types';
import { parseNumberToCurrency } from '@realgimm5/frontend-common/utils';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { ExpenseItemProps } from './ExpenseItem.types';

export const ExpenseItem = ({ index, trend, value }: ExpenseItemProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();

  const description = useMemo(() => {
    switch (index) {
      case 0:
        return t('component.dashboard_widget.tickets_excluded_from_maintenance_contract.total_yearly_expenses');
      case 1:
        return t('component.dashboard_widget.tickets_excluded_from_maintenance_contract.non_excluded_expenses');
      default:
        return t('component.dashboard_widget.tickets_excluded_from_maintenance_contract.excluded_expenses');
    }
  }, [index, t]);

  const icon = useMemo(() => {
    switch (trend) {
      case Trend.Down:
        return <TrendingDown sx={(theme) => ({ color: theme.palette.danger[300] })} />;
      case Trend.Same:
        return <TrendingFlat sx={(theme) => ({ color: theme.palette.grey[700] })} />;
      case Trend.Up:
        return <TrendingUp sx={(theme) => ({ color: theme.palette.green[700] })} />;
    }
  }, [trend]);

  return (
    <Stack
      direction="row"
      spacing={2}
      sx={(theme) => ({
        alignItems: 'center',
        backgroundColor: index === 0 ? theme.palette.blue[100] : theme.palette.background.paper,
        border: `1px solid ${theme.palette.blue[100]}`,
        borderRadius: `${DEFAULT_BORDER_RADIUS}px`,
        color: theme.palette.grey[700],
        justifyContent: 'space-between',
        p: 2,
      })}
    >
      <Stack direction="column" spacing={0.5}>
        <Typography variant="h2">{parseNumberToCurrency(value, language)}</Typography>
        <Typography variant="bodyMd">{description}</Typography>
      </Stack>
      {icon}
    </Stack>
  );
};
