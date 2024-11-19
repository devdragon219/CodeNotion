import { Box, Grid2, Stack, Typography } from '@mui/material';
import { parseNumberToCurrency } from '@realgimm5/frontend-common/utils';
import { useTranslation } from 'react-i18next';

import { CostChargeAnalysisResultMonthlyGraph } from './MonthlyGraph/MonthlyGraph';
import { CostChargeAnalysisResultTabProps } from './Tab.types';
import { CostChargeAnalysisResultYearlyGraph } from './YearlyGraph/YearlyGraph';

export const CostChargeAnalysisResultTab = ({ result }: CostChargeAnalysisResultTabProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Box
          sx={(theme) => ({
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: '12px',
            height: '100%',
            padding: '12px',
          })}
        >
          <Stack sx={{ gap: 0.5 }}>
            <Typography variant="h5" sx={(theme) => ({ color: theme.palette.grey[700] })}>
              {t('cost_charge_analysis.section_title.surfaces')}
            </Typography>
            <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
              <Typography variant="bodySm" sx={(theme) => ({ color: theme.palette.grey[600] })}>
                {t('cost_charge_analysis.text.target_year')}
              </Typography>
              <Typography variant="bodySm" sx={(theme) => ({ color: theme.palette.grey[600] })}>
                {t('cost_charge_analysis.text.surface', { value: result.surface.currentYear ?? 0 })}
              </Typography>
            </Stack>
            <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
              <Typography variant="bodySm" sx={(theme) => ({ color: theme.palette.grey[600] })}>
                {t('cost_charge_analysis.text.previous_year')}
              </Typography>
              <Typography variant="bodySm" sx={(theme) => ({ color: theme.palette.grey[600] })}>
                {t('cost_charge_analysis.text.surface', { value: result.surface.previousYear ?? 0 })}
              </Typography>
            </Stack>
          </Stack>
        </Box>
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Box
          sx={(theme) => ({
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: '12px',
            height: '100%',
            padding: '12px',
          })}
        >
          <Stack sx={{ gap: 0.5 }}>
            <Typography variant="h5" sx={(theme) => ({ color: theme.palette.grey[700] })}>
              {t('cost_charge_analysis.section_title.consumptions')}
            </Typography>
            <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
              <Typography variant="bodySm" sx={(theme) => ({ color: theme.palette.grey[600] })}>
                {t('cost_charge_analysis.text.target_year')}
              </Typography>
              <Typography variant="bodySm" sx={(theme) => ({ color: theme.palette.grey[600] })}>
                {result.consumption.currentYearValue} {result.measurementUnit}
              </Typography>
            </Stack>
            <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
              <Typography variant="bodySm" sx={(theme) => ({ color: theme.palette.grey[600] })}>
                {t('cost_charge_analysis.text.previous_year')}
              </Typography>
              <Typography variant="bodySm" sx={(theme) => ({ color: theme.palette.grey[600] })}>
                {result.consumption.previousYearValue} {result.measurementUnit}
              </Typography>
            </Stack>
            <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
              <Typography variant="bodySm" sx={(theme) => ({ color: theme.palette.grey[600] })}>
                {t('cost_charge_analysis.text.difference')}
              </Typography>
              <Typography variant="bodySm" sx={(theme) => ({ color: theme.palette.grey[600] })}>
                {result.consumption.difference} {result.measurementUnit}
              </Typography>
            </Stack>
            <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
              <Typography variant="bodySm" sx={(theme) => ({ color: theme.palette.grey[600] })}>
                {t('cost_charge_analysis.text.difference_percentage')}
              </Typography>
              <Typography variant="bodySm" sx={(theme) => ({ color: theme.palette.grey[600] })}>
                {result.consumption.differencePercentage ?? 0} %
              </Typography>
            </Stack>
          </Stack>
        </Box>
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Box
          sx={(theme) => ({
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: '12px',
            height: '100%',
            padding: '12px',
          })}
        >
          <Stack sx={{ gap: 0.5 }}>
            <Typography variant="h5" sx={(theme) => ({ color: theme.palette.grey[700] })}>
              {t('cost_charge_analysis.section_title.costs')}
            </Typography>
            <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
              <Typography variant="bodySm" sx={(theme) => ({ color: theme.palette.grey[600] })}>
                {t('cost_charge_analysis.text.target_year')}
              </Typography>
              <Typography variant="bodySm" sx={(theme) => ({ color: theme.palette.grey[600] })}>
                {parseNumberToCurrency(result.cost.currentYearValue, language)}
              </Typography>
            </Stack>
            <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
              <Typography variant="bodySm" sx={(theme) => ({ color: theme.palette.grey[600] })}>
                {t('cost_charge_analysis.text.previous_year')}
              </Typography>
              <Typography variant="bodySm" sx={(theme) => ({ color: theme.palette.grey[600] })}>
                {parseNumberToCurrency(result.cost.previousYearValue, language)}
              </Typography>
            </Stack>
            <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
              <Typography variant="bodySm" sx={(theme) => ({ color: theme.palette.grey[600] })}>
                {t('cost_charge_analysis.text.difference')}
              </Typography>
              <Typography variant="bodySm" sx={(theme) => ({ color: theme.palette.grey[600] })}>
                {parseNumberToCurrency(result.cost.difference, language)}
              </Typography>
            </Stack>
            <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
              <Typography variant="bodySm" sx={(theme) => ({ color: theme.palette.grey[600] })}>
                {t('cost_charge_analysis.text.difference_percentage')}
              </Typography>
              <Typography variant="bodySm" sx={(theme) => ({ color: theme.palette.grey[600] })}>
                {result.cost.differencePercentage ?? 0} %
              </Typography>
            </Stack>
          </Stack>
        </Box>
      </Grid2>
      <Grid2 size={12}>
        <CostChargeAnalysisResultYearlyGraph result={result} type="consumption" />
      </Grid2>
      <Grid2 size={12}>
        <CostChargeAnalysisResultMonthlyGraph result={result} type="consumption" />
      </Grid2>
      <Grid2 size={12}>
        <CostChargeAnalysisResultYearlyGraph result={result} type="cost" />
      </Grid2>
      <Grid2 size={12}>
        <CostChargeAnalysisResultMonthlyGraph result={result} type="cost" />
      </Grid2>
    </Grid2>
  );
};
