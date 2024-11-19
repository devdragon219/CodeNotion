import { Box, Typography } from '@mui/material';
import { DashboardChart, DashboardWidgetContainer, EmptyText } from '@realgimm5/frontend-common/components';
import { useTheme } from '@realgimm5/frontend-common/contexts';
import { EstateUnitType } from '@realgimm5/frontend-common/gql/types';
import { DashboardWidgetProps } from '@realgimm5/frontend-common/interfaces';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { useGetEstateUnitTypeDistributionQuery } from '../../../../gql/RealGimm.Web.EstateUnit.operation';

const mockData = {
  [EstateUnitType.Building]: 60,
  [EstateUnitType.Ground]: 30,
  [EstateUnitType.Other]: 10,
};

export const EstateUnitTypesPercentageWidget = ({ useMockData }: DashboardWidgetProps) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [queryState] = useGetEstateUnitTypeDistributionQuery({
    pause: useMockData,
    variables: {
      showAll: false,
    },
  });

  const data = useMemo(
    () =>
      useMockData
        ? mockData
        : Object.fromEntries(
            queryState.data?.estateUnit.estateUnitTypeDistribution?.nodes?.map((node) => [
              node.estateUnitType,
              node.percentage,
            ]) ?? [],
          ),
    [queryState.data?.estateUnit.estateUnitTypeDistribution?.nodes, useMockData],
  );

  const handleViewAll = useCallback(() => {
    if (useMockData) return;
    navigate('/app/statistics/estate-unit-types-distributions');
  }, [navigate, useMockData]);

  const colors = useMemo(() => [theme.palette.blue[50], theme.palette.blue[200], theme.palette.blue[500]], [theme]);

  return (
    <DashboardWidgetContainer isLoading={queryState.fetching} useBoxShadow={false}>
      <Typography variant="h3" sx={(theme) => ({ color: theme.palette.grey[700], px: 2 })}>
        {t('component.dashboard_widget.estate_unit_types_percentage.title')}
      </Typography>

      {Object.keys(data).length === 0 ? (
        <Box sx={{ px: 2 }}>
          <EmptyText value="core.text.no_data" useGrid={false} />
        </Box>
      ) : (
        <DashboardChart
          type="pie"
          colors={colors}
          labels={Object.keys(data).map((label) => t(`common.enum.estate_unit_type.${label as EstateUnitType}`))}
          series={Object.values(data)}
          viewAll={{
            label: 'component.dashboard_widget.estate_unit_types_percentage.view_all',
            onClick: handleViewAll,
          }}
        />
      )}
    </DashboardWidgetContainer>
  );
};
