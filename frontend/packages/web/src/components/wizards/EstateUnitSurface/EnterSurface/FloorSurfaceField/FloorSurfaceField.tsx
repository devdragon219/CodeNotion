import { Grid2 } from '@mui/material';
import { SectionTitle, SelectField, TextField } from '@realgimm5/frontend-common/components';
import { useMemo } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FloorSurfaceFieldProps } from './FloorSurfaceField.types';

export const FloorSurfaceField = ({ control, errors, estateUnitFloors, index }: FloorSurfaceFieldProps) => {
  const { t } = useTranslation();
  const floors = useWatch({ control, name: 'floors' });
  const floorOptions = useMemo(() => {
    const floorIds = floors.filter((_, idx) => idx !== index).map(({ floor }) => floor?.floorId);
    return estateUnitFloors.filter(({ floorId }) => !floorIds.includes(floorId));
  }, [estateUnitFloors, floors, index]);

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      <SectionTitle value="estate_unit.section_title.surface_floor" />
      <Grid2 size={12}>
        <Controller
          name={`floors.${index}.floor`}
          control={control}
          render={({ field }) => (
            <SelectField
              {...field}
              label={t('estate_unit.field.surface_floor')}
              options={floorOptions}
              getOptionKey={(option) => `${option.floorId}`}
              getOptionLabel={(option) => `(${option.position}) ${option.name}`}
              error={!!errors.floors?.[index]?.floor}
              helperText={errors.floors?.[index]?.floor?.message}
              required
            />
          )}
        />
      </Grid2>
      <SectionTitle value="estate_unit.section_title.surface_value" />
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name={`floors.${index}.surfaceSqMTotal`}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="number"
              label={t('estate_unit.field.surface_total_area')}
              error={!!errors.floors?.[index]?.surfaceSqMTotal}
              helperText={errors.floors?.[index]?.surfaceSqMTotal?.message}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name={`floors.${index}.surfaceSqMCommonArea`}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="number"
              label={t('estate_unit.field.surface_common_area')}
              error={!!errors.floors?.[index]?.surfaceSqMCommonArea}
              helperText={errors.floors?.[index]?.surfaceSqMCommonArea?.message}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name={`floors.${index}.surfaceSqMSideArea`}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="number"
              label={t('estate_unit.field.surface_side_area')}
              error={!!errors.floors?.[index]?.surfaceSqMSideArea}
              helperText={errors.floors?.[index]?.surfaceSqMSideArea?.message}
            />
          )}
        />
      </Grid2>
    </Grid2>
  );
};
