import { Grid2, Skeleton } from '@mui/material';
import { Trend } from '@realgimm5/frontend-common/gql/types';
import { DashboardWidgetProps } from '@realgimm5/frontend-common/interfaces';
import { useMemo } from 'react';

import { useGetTicketsExcludedFromMaintenanceContractTotalExpensesStatisticsQuery } from '../../../../gql/RealGimm.Web.Ticket.operation';
import { ExpenseItem } from './ExpenseItem/ExpenseItem';

const mockData = [
  {
    trend: Trend.Up,
    value: 27695.65,
  },
  {
    trend: Trend.Up,
    value: 17695.65,
  },
  {
    trend: Trend.Down,
    value: 10000,
  },
];

export const TicketsExcludedFromMaintenanceContractTotalExpensesCountWidget = ({
  useMockData,
}: DashboardWidgetProps) => {
  const [queryState] = useGetTicketsExcludedFromMaintenanceContractTotalExpensesStatisticsQuery({ pause: useMockData });

  const data = useMemo(() => {
    if (useMockData) return mockData;

    const statistics = queryState.data?.ticket.yearlyTicketAmountStatistics;
    return [
      {
        trend: statistics?.totalAmountTrend ?? Trend.Same,
        value: statistics?.totalAmount ?? 0,
      },
      {
        trend: statistics?.nonExcludedAmountTrend ?? Trend.Same,
        value: statistics?.nonExcludedAmount ?? 0,
      },
      {
        trend: statistics?.excludedAmountTrend ?? Trend.Same,
        value: statistics?.excludedAmount ?? 0,
      },
    ];
  }, [queryState.data?.ticket.yearlyTicketAmountStatistics, useMockData]);

  return queryState.fetching ? (
    <Skeleton variant="rounded" sx={{ height: '100%' }} />
  ) : (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      {data.map((value, index) => (
        <Grid2 key={index} size={{ xs: 12, sm: 4 }}>
          <ExpenseItem {...value} index={index} />
        </Grid2>
      ))}
    </Grid2>
  );
};
