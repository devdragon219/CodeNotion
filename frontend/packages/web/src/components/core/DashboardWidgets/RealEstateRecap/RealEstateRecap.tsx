import { List, Skeleton } from '@mui/material';
import { DashboardWidgetProps } from '@realgimm5/frontend-common/interfaces';
import { useMemo } from 'react';

import { useGetEstateStatisticsQuery } from '../../../../gql/RealGimm.Web.Estate.operation';
import { RealEstateRecapWidgetItem } from './RecapItem/RecapItem';

const mockData = {
  estatesCount: 10000,
  estateUnitsCount: 37000,
  occupiedEstatesCount: 35000,
  vacantEstatesCount: 2000,
};

export const RealEstateRecapWidget = ({ useMockData }: DashboardWidgetProps) => {
  const [queryState] = useGetEstateStatisticsQuery({ pause: useMockData });

  const data = useMemo(() => {
    if (useMockData) return mockData;

    const statistics = queryState.data?.estate.statistics;
    return {
      estatesCount: statistics?.estatesCount ?? 0,
      estateUnitsCount: statistics?.estateUnitsCount ?? 0,
      occupiedEstatesCount: statistics?.occupiedEstatesCount ?? 0,
      vacantEstatesCount: statistics?.vacantEstatesCount ?? 0,
    };
  }, [queryState.data?.estate.statistics, useMockData]);

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
      <RealEstateRecapWidgetItem
        label="component.dashboard_widget.real_estate_recap.estates"
        value={data.estatesCount}
      />
      <RealEstateRecapWidgetItem
        label="component.dashboard_widget.real_estate_recap.estate_units"
        value={data.estateUnitsCount}
      />
      <RealEstateRecapWidgetItem
        label="component.dashboard_widget.real_estate_recap.occupied_estates"
        value={data.occupiedEstatesCount}
      />
      <RealEstateRecapWidgetItem
        label="component.dashboard_widget.real_estate_recap.vacant_estates"
        value={data.vacantEstatesCount}
      />
    </List>
  );
};
