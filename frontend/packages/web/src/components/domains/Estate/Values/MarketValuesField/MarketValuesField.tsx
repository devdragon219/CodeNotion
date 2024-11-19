import { DesignServicesTwoTone } from '@mui/icons-material';
import { Box, Button, Grid2 } from '@mui/material';
import { EmptyText, SecondaryTable, SectionTitle, TextField } from '@realgimm5/frontend-common/components';
import { parseNumberToCurrency } from '@realgimm5/frontend-common/utils';
import { useCallback, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { EstateTotalMarketValueFormInput } from '../../../../../interfaces/FormInputs/Estate';
import { EstateTotalMarketValueDialog } from '../../../../wizards/EstateTotalMarketValue/EstateTotalMarketValue';
import { MarketValuesFieldProps } from './MarketValuesField.types';

export const MarketValuesField = ({ control, readonly, setValue }: MarketValuesFieldProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const totalMarketValue = useWatch({ control, name: 'totalMarketValue' });
  const [estateTotalMarketValueDialogProps, setEstateTotalMarketValueDialogProps] = useState<{
    input?: EstateTotalMarketValueFormInput;
    open: boolean;
  }>({
    open: false,
  });

  const handleOpenEstateTotalMarketValueDialog = useCallback(() => {
    setEstateTotalMarketValueDialogProps({
      input: totalMarketValue ?? undefined,
      open: true,
    });
  }, [totalMarketValue]);
  const handleCloseEstateTotalMarketValueDialog = useCallback(() => {
    setEstateTotalMarketValueDialogProps({
      open: false,
    });
  }, []);
  const handleSaveEstateTotalMarketValue = useCallback(
    (estateTotalMarketValue: EstateTotalMarketValueFormInput) => {
      setValue('totalMarketValue', estateTotalMarketValue);
      handleCloseEstateTotalMarketValueDialog();
    },
    [setValue, handleCloseEstateTotalMarketValueDialog],
  );

  const computeTotalMarketValue = useCallback(
    (marketValue: number | null) => {
      if (!totalMarketValue || !totalMarketValue.totalSurfaceAreaSqM || !marketValue) {
        return 0;
      }
      const { coefficients, totalSurfaceAreaSqM } = totalMarketValue;
      const multiplier = coefficients.length ? coefficients.reduce((acc, { value }) => acc + (value ?? 0), 0) : 1;
      return marketValue * multiplier * totalSurfaceAreaSqM;
    },
    [totalMarketValue],
  );

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      <SectionTitle value="estate.section_title.market_values" />
      {totalMarketValue ? (
        <Grid2 size={12}>
          <Box
            sx={(theme) => ({
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: '10px',
              padding: '30px 15px 20px',
            })}
          >
            <Grid2 container spacing={{ xs: 2, sm: 3 }}>
              <Grid2 size={12}>
                <TextField
                  type="number"
                  label={t('estate.field.total_surface')}
                  value={totalMarketValue.totalSurfaceAreaSqM}
                  readonly
                />
              </Grid2>
              <SectionTitle value="estate.section_title.coefficients" />
              {totalMarketValue.coefficients.length ? (
                <Grid2 size={12}>
                  <SecondaryTable
                    columns={['estate.field.coefficient_type', 'estate.field.coefficient_value']}
                    rows={totalMarketValue.coefficients.map((coefficient) => [
                      coefficient.coefficientType
                        ? t(`common.enum.estate_total_market_value_coefficient_type.${coefficient.coefficientType}`)
                        : null,
                      coefficient.value,
                    ])}
                  />
                </Grid2>
              ) : (
                <EmptyText value="estate.text.no_coefficients" />
              )}
              <SectionTitle value="estate.section_title.market_values" />
              <Grid2 size={12}>
                <SecondaryTable
                  columns={[
                    'estate.field.market_value_type',
                    'estate.field.market_value_value',
                    'estate.field.market_value_total_value',
                  ]}
                  rows={totalMarketValue.marketValues.map((marketValue) => [
                    marketValue.marketValueType
                      ? t(`common.enum.estate_market_value_type.${marketValue.marketValueType}`)
                      : null,
                    parseNumberToCurrency(marketValue.value, language),
                    parseNumberToCurrency(computeTotalMarketValue(marketValue.value), language),
                  ])}
                />
              </Grid2>
              <Grid2 size={12}>
                <TextField label={t('estate.field.notes')} value={totalMarketValue.notes} multiline readonly />
              </Grid2>
            </Grid2>
          </Box>
        </Grid2>
      ) : (
        <EmptyText value="estate.text.no_market_values" />
      )}
      {!readonly && (
        <Grid2 size={12}>
          <Button
            color="secondary"
            variant="contained"
            startIcon={<DesignServicesTwoTone />}
            onClick={handleOpenEstateTotalMarketValueDialog}
          >
            {t(`estate.action.${totalMarketValue ? 'edit' : 'add'}_total_market_values`)}
          </Button>
        </Grid2>
      )}
      {estateTotalMarketValueDialogProps.open && (
        <EstateTotalMarketValueDialog
          input={estateTotalMarketValueDialogProps.input}
          onClose={handleCloseEstateTotalMarketValueDialog}
          onSave={handleSaveEstateTotalMarketValue}
        />
      )}
    </Grid2>
  );
};
