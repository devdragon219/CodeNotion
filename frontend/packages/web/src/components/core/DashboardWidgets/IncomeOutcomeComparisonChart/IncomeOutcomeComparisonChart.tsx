import { Timeline, TrendingDown, TrendingUp } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { DashboardChart, DashboardWidgetContainer } from '@realgimm5/frontend-common/components';
import { useTheme } from '@realgimm5/frontend-common/contexts';
import { DashboardWidgetProps } from '@realgimm5/frontend-common/interfaces';
import { parseNumberToCurrency } from '@realgimm5/frontend-common/utils';
import { ParseKeys } from 'i18next';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const mockIncomeData = [31, 40, 28, 51, 42, 69, 60, 40, 28, 51, 42, 69];
const mockOutcomeData = [11, 32, 45, 32, 34, 52, 41, 20, 58, 21, 12, 56];

export const IOComparisonWidget = ({ useMockData }: DashboardWidgetProps) => {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const { theme } = useTheme();
  const [isLoading, setLoading] = useState(!useMockData);
  const [incomeData, setIncomeData] = useState(useMockData ? mockIncomeData : []);
  const [outcomeData, setOutcomeData] = useState(useMockData ? mockOutcomeData : []);

  // TODO implement query
  useEffect(() => {
    if (useMockData) return;

    setTimeout(
      () => {
        setIncomeData(mockIncomeData);
        setOutcomeData(mockOutcomeData);
        setLoading(false);
      },
      2000 + Math.random() * 1000,
    );
  }, [useMockData]);

  const trendComparison = useCallback((incomeData: number[], outcomeData: number[]) => {
    const incomeTotal = incomeData.reduce((acc, val) => acc + val, 0);
    const outcomeTotal = outcomeData.reduce((acc, val) => acc + val, 0);
    return incomeTotal - outcomeTotal;
  }, []);

  const iconContainerSx = useCallback(
    (color: string) => ({
      width: 40,
      height: 40,
      borderRadius: 3,
      display: 'grid',
      placeContent: 'center',
      backgroundColor: color,
    }),
    [],
  );

  return (
    <DashboardWidgetContainer isLoading={isLoading} useBoxShadow={false}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2 }}>
        <Typography variant="h3" sx={(theme) => ({ color: theme.palette.grey[700] })}>
          {t('component.dashboard_widget.income_outcome_comparison_chart.title')}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {trendComparison(incomeData, outcomeData) > 0 ? (
            <TrendingUp
              sx={(theme) => ({
                fill: theme.palette.green[700],
              })}
            />
          ) : (
            <TrendingDown
              color="error"
              sx={(theme) => ({
                fill: theme.palette.danger[700],
              })}
            />
          )}
          <Typography variant="h3" sx={(theme) => ({ color: theme.palette.grey[700] })}>
            {parseNumberToCurrency(trendComparison(incomeData, outcomeData), language)}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, px: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={(theme) => iconContainerSx(theme.palette.blue[50])}>
            <Timeline
              sx={(theme) => ({
                fill: theme.palette.blue[500],
              })}
            />
          </Box>
          <Typography variant="bodyLg" sx={(theme) => ({ color: theme.palette.grey[700] })}>
            {t('component.dashboard_widget.income_outcome_comparison_chart.income')}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={(theme) => iconContainerSx(theme.palette.danger[100])}>
            <Timeline
              sx={(theme) => ({
                fill: theme.palette.danger[500],
              })}
            />
          </Box>
          <Typography variant="bodyLg" sx={(theme) => ({ color: theme.palette.grey[700] })}>
            {t('component.dashboard_widget.income_outcome_comparison_chart.outcome')}
          </Typography>
        </Box>
      </Box>

      <Box>
        <DashboardChart
          type="area"
          fill={{
            type: 'gradient',
            gradient: {
              shadeIntensity: 1,
              opacityFrom: 0.5,
              opacityTo: 0.2,
              stops: [0, 100],
            },
          }}
          series={[incomeData, outcomeData].map((data, i) => ({
            name: t(`component.dashboard_widget.io_comparison.${i === 0 ? 'income' : 'outcome'}` as ParseKeys),
            data,
            color: i === 0 ? theme.palette.blue[500] : theme.palette.danger[300],
          }))}
        />
      </Box>
    </DashboardWidgetContainer>
  );
};
