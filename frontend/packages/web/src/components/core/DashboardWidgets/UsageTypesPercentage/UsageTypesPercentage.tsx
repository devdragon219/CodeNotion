import { Box, Typography } from '@mui/material';
import { DashboardChart, DashboardWidgetContainer, EmptyText } from '@realgimm5/frontend-common/components';
import { useTheme } from '@realgimm5/frontend-common/contexts';
import { DashboardWidgetProps } from '@realgimm5/frontend-common/interfaces';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { useGetUsageTypeDistributionQuery } from '../../../../gql/RealGimm.Web.UsageType.operation';

const mockData = {
  Residential: 50,
  Office: 25,
  Other: 25,
};

export const UsageTypesPercentageWidget = ({ useMockData }: DashboardWidgetProps) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [queryState] = useGetUsageTypeDistributionQuery({
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
            queryState.data?.estateUsageType.usageTypeDistribution?.nodes?.map((node) => [
              node.usageTypeName,
              node.percentage,
            ]) ?? [],
          ),
    [queryState.data?.estateUsageType.usageTypeDistribution?.nodes, useMockData],
  );

  const handleViewAll = useCallback(() => {
    if (useMockData) return;
    navigate('/app/statistics/usage-types-distributions');
  }, [navigate, useMockData]);

  const colors = useMemo(() => [theme.palette.blue[50], theme.palette.blue[200], theme.palette.blue[500]], [theme]);

  return (
    <DashboardWidgetContainer isLoading={queryState.fetching} useBoxShadow={false}>
      <Typography variant="h3" sx={(theme) => ({ color: theme.palette.grey[700], px: 2 })}>
        {t('component.dashboard_widget.usage_types_percentage.title')}
      </Typography>

      {Object.keys(data).length === 0 ? (
        <Box sx={{ px: 2 }}>
          <EmptyText value="core.text.no_data" useGrid={false} />
        </Box>
      ) : (
        <DashboardChart
          type="donut"
          colors={colors}
          labels={Object.keys(data)}
          series={Object.values(data)}
          viewAll={{
            label: 'component.dashboard_widget.usage_types_percentage.view_all',
            onClick: handleViewAll,
          }}
        />
      )}
    </DashboardWidgetContainer>
  );
};
