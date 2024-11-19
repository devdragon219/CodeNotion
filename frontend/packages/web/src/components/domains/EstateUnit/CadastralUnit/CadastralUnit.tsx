import { AddCircleOutline } from '@mui/icons-material';
import { Button, Grid2 } from '@mui/material';
import { DateField, SectionTitle, SelectField, TextField } from '@realgimm5/frontend-common/components';
import { IncomeType } from '@realgimm5/frontend-common/gql/types';
import { Controller, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { parseAddressToString } from '../../../../utils/addressUtils';
import { parseCadastralCoordinatesToString } from '../../../../utils/cadastralUnit/parseCadastralCoordinatesToString';
import { EstateUnitCadastralUnitProps } from './CadastralUnit.types';

export const EstateUnitCadastralUnit = ({ control, errors, readonly, onAdd }: EstateUnitCadastralUnitProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const cadastralUnit = useWatch({ control, name: 'cadastralUnit' });
  const cadastralUnitId = useWatch({ control, name: 'cadastralUnit.cadastralUnitId' });

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      {cadastralUnit ? (
        <>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name="cadastralUnit.internalCode"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t('estate_unit.field.cadastral_unit_code')}
                  error={!!errors.cadastralUnit?.internalCode}
                  helperText={errors.cadastralUnit?.internalCode?.message}
                  link={`/app/real-estate/cadastral-units/${cadastralUnitId}`}
                  readonly={readonly}
                  disabled
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name="cadastralUnit.coordinates"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t('estate_unit.field.cadastral_unit_coordinates')}
                  value={parseCadastralCoordinatesToString(field.value)}
                  error={!!errors.cadastralUnit?.coordinates}
                  helperText={errors.cadastralUnit?.coordinates?.message}
                  readonly={readonly}
                  disabled
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name="cadastralUnit.since"
              control={control}
              render={({ field }) => (
                <DateField
                  {...field}
                  label={t('estate_unit.field.cadastral_unit_since')}
                  error={!!errors.cadastralUnit?.since}
                  helperText={errors.cadastralUnit?.since?.message}
                  readonly={readonly}
                  disabled
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name="cadastralUnit.income.macroCategory"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t('estate_unit.field.cadastral_unit_income_macro_category')}
                  error={!!errors.cadastralUnit?.income?.macroCategory}
                  helperText={errors.cadastralUnit?.income?.macroCategory?.message}
                  readonly={readonly}
                  disabled
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name="cadastralUnit.income.incomeType"
              control={control}
              render={({ field }) => (
                <SelectField
                  {...field}
                  label={t('estate_unit.field.cadastral_unit_income_type')}
                  options={Object.values(IncomeType)}
                  getOptionLabel={(option) => t(`common.enum.income_type.${option}`)}
                  error={!!errors.cadastralUnit?.income?.incomeType}
                  helperText={errors.cadastralUnit?.income?.incomeType?.message}
                  readonly={readonly}
                  disabled
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name="cadastralUnit.income.cadastralAmount"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t('estate_unit.field.cadastral_unit_income_cadastral_amount')}
                  error={!!errors.cadastralUnit?.income?.cadastralAmount}
                  helperText={errors.cadastralUnit?.income?.cadastralAmount?.message}
                  readonly={readonly}
                  disabled
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Controller
              name="cadastralUnit.income.microCategory"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t('estate_unit.field.cadastral_unit_income_micro_category')}
                  error={!!errors.cadastralUnit?.income?.microCategory}
                  helperText={errors.cadastralUnit?.income?.microCategory?.message}
                  readonly={readonly}
                  disabled
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Controller
              name="cadastralUnit.inspection.protocolNumber"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t('estate_unit.field.cadastral_unit_inspection_protocol_number')}
                  error={!!errors.cadastralUnit?.inspection?.protocolNumber}
                  helperText={errors.cadastralUnit?.inspection?.protocolNumber?.message}
                  readonly={readonly}
                  disabled
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Controller
              name="cadastralUnit.inspection.protocolDate"
              control={control}
              render={({ field }) => (
                <DateField
                  {...field}
                  label={t('estate_unit.field.cadastral_unit_inspection_protocol_date')}
                  error={!!errors.cadastralUnit?.inspection?.protocolDate}
                  helperText={errors.cadastralUnit?.inspection?.protocolDate?.message}
                  readonly={readonly}
                  disabled
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Controller
              name="cadastralUnit.inspection.date"
              control={control}
              render={({ field }) => (
                <DateField
                  {...field}
                  label={t('estate_unit.field.cadastral_unit_inspection_date')}
                  error={!!errors.cadastralUnit?.inspection?.date}
                  helperText={errors.cadastralUnit?.inspection?.date?.message}
                  readonly={readonly}
                  disabled
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Controller
              name="cadastralUnit.inspection.heading"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t('estate_unit.field.cadastral_unit_inspection_heading')}
                  error={!!errors.cadastralUnit?.inspection?.heading}
                  helperText={errors.cadastralUnit?.inspection?.heading?.message}
                  readonly={readonly}
                  disabled
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Controller
              name="cadastralUnit.address"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t('estate_unit.field.cadastral_unit_address')}
                  value={parseAddressToString(field.value, language)}
                  error={!!errors.cadastralUnit?.address}
                  helperText={errors.cadastralUnit?.address?.message}
                  readonly={readonly}
                  disabled
                />
              )}
            />
          </Grid2>
        </>
      ) : (
        <Grid2 size={12}>
          {readonly ? (
            <Button color="secondary" variant="contained" startIcon={<AddCircleOutline />} onClick={onAdd}>
              {t('estate_unit.action.add_cadastral_unit')}
            </Button>
          ) : (
            <SectionTitle sx={{ justifyContent: 'center' }} value="estate_unit.section_title.no_cadastral_unit" />
          )}
        </Grid2>
      )}
    </Grid2>
  );
};
