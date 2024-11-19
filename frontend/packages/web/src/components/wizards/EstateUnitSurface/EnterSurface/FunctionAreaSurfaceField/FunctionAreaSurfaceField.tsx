import { Grid2 } from '@mui/material';
import { Accordion, SecondaryTable, SectionTitle, SelectField, TextField } from '@realgimm5/frontend-common/components';
import { SurfaceType } from '@realgimm5/frontend-common/gql/types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FunctionAreaSurfaceFieldProps } from './FunctionAreaSurfaceField.types';

export const FunctionAreaSurfaceField = ({
  control,
  errors,
  estateUnitFloors,
  index,
}: FunctionAreaSurfaceFieldProps) => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  const floors = useWatch({ control, name: 'floors' });
  const functionAreas = useWatch({ control, name: `floors.${index}.functionAreas` });
  const floorOptions = useMemo(() => {
    const floorIds = floors.filter((_, idx) => idx !== index).map(({ floor }) => floor?.floorId);
    return estateUnitFloors.filter(({ floorId }) => !floorIds.includes(floorId));
  }, [estateUnitFloors, floors, index]);
  const floor = useWatch({ control, name: `floors.${index}.floor` });

  useEffect(() => {
    setExpanded(index === floors.length - 1);
    // eslint-disable-next-line
  }, [floors.length]);

  const getSurfaceField = useCallback((surfaceType: SurfaceType) => {
    switch (surfaceType) {
      case SurfaceType.CommonArea:
        return 'surfaceSqMCommonArea';
      case SurfaceType.MainArea:
        return 'surfaceSqMTotal';
      case SurfaceType.SideArea:
        return 'surfaceSqMSideArea';
    }
  }, []);

  return (
    <Accordion expanded={expanded} title={floor?.name ?? ''}>
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
        <Grid2 size={12}>
          <SecondaryTable
            columns={[
              'estate_unit.field.surface_total_area',
              'estate_unit.field.surface_function_area',
              'estate_unit.field.surface_function_area_type',
            ]}
            rows={functionAreas.map((functionArea, idx) => [
              <Controller
                key={idx}
                name={`floors.${index}.functionAreas.${idx}.${getSurfaceField(functionArea.functionArea.surfaceType)}`}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="number"
                    size="small"
                    placeholder={t('estate_unit.field.surface_total_area')}
                  />
                )}
              />,
              functionArea.functionArea.name,
              t(`common.enum.surface_type.${functionArea.functionArea.surfaceType}`),
            ])}
          />
        </Grid2>
      </Grid2>
    </Accordion>
  );
};
