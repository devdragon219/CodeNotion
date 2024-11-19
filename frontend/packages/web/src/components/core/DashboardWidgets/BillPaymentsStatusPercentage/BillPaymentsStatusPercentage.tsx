import { Box, Typography } from '@mui/material';
import { DashboardChart, DashboardWidgetContainer } from '@realgimm5/frontend-common/components';
import { useTheme } from '@realgimm5/frontend-common/contexts';
import { DashboardWidgetProps } from '@realgimm5/frontend-common/interfaces';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { useGetBillStatisticsQuery } from '../../../../gql/RealGimm.Web.Bill.operation';

const mockData = {
  finalBillsPercentage: 75,
  temporaryBillsPercentage: 25,
};

export const BillPaymentsStatusPercentageWidget = ({ useMockData }: DashboardWidgetProps) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [queryState] = useGetBillStatisticsQuery({ pause: useMockData });

  const data = useMemo(() => {
    if (useMockData) return mockData;

    const statistics = queryState.data?.bill.billStateStatisticsOutput;
    return {
      finalBillsPercentage: statistics?.finalBillsPercentage ?? 0,
      temporaryBillsPercentage: statistics?.temporaryBillsPercentage ?? 0,
    };
  }, [queryState.data?.bill.billStateStatisticsOutput, useMockData]);

  const handleViewAll = useCallback(() => {
    if (useMockData) return;
    navigate('/app/asset-management/bills/passive');
  }, [navigate, useMockData]);

  const labels = useMemo(
    () => [
      t('component.dashboard_widget.bill_payments_status_percentage.paid'),
      t('component.dashboard_widget.bill_payments_status_percentage.pending'),
    ],
    [t],
  );
  const colors = useMemo(() => [theme.palette.green[700], theme.palette.yellow[500]], [theme]);

  return (
    <DashboardWidgetContainer isLoading={queryState.fetching} useBoxShadow={false}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 1,
          px: 2,
        }}
      >
        <Typography variant="h3" sx={(theme) => ({ color: theme.palette.grey[700] })}>
          {t('component.dashboard_widget.bill_payments_status_percentage.title')}
        </Typography>
      </Box>

      <DashboardChart
        type="donut"
        colors={colors}
        labels={labels}
        series={Object.values(data)}
        viewAll={{
          label: 'component.dashboard_widget.bill_payments_status_percentage.view_all',
          onClick: handleViewAll,
        }}
      />
    </DashboardWidgetContainer>
  );
};
