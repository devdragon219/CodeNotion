import { yupResolver } from '@hookform/resolvers/yup';
import { AddCircleOutline, CheckCircleOutline } from '@mui/icons-material';
import { Button, Divider, Grid2, Stack } from '@mui/material';
import {
  AutocompleteField,
  CloseDialog,
  Dialog,
  DialogContent,
  EmptyText,
  Form,
  RepeatableField,
  SectionTitle,
  TextField,
} from '@realgimm5/frontend-common/components';
import { useFieldArray } from '@realgimm5/frontend-common/hooks';
import { useCallback, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { SORTED_DAYS_OF_WEEK } from '../../../configs/calendar';
import { CalendarFormInput } from '../../../interfaces/FormInputs/Calendar';
import { getEmptyCalendarFormInput, getEmptyCalendarHolidayFormInput } from '../../../utils/calendar/initialValues';
import { getCalendarSchema } from '../../../utils/calendar/schemas/calendar';
import { getTimeZoneLabel, getTimeZones } from '../../../utils/dateUtils';
import { CalendarDialogProps } from './Calendar.types';
import { DayField } from './DayField/DayField';
import { HolidayField } from './HolidayField/HolidayField';

export const CalendarDialog = ({ input, readonly, onClose, onSave }: CalendarDialogProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const [isCloseConfirmationDialogOpen, setCloseConfirmationDialogOpen] = useState(false);

  const {
    control,
    formState: { isValid: canSave, errors },
    handleSubmit,
    getValues,
  } = useForm<CalendarFormInput>({
    defaultValues: input ?? getEmptyCalendarFormInput(),
    resolver: yupResolver(getCalendarSchema(language, t)),
  });
  const { fields, append, remove } = useFieldArray({ control, name: 'holidays' });

  const handleAddHoliday = useCallback(() => {
    append(getEmptyCalendarHolidayFormInput());
  }, [append]);

  const openCloseConfirmationDialog = useCallback(() => {
    setCloseConfirmationDialogOpen(true);
  }, []);

  const closeCloseConfirmationDialog = useCallback(() => {
    setCloseConfirmationDialogOpen(false);
  }, []);

  const onSubmit = useCallback(
    (formValues: CalendarFormInput) => {
      onSave(
        input
          ? {
              ...input,
              ...formValues,
            }
          : formValues,
      );
    },
    [input, onSave],
  );

  const handleWorkingClose = useCallback(() => {
    onSubmit(getValues());
  }, [getValues, onSubmit]);

  const handleDestructiveClose = useCallback(() => {
    onClose();
  }, [onClose]);

  return isCloseConfirmationDialogOpen ? (
    <CloseDialog
      canSave={canSave}
      onCancel={closeCloseConfirmationDialog}
      onSave={handleWorkingClose}
      onClose={handleDestructiveClose}
    />
  ) : (
    <Dialog
      open
      title={`calendar.dialog.${input && input.calendarId !== null ? (readonly ? 'view' : 'update') : 'create'}.title`}
      onClose={readonly ? onClose : openCloseConfirmationDialog}
    >
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogContent
          action={
            <Button
              color="primary"
              variant="contained"
              startIcon={<CheckCircleOutline />}
              {...(readonly ? { onClick: onClose } : { type: 'submit' })}
            >
              {t(readonly ? 'core.button.close' : 'common.button.save')}
            </Button>
          }
        >
          <Grid2 container spacing={{ xs: 2, sm: 3 }}>
            <SectionTitle value="calendar.section_title.calendar" />
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={t('calendar.field.name')}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    readonly={readonly}
                    required
                  />
                )}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <Controller
                name="timeZone"
                control={control}
                render={({ field }) => (
                  <AutocompleteField
                    {...field}
                    label={t('calendar.field.timezone')}
                    options={getTimeZones()}
                    getOptionLabel={getTimeZoneLabel}
                    error={!!errors.timeZone}
                    helperText={errors.timeZone?.message}
                    readonly={readonly}
                    required
                  />
                )}
              />
            </Grid2>
            {SORTED_DAYS_OF_WEEK.map((dayOfWeek) => (
              <Grid2 key={dayOfWeek} size={12}>
                <DayField control={control} dayOfWeek={dayOfWeek} errors={errors} readonly={readonly} />
              </Grid2>
            ))}
            <SectionTitle value="calendar.section_title.holidays" />
            {fields.length !== 0 ? (
              <Grid2 size={12}>
                <Stack divider={<Divider flexItem />} spacing={{ xs: 2, sm: 3 }} sx={{ pr: 2 }}>
                  {fields.map(({ key }, index) => (
                    <RepeatableField key={key} index={index} onDelete={readonly ? undefined : remove}>
                      <HolidayField control={control} errors={errors} index={index} readonly={readonly} />
                    </RepeatableField>
                  ))}
                </Stack>
              </Grid2>
            ) : readonly ? (
              <EmptyText value="calendar.text.no_holidays" />
            ) : (
              <></>
            )}
            {!readonly && (
              <Grid2 size={12}>
                <Button
                  color="secondary"
                  variant="contained"
                  startIcon={<AddCircleOutline />}
                  onClick={handleAddHoliday}
                >
                  {t('calendar.action.add_holiday')}
                </Button>
              </Grid2>
            )}
          </Grid2>
        </DialogContent>
      </Form>
    </Dialog>
  );
};
