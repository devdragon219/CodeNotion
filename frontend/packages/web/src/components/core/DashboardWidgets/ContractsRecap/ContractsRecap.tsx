import { List, ListItem, Skeleton } from '@mui/material';
import { DashboardWidgetProps } from '@realgimm5/frontend-common/interfaces';
import { useMemo } from 'react';

import { DashboardWidgetPeriod } from '../../../../enums/DashboardWidgetPeriod';
import { useGetContractStatisticsQuery } from '../../../../gql/RealGimm.Web.Contract.operation';
import { ContractsRecapWidgetItem } from './RecapItem/RecapItem';

const mockData = {
  activeCount: {
    [DashboardWidgetPeriod.Month]: [800, 1200, 600, 900, 1000, 850, 1100, 750],
    [DashboardWidgetPeriod.Year]: [1020, 1400, 600, 1500, 1300, 1600, 1300, 1600],
  },
  activeRevenue: {
    [DashboardWidgetPeriod.Month]: [800, 1200, 600, 900, 1000, 850, 1100, 750],
    [DashboardWidgetPeriod.Year]: [1020, 1400, 600, 1500, 1300, 1600, 1300, 1600],
  },
  passiveCount: {
    [DashboardWidgetPeriod.Month]: [800, 1200, 600, 900, 1000, 850, 1100, 750],
    [DashboardWidgetPeriod.Year]: [1020, 1400, 600, 1500, 1300, 1600, 1300, 1600],
  },
  passiveRevenue: {
    [DashboardWidgetPeriod.Month]: [800, 1200, 600, 900, 1000, 850, 1100, 750],
    [DashboardWidgetPeriod.Year]: [1020, 1400, 600, 1500, 1300, 1600, 1300, 1600],
  },
};

export const ContractsRecapWidget = ({ useMockData }: DashboardWidgetProps) => {
  const [queryState] = useGetContractStatisticsQuery({ pause: useMockData });

  const data = useMemo(() => {
    if (useMockData) return mockData;

    const statistics = queryState.data?.contract.statistics;
    return {
      activeCount: {
        [DashboardWidgetPeriod.Month]:
          statistics?.monthly.map(({ totalActiveContractsCount }) => totalActiveContractsCount) ?? [],
        [DashboardWidgetPeriod.Year]:
          statistics?.yearly.map(({ totalActiveContractsCount }) => totalActiveContractsCount) ?? [],
      },
      activeRevenue: {
        [DashboardWidgetPeriod.Month]:
          statistics?.monthly.map(({ totalActiveContractsRevenue }) => totalActiveContractsRevenue) ?? [],
        [DashboardWidgetPeriod.Year]:
          statistics?.yearly.map(({ totalActiveContractsRevenue }) => totalActiveContractsRevenue) ?? [],
      },
      passiveCount: {
        [DashboardWidgetPeriod.Month]:
          statistics?.monthly.map(({ totalPassiveContractsCount }) => totalPassiveContractsCount) ?? [],
        [DashboardWidgetPeriod.Year]:
          statistics?.yearly.map(({ totalPassiveContractsCount }) => totalPassiveContractsCount) ?? [],
      },
      passiveRevenue: {
        [DashboardWidgetPeriod.Month]:
          statistics?.monthly.map(({ totalPassiveContractsRevenue }) => totalPassiveContractsRevenue) ?? [],
        [DashboardWidgetPeriod.Year]:
          statistics?.yearly.map(({ totalPassiveContractsRevenue }) => totalPassiveContractsRevenue) ?? [],
      },
    };
  }, [queryState.data?.contract.statistics, useMockData]);

  return queryState.fetching ? (
    <Skeleton variant="rounded" sx={{ height: '100%' }} />
  ) : (
    <List
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: '10px',
      }}
      disablePadding
    >
      <ListItem key="activeContractsCount" disablePadding>
        <ContractsRecapWidgetItem
          label="component.dashboard_widget.contracts_recap.active_contracts_count"
          type="number"
          colorPalette="dark"
          values={data.activeCount}
        />
      </ListItem>
      <ListItem key="activeContractsRevenue" disablePadding>
        <ContractsRecapWidgetItem
          label="component.dashboard_widget.contracts_recap.active_contracts_income"
          type="currency"
          colorPalette="dark"
          values={data.activeRevenue}
        />
      </ListItem>
      <ListItem key="passiveContractsCount" disablePadding>
        <ContractsRecapWidgetItem
          label="component.dashboard_widget.contracts_recap.passive_contracts_count"
          type="number"
          colorPalette="light"
          values={data.passiveCount}
        />
      </ListItem>
      <ListItem key="passiveContractsRevenue" disablePadding>
        <ContractsRecapWidgetItem
          label="component.dashboard_widget.contracts_recap.passive_contracts_outcome"
          type="currency"
          colorPalette="light"
          values={data.passiveRevenue}
        />
      </ListItem>
    </List>
  );
};
