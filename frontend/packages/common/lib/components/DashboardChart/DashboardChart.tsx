import { ChevronRight } from '@mui/icons-material';
import { Box, List, ListItem, ListItemIcon, ListItemText, Stack, Typography } from '@mui/material';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { DASHBOARD_CHART_SIZE } from '../../configs/dashboard';
import { DashboardAreaChart } from './Area/Area';
import { DashboardBarChart } from './Bar/Bar';
import { DashboardChartProps } from './DashboardChart.types';
import { DashboardDonutChart } from './Donut/Donut';
import { DashboardLineChart } from './Line/Line';
import { DashboardPieChart } from './Pie/Pie';

export const DashboardChart = (props: DashboardChartProps) => {
  const { t } = useTranslation();

  const chart = useMemo(() => {
    switch (props.type) {
      case 'area':
        return <DashboardAreaChart {...props} />;
      case 'bar':
        return <DashboardBarChart {...props} />;
      case 'donut':
        return <DashboardDonutChart {...props} />;
      case 'line':
        return <DashboardLineChart {...props} />;
      case 'pie':
        return <DashboardPieChart {...props} />;
    }
  }, [props]);

  if (props.type === 'area' || props.type === 'bar' || props.type === 'line') return chart;

  return (
    <Stack direction="column" spacing={2}>
      <Box sx={{ display: 'flex', justifyContent: 'center', px: 2 }}>
        <Box sx={{ aspectRatio: '1', maxWidth: DASHBOARD_CHART_SIZE }}>{chart}</Box>
      </Box>

      <List sx={{ px: 2, py: 0 }}>
        {props.series.map((data, i) => (
          <ListItem
            key={i}
            sx={(theme) => ({
              borderTop: i === 0 ? `1px solid ${theme.palette.blue[50]}` : undefined,
              borderBottom: `1px solid ${theme.palette.blue[50]}`,
            })}
            disablePadding
          >
            <ListItemIcon sx={{ minWidth: '20px' }}>
              <Box sx={{ backgroundColor: props.colors[i], borderRadius: '4px', height: '12px', width: '12px' }} />
            </ListItemIcon>
            <ListItemText>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="bodySm" sx={(theme) => ({ color: theme.palette.grey[700] })}>
                  {props.labels[i]}
                </Typography>
                <Typography variant="bodySm" sx={(theme) => ({ color: theme.palette.grey[700] })}>
                  {data}%
                </Typography>
              </Box>
            </ListItemText>
          </ListItem>
        ))}
      </List>

      {props.viewAll && (
        <Box
          sx={(theme) => ({
            display: 'flex',
            justifyContent: 'center',
            pt: 1,
            borderTop: `1px solid ${theme.palette.divider}`,
          })}
        >
          <Typography
            variant="link"
            sx={{
              textAlign: 'center',
              alignItems: 'flex-end',
              display: 'flex',
            }}
            onClick={props.viewAll.onClick}
          >
            {t(props.viewAll.label)}
            <ChevronRight
              sx={{
                width: '16px',
              }}
            />
          </Typography>
        </Box>
      )}
    </Stack>
  );
};
