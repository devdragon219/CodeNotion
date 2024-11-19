import { yupResolver } from '@hookform/resolvers/yup';
import { AddCircleOutline } from '@mui/icons-material';
import { Button, Divider, Grid2, Stack } from '@mui/material';
import { RepeatableField, StepForm } from '@realgimm5/frontend-common/components';
import { EstateUnitType } from '@realgimm5/frontend-common/gql/types';
import { useFieldArray } from '@realgimm5/frontend-common/hooks';
import { useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { SurfaceMode } from '../../../../enums/SurfaceMode';
import { EstateUnitSurfaceFormInput } from '../../../../interfaces/FormInputs/EstateUnit';
import { getEmptyEstateUnitFloorSurfaceFormInput } from '../../../../utils/estateUnit/initialValues';
import { getEstateUnitSurfaceSchema } from '../../../../utils/estateUnit/schemas/surface';
import { EstateUnitSurfaceEnterSurfaceStepProps } from './EnterSurface.types';
import { FloorSurfaceField } from './FloorSurfaceField/FloorSurfaceField';
import { FunctionAreaSurfaceField } from './FunctionAreaSurfaceField/FunctionAreaSurfaceField';
import { TotalSurfaceField } from './TotalSurfaceField/TotalSurfaceField';

const FIXED_FLOOR_FIELDS = 1;
export const EstateUnitSurfaceEnterSurfaceStep = ({
  estateUnitFloors,
  estateUnitSurface,
  estateUnitType,
  functionAreas,
  surfaceMode,
  onBack,
  onChange,
  onError,
  onSave,
}: EstateUnitSurfaceEnterSurfaceStepProps) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<EstateUnitSurfaceFormInput>({
    defaultValues: estateUnitSurface,
    resolver: yupResolver(getEstateUnitSurfaceSchema(surfaceMode, t)),
  });
  const { fields, append, remove } = useFieldArray({ control, name: 'floors' });

  const handleAddFloor = useCallback(() => {
    append(getEmptyEstateUnitFloorSurfaceFormInput());
  }, [append]);
  const handleAddFunctionFloor = useCallback(() => {
    append(getEmptyEstateUnitFloorSurfaceFormInput(functionAreas));
  }, [functionAreas, append]);

  useEffect(() => {
    const { unsubscribe } = watch((formValues) => {
      onChange(formValues as EstateUnitSurfaceFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  const field = useMemo(() => {
    switch (surfaceMode) {
      case SurfaceMode.Total:
        return (
          <Grid2 size={12}>
            <TotalSurfaceField control={control} errors={errors} estateUnitType={estateUnitType} />
          </Grid2>
        );
      case SurfaceMode.Floor:
        return (
          <>
            <Grid2 size={12}>
              <FloorSurfaceField control={control} errors={errors} estateUnitFloors={estateUnitFloors} index={0} />
            </Grid2>
            <Grid2 size={12}>
              <Stack divider={<Divider flexItem />} spacing={{ xs: 2, sm: 3 }}>
                {fields.slice(FIXED_FLOOR_FIELDS).map(({ key }, index) => (
                  <RepeatableField key={key} index={index + FIXED_FLOOR_FIELDS} onDelete={remove}>
                    <FloorSurfaceField
                      control={control}
                      errors={errors}
                      estateUnitFloors={estateUnitFloors}
                      index={index + FIXED_FLOOR_FIELDS}
                    />
                  </RepeatableField>
                ))}
              </Stack>
            </Grid2>
            {fields.length < estateUnitFloors.length && (
              <Grid2 size={12}>
                <Button color="secondary" variant="contained" startIcon={<AddCircleOutline />} onClick={handleAddFloor}>
                  {t('estate_unit.action.add_surface_floor')}
                </Button>
              </Grid2>
            )}
          </>
        );
      case SurfaceMode.FunctionArea:
        return (
          <>
            <Grid2 size={12}>
              <FunctionAreaSurfaceField
                control={control}
                errors={errors}
                estateUnitFloors={estateUnitFloors}
                index={0}
              />
            </Grid2>
            <Grid2 size={12}>
              <Stack divider={<Divider flexItem />} spacing={{ xs: 2, sm: 3 }}>
                {fields.slice(FIXED_FLOOR_FIELDS).map(({ key }, index) => (
                  <RepeatableField key={key} index={index + FIXED_FLOOR_FIELDS} onDelete={remove}>
                    <FunctionAreaSurfaceField
                      control={control}
                      errors={errors}
                      estateUnitFloors={estateUnitFloors}
                      index={index + FIXED_FLOOR_FIELDS}
                    />
                  </RepeatableField>
                ))}
              </Stack>
            </Grid2>
            {fields.length < estateUnitFloors.length && (
              <Grid2 size={12}>
                <Button
                  color="secondary"
                  variant="contained"
                  startIcon={<AddCircleOutline />}
                  onClick={handleAddFunctionFloor}
                >
                  {t('estate_unit.action.add_surface_floor')}
                </Button>
              </Grid2>
            )}
          </>
        );
    }
  }, [
    surfaceMode,
    control,
    errors,
    estateUnitType,
    estateUnitFloors,
    fields,
    handleAddFloor,
    t,
    handleAddFunctionFloor,
    remove,
  ]);

  return (
    <StepForm
      completeLabel="common.button.save"
      sx={estateUnitType === EstateUnitType.Ground ? { px: 2 } : {}}
      onBack={onBack}
      onComplete={onError}
      onSubmit={handleSubmit(onSave)}
    >
      <Grid2 container spacing={{ xs: 2, sm: 3 }}>
        {field}
      </Grid2>
    </StepForm>
  );
};
