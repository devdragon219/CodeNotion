import { BusinessCenterTwoTone, East, NorthEast, SouthEast } from '@mui/icons-material';
import { Box, Button, Theme, Typography } from '@mui/material';
import { DashboardChart } from '@realgimm5/frontend-common/components';
import { DEFAULT_BORDER_RADIUS } from '@realgimm5/frontend-common/configs';
import { useTheme } from '@realgimm5/frontend-common/contexts';
import { parseNumberToCurrency } from '@realgimm5/frontend-common/utils';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { DashboardWidgetPeriod } from '../../../../../enums/DashboardWidgetPeriod';
import {
  ContractsRecapWidgetItemProps,
  ContractsRecapWidgetPeriod,
  ContractsRecapWidgetPeriods,
} from './RecapItem.types';

export const ContractsRecapWidgetItem = ({ label, values, type, colorPalette }: ContractsRecapWidgetItemProps) => {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const { theme } = useTheme();

  const [period, setPeriod] = useState<ContractsRecapWidgetPeriod>(DashboardWidgetPeriod.Year);

  const total = useMemo(() => values[period].reduce((total, curr) => total + curr), [period, values]);

  const TrendIcon = useMemo(() => {
    const firstValue = values[period][0];
    const lastValue = values[period][values[period].length - 1];

    if (firstValue === lastValue) return East;
    if (firstValue < lastValue) return NorthEast;
    return SouthEast;
  }, [period, values]);

  const handlePeriodChange = useCallback(
    (value: ContractsRecapWidgetPeriod) => () => {
      setPeriod(value);
    },
    [],
  );

  const buttonSx = useCallback(
    (p: DashboardWidgetPeriod, theme: Theme) => ({
      color: colorPalette === 'dark' && p !== period ? theme.palette.common.white : theme.palette.grey[700],
    }),
    [colorPalette, period],
  );

  return (
    <Box
      sx={(theme) => ({
        position: 'relative',
        overflow: 'hidden',
        flex: 1,
        p: 2,
        borderRadius: `${DEFAULT_BORDER_RADIUS}px`,
        background: colorPalette === 'dark' ? theme.palette.blue[500] : theme.palette.blue[100],
        color: colorPalette === 'dark' ? theme.palette.common.white : theme.palette.grey[700],
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        ':before': {
          content: '""',
          position: 'absolute',
          top: 0,
          right: 0,
          width: 150,
          height: 135,
          borderRadius: '100px',
          transform: 'translate(13px, -80px)',
          backgroundColor: theme.palette.blue[200],
          opacity: 0.5,
        },
        ':after': {
          zIndex: 1,
          content: '""',
          position: 'absolute',
          top: 0,
          right: 0,
          width: 150,
          height: 135,
          borderRadius: '100px',
          transform: 'translate(70px, -52px)',
          backgroundColor: theme.palette.blue[200],
        },
      })}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          zIndex: 2,
        }}
      >
        <Box
          sx={(theme) => ({
            width: 32,
            height: 32,
            borderRadius: 3,
            display: 'grid',
            placeContent: 'center',
            backgroundColor: theme.palette.blue[200],
          })}
        >
          <BusinessCenterTwoTone
            sx={(theme) => ({
              fill: theme.palette.grey[100],
            })}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: '10px',
          }}
        >
          {Object.values(ContractsRecapWidgetPeriods).map((it) => (
            <Button
              key={it}
              onClick={handlePeriodChange(it)}
              variant={period === it ? 'contained' : 'text'}
              color="tertiary"
              size="medium"
              sx={(theme) => buttonSx(it, theme)}
            >
              {t(`core.enum.dashboard_widget_period.${it}`)}
            </Button>
          ))}
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 1,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 1 }}>
            <Typography variant="h3">
              {type === 'currency' ? parseNumberToCurrency(total, language) : total.toLocaleString()}
            </Typography>
            <Box
              sx={(theme) => ({
                display: 'grid',
                placeContent: 'center',
                p: 1,
                width: 22,
                height: 22,
                borderRadius: '50%',
                backgroundColor: theme.palette.blue[200],
              })}
            >
              <TrendIcon
                sx={(theme) => ({
                  width: 16,
                  height: 16,
                  fill: theme.palette.blue[500],
                })}
              />
            </Box>
          </Box>
          <Box sx={{ zIndex: 2 }}>
            <DashboardChart
              type="area"
              fill={{
                type: 'solid',
                opacity: 0,
              }}
              height={42}
              series={[
                {
                  name: t(label),
                  data: values[period],
                  color: colorPalette === 'dark' ? theme.palette.common.white : theme.palette.grey[700],
                },
              ]}
              theme={colorPalette}
            />
          </Box>
        </Box>
        <Typography variant="bodySm">{t(label)}</Typography>
      </Box>
    </Box>
  );
};
