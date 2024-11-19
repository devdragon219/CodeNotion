import { Theme, useMediaQuery } from '@mui/material';
import { SelectField } from '@realgimm5/frontend-common/components';
import { SortEnumType } from '@realgimm5/frontend-common/gql/types';
import { useCallback, useMemo } from 'react';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useGetAllFloorTemplatesQuery } from '../../../../../gql/RealGimm.Web.FloorTemplate.operation';
import { FloorFormInput } from '../../../../../interfaces/FormInputs/Floor';
import { FloorFieldProps } from './FloorField.types';

export const FloorField = ({ control, errors, initialFloors, readonly, onAddFloor }: FloorFieldProps) => {
  const { t } = useTranslation();
  const matchDownMd = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const matchDownSm = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const [getFloorTemplatesState, reexecuteQuery] = useGetAllFloorTemplatesQuery({
    variables: {
      order: {
        position: SortEnumType.Asc,
      },
    },
    pause: readonly,
  });
  const options: FloorFormInput[] = useMemo(
    () =>
      getFloorTemplatesState.data?.floorTemplate.listFloorTemplates.map(({ guid, name, position }) => ({
        guid,
        floorId: initialFloors?.find((floor) => floor.guid === guid)?.floorId ?? null,
        name,
        position,
      })) ?? [],
    [getFloorTemplatesState.data, initialFloors],
  );

  const handleAddFloor = useCallback(() => {
    onAddFloor(() => {
      reexecuteQuery();
    });
  }, [onAddFloor, reexecuteQuery]);

  return (
    <Controller
      name="floors"
      control={control}
      render={({ field }) => (
        <SelectField
          {...field}
          multiple
          label={t('estate.field.floors')}
          action={{
            title: 'estate.action.add_floor',
            onClick: handleAddFloor,
          }}
          columns={{
            direction: 'row',
            size: matchDownSm ? 1 : matchDownMd ? 2 : 4,
          }}
          options={options}
          useSortedOptions={false}
          getOptionKey={(option) => option.guid}
          getOptionLabel={(option) => `(${option.position}) ${option.name}`}
          error={!!errors.floors}
          helperText={errors.floors?.message}
          readonly={readonly}
          required
        />
      )}
    />
  );
};
