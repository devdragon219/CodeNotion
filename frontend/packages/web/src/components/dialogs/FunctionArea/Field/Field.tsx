import { Grid2 } from '@mui/material';
import { SelectField, TextField } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { SurfaceType } from '@realgimm5/frontend-common/gql/types';
import { useDebounce } from '@realgimm5/frontend-common/hooks';
import { useEffect, useMemo } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useFunctionArea } from '../../../../hooks/useFunctionArea';
import { FunctionAreaFieldProps } from './Field.types';

export const FunctionAreaField = ({
  control,
  errors,
  index,
  internalCodes,
  mode,
  readonly,
  setCanUseInternalCodes,
  setValue,
}: FunctionAreaFieldProps) => {
  const { t } = useTranslation();
  const { checkCanUseInternalCode, getInternalCode } = useFunctionArea();
  const functionAreaId = useWatch({ control, name: `functionAreas.${index}.functionAreaId` });
  const guid = useWatch({ control, name: `functionAreas.${index}.guid` });
  const internalCode = useWatch({ control, name: `functionAreas.${index}.internalCode` });
  const debouncedInternalCode = useDebounce(internalCode);
  const debouncedFunctionAreaId = useDebounce(functionAreaId);
  const additionallyOccupiedCodes = useMemo(
    () => internalCodes.filter((internalCode, idx) => idx !== index && internalCode.length !== 0),
    [index, internalCodes],
  );
  const debouncedAdditionallyOccupiedCodes = useDebounce(additionallyOccupiedCodes);

  useEffect(() => {
    if (mode === FormMode.Create) {
      getInternalCode(additionallyOccupiedCodes, (internalCode) => {
        setValue(`functionAreas.${index}.internalCode`, internalCode);
      });
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    checkCanUseInternalCode(
      debouncedInternalCode,
      debouncedFunctionAreaId,
      debouncedAdditionallyOccupiedCodes,
      (canUseInternalCode) => {
        setCanUseInternalCodes((canUseInternalCodes) => ({
          ...canUseInternalCodes,
          [guid]: canUseInternalCode,
        }));
      },
    );
    // eslint-disable-next-line
  }, [debouncedInternalCode, debouncedFunctionAreaId, debouncedAdditionallyOccupiedCodes.length]);

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name={`functionAreas.${index}.internalCode`}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('function_area.field.function_area_code')}
              error={!!errors.functionAreas?.[index]?.internalCode}
              helperText={errors.functionAreas?.[index]?.internalCode?.message}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name={`functionAreas.${index}.name`}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('function_area.field.function_area_name')}
              error={!!errors.functionAreas?.[index]?.name}
              helperText={errors.functionAreas?.[index]?.name?.message}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name={`functionAreas.${index}.surfaceType`}
          control={control}
          render={({ field }) => (
            <SelectField
              {...field}
              label={t('function_area.field.function_area_type')}
              options={Object.values(SurfaceType)}
              getOptionLabel={(option) => t(`common.enum.surface_type.${option}`)}
              error={!!errors.functionAreas?.[index]?.surfaceType}
              helperText={errors.functionAreas?.[index]?.surfaceType?.message}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
    </Grid2>
  );
};
