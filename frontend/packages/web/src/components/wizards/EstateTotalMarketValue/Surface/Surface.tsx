import { yupResolver } from '@hookform/resolvers/yup';
import { Grid2 } from '@mui/material';
import { SectionTitle, StepForm, TextField } from '@realgimm5/frontend-common/components';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { EstateTotalMarketValueFormInput } from '../../../../interfaces/FormInputs/Estate';
import { getEstateTotalMarketValueTotalSurfaceSchema } from '../../../../utils/estate/schemas/totalMarketValueTotalSurface';
import { EstateSurfaceStepProps } from './Surface.types';

export const EstateSurfaceStep = ({ estateTotalMarketValue, onChange, onError, onNext }: EstateSurfaceStepProps) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<EstateTotalMarketValueFormInput>({
    defaultValues: estateTotalMarketValue,
    resolver: yupResolver(getEstateTotalMarketValueTotalSurfaceSchema(t)),
  });

  useEffect(() => {
    const { unsubscribe } = watch((formValues) => {
      onChange(formValues as EstateTotalMarketValueFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <StepForm onNext={onError} onSubmit={handleSubmit(onNext)}>
      <Grid2 container spacing={{ xs: 2, sm: 3 }}>
        <SectionTitle value="estate.section_title.add_total_surface" />
        <Grid2 size={12}>
          <Controller
            name="totalSurfaceAreaSqM"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="number"
                label={t('estate.field.total_surface')}
                error={!!errors.totalSurfaceAreaSqM}
                helperText={errors.totalSurfaceAreaSqM?.message}
                required
              />
            )}
          />
        </Grid2>
        <Grid2 size={12}>
          <Controller
            name="notes"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label={t('estate.field.notes')}
                error={!!errors.notes}
                helperText={errors.notes?.message}
                multiline
              />
            )}
          />
        </Grid2>
      </Grid2>
    </StepForm>
  );
};
