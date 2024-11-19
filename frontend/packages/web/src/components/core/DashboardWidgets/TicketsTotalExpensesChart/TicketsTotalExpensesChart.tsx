import { Box, Stack, Typography } from '@mui/material';
import {
  DashboardChart,
  DashboardWidgetContainer,
  EmptyText,
  SelectField,
} from '@realgimm5/frontend-common/components';
import { useTheme } from '@realgimm5/frontend-common/contexts';
import { DashboardWidgetProps } from '@realgimm5/frontend-common/interfaces';
import { getMonthForIndex } from '@realgimm5/frontend-common/utils';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useGetTicketsTotalExpensesMonthlyChartQuery } from '../../../../gql/RealGimm.Web.Ticket.operation';

const mockData: Record<number, number[]> = {
  2024: [80, 95, 90, 65, 110, 140, 180, 200, 100, 90, 180, 140],
};

export const TicketsTotalExpensesChartWidget = ({ useMockData }: DashboardWidgetProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const { theme } = useTheme();
  const [years, setYears] = useState([new Date().getFullYear()]);
  const [queryState] = useGetTicketsTotalExpensesMonthlyChartQuery({
    pause: useMockData || years.length === 0,
    variables: {
      years,
    },
  });

  const data = useMemo(() => {
    if (useMockData) return mockData;

    const statistics = queryState.data?.ticket.ticketsTotalAmountMonthlyChart;
    return (
      statistics?.reduce<Record<number, number[]>>((acc, it) => {
        if (!(it.year in acc)) {
          acc[it.year] = Array.from(Array(12));
        }

        return {
          ...acc,
          [it.year]: acc[it.year].map((month, idx) =>
            idx === it.month - 1 ? Math.floor(it.dataPoint.totalAmount) : month,
          ),
        };
      }, {}) ?? {}
    );
  }, [queryState.data?.ticket.ticketsTotalAmountMonthlyChart, useMockData]);

  return (
    <DashboardWidgetContainer isLoading={queryState.fetching} useBoxShadow={false}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ justifyContent: 'space-between', px: 2 }}>
        <Typography variant="h4" sx={(theme) => ({ color: theme.palette.grey[700] })}>
          {t('component.dashboard_widget.tickets_total_expenses.title')}
        </Typography>
        <Stack direction="row" spacing={2} sx={{ justifyContent: 'flex-end' }}>
          <SelectField
            label={t('component.dashboard_widget.tickets_total_expenses.years')}
            multiple
            max={3}
            options={Array.from(Array(10)).map((_, idx) => new Date().getFullYear() - idx)}
            onChange={setYears}
            value={years}
            size="medium"
            fullWidth={false}
          />
        </Stack>
      </Stack>

      <Box sx={{ px: 2 }}>
        {Object.keys(data).length === 0 ? (
          <EmptyText value="core.text.no_data" useGrid={false} />
        ) : (
          <DashboardChart
            type="bar"
            series={Object.entries(data).map(([name, data], i) => {
              const getColor = () => {
                switch (i) {
                  case 0:
                    return theme.palette.blue[200];
                  case 1:
                    return theme.palette.blue[500];
                  default:
                    return theme.palette.blue[50];
                }
              };

              return {
                name,
                data,
                color: getColor(),
              };
            })}
            xaxis={Array.from(Array(12)).map((_, idx) => getMonthForIndex(idx, language)!)}
          />
        )}
      </Box>
    </DashboardWidgetContainer>
  );
};
