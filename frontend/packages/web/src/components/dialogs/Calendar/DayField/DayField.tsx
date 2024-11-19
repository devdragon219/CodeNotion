import { AddCircleOutline, DeleteTwoTone } from '@mui/icons-material';
import { Button, Grid2, IconButton, Stack } from '@mui/material';
import { CheckboxField, TimeField } from '@realgimm5/frontend-common/components';
import { useFieldArray } from '@realgimm5/frontend-common/hooks';
import { ChangeEvent, useCallback } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { getEmptyCalendarDayTimeRangeFormInput } from '../../../../utils/calendar/initialValues';
import { DayFieldProps } from './DayField.types';

export const DayField = ({ control, dayOfWeek, errors, readonly }: DayFieldProps) => {
  const { t } = useTranslation();
  const enabled = useWatch({ control, name: `${dayOfWeek}.enabled` });
  const { fields, append, remove, replace } = useFieldArray({ control, name: `${dayOfWeek}.timeRanges` });

  const handleCheckboxChange = useCallback(
    (onChange: (checked: boolean) => void) => (_: ChangeEvent<HTMLInputElement>, checked: boolean) => {
      onChange(checked);

      replace([getEmptyCalendarDayTimeRangeFormInput(checked)]);
    },
    [replace],
  );

  const handleAddTimeRange = useCallback(() => {
    append(getEmptyCalendarDayTimeRangeFormInput(true));
  }, [append]);
  const handleRemoveTimeRange = useCallback(
    (index: number) => () => {
      remove(index);
    },
    [remove],
  );

  return (
    <Stack spacing={{ xs: 2, sm: 3 }}>
      {fields.map(({ key }, index) => (
        <Grid2 key={key} container spacing={{ xs: 2, sm: 3 }}>
          <Grid2 size={{ xs: 12, sm: 2 }}>
            {index === 0 ? (
              <Controller
                name={`${dayOfWeek}.enabled`}
                control={control}
                render={({ field }) => (
                  <CheckboxField
                    {...field}
                    onChange={handleCheckboxChange(field.onChange)}
                    label={t(`common.enum.day_of_week.${dayOfWeek}`)}
                    readonly={readonly}
                  />
                )}
              />
            ) : (
              <></>
            )}
          </Grid2>
          <Grid2 size={{ xs: 12, sm: readonly ? 10 : 8 }}>
            <Stack direction="row" spacing={{ xs: 2, sm: 3 }}>
              <Controller
                name={`${dayOfWeek}.timeRanges.${index}.since`}
                control={control}
                render={({ field }) => (
                  <TimeField
                    {...field}
                    sx={{ width: '100%' }}
                    label={t('calendar.field.day_since')}
                    error={!!errors[dayOfWeek]?.timeRanges?.[index]?.since}
                    helperText={errors[dayOfWeek]?.timeRanges?.[index]?.since?.message}
                    readonly={readonly}
                    disabled={!enabled}
                    required={enabled}
                  />
                )}
              />
              <Controller
                name={`${dayOfWeek}.timeRanges.${index}.until`}
                control={control}
                render={({ field }) => (
                  <TimeField
                    {...field}
                    sx={{ width: '100%' }}
                    label={t('calendar.field.day_until')}
                    error={!!errors[dayOfWeek]?.timeRanges?.[index]?.until}
                    helperText={errors[dayOfWeek]?.timeRanges?.[index]?.until?.message}
                    readonly={readonly}
                    disabled={!enabled}
                    required={enabled}
                  />
                )}
              />
            </Stack>
          </Grid2>
          {readonly ? (
            <></>
          ) : (
            <Grid2 size={{ xs: 12, sm: 2 }}>
              {index === 0 ? (
                <Button
                  color="secondary"
                  variant="contained"
                  disabled={!enabled}
                  startIcon={<AddCircleOutline />}
                  onClick={handleAddTimeRange}
                  sx={{ height: '52px' }}
                >
                  {t('calendar.action.add_time')}
                </Button>
              ) : (
                <IconButton sx={{ height: '52px', width: '52px' }} onClick={handleRemoveTimeRange(index)}>
                  <DeleteTwoTone />
                </IconButton>
              )}
            </Grid2>
          )}
        </Grid2>
      ))}
    </Stack>
  );
};
