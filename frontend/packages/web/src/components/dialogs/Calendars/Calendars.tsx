import { AddCircleOutline, CancelOutlined, CheckCircleOutline } from '@mui/icons-material';
import { Button, Grid2 } from '@mui/material';
import {
  ConfirmationDialog,
  Dialog,
  DialogContent,
  Loader,
  RepeatableField,
  SectionTitle,
} from '@realgimm5/frontend-common/components';
import { useSnackbar } from '@realgimm5/frontend-common/contexts';
import { DayOfWeek, SortEnumType } from '@realgimm5/frontend-common/gql/types';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { CalendarFragment } from '../../../gql/RealGimm.Web.Calendar.fragment';
import {
  useAddCalendarMutation,
  useDeleteCalendarMutation,
  useGetAllCalendarsQuery,
  useUpdateCalendarMutation,
} from '../../../gql/RealGimm.Web.Calendar.operation';
import { CalendarFormInput } from '../../../interfaces/FormInputs/Calendar';
import { parseCalendarFormInputToCalendarInput } from '../../../utils/calendar/parseCalendarFormInput';
import { parseCalendarToCalendarFormInput } from '../../../utils/calendar/parseCalendarFragment';
import { CalendarDialog } from '../Calendar/Calendar';
import { CalendarAccordion } from './Calendar/Calendar';
import { CalendarsDialogProps } from './Calendars.types';

export const CalendarsDialog = ({ readonly, onClose, onChange }: CalendarsDialogProps) => {
  const { t } = useTranslation();
  const { showError, showSnackbar } = useSnackbar();
  const [queryState, reexecuteQuery] = useGetAllCalendarsQuery({
    variables: {
      order: {
        name: SortEnumType.Asc,
      },
    },
  });
  const [, createCalendarMutation] = useAddCalendarMutation();
  const [, updateCalendarMutation] = useUpdateCalendarMutation();
  const [, deleteCalendarMutation] = useDeleteCalendarMutation();
  const [loading, setLoading] = useState(false);
  const [calendarDialogProps, setCalendarDialogProps] = useState<{
    isOpen: boolean;
    input?: CalendarFormInput;
  }>({
    isOpen: false,
  });
  const [deleteCalendarId, setDeleteCalendarId] = useState<number | null>(null);
  const calendars = useMemo(() => queryState.data?.calendar.listCalendarsFull ?? [], [queryState.data]);

  const handleOpenCalendarDialog = useCallback(() => {
    setCalendarDialogProps({
      isOpen: true,
    });
  }, []);
  const handleCloseCalendarDialog = useCallback(() => {
    setCalendarDialogProps({
      isOpen: false,
    });
  }, []);
  const handleDuplicateCalendar = useCallback((calendar: CalendarFragment) => {
    const input = parseCalendarToCalendarFormInput(calendar);
    setCalendarDialogProps({
      isOpen: true,
      input: {
        ...input,
        calendarId: null,
        holidays: input.holidays.map((holiday) => ({
          ...holiday,
          calendarHolidayId: null,
        })),
        ...Object.values(DayOfWeek).reduce(
          (acc, day) => ({
            ...acc,
            [day]: {
              ...input[day],
              calendarDayId: null,
            },
          }),
          {},
        ),
      },
    });
  }, []);
  const handleEditCalendar = useCallback((calendar: CalendarFragment) => {
    setCalendarDialogProps({
      isOpen: true,
      input: parseCalendarToCalendarFormInput(calendar),
    });
  }, []);
  const handleSaveCalendar = useCallback(
    async (value: CalendarFormInput) => {
      const saveCalendar = async () => {
        if (value.calendarId) {
          const result = await updateCalendarMutation({
            calendarId: value.calendarId,
            input: parseCalendarFormInputToCalendarInput(value),
          });
          return result.data?.calendar.update;
        } else {
          const result = await createCalendarMutation({
            input: parseCalendarFormInputToCalendarInput(value),
          });
          return result.data?.calendar.add;
        }
      };
      setLoading(true);
      const result = await saveCalendar();
      setLoading(false);
      if (result?.isSuccess) {
        showSnackbar(t(`calendar.feedback.${value.calendarId ? 'update' : 'create'}`), 'success');
        handleCloseCalendarDialog();
        reexecuteQuery();
        onChange?.();
      } else {
        showError(result?.validationErrors);
      }
    },
    [
      updateCalendarMutation,
      createCalendarMutation,
      showSnackbar,
      t,
      handleCloseCalendarDialog,
      reexecuteQuery,
      onChange,
      showError,
    ],
  );

  const handleOpenDeleteCalendarDialog = useCallback(
    (index: number) => {
      setDeleteCalendarId(calendars[index].id);
    },
    [calendars],
  );
  const handleCloseDeleteCalendarDialog = useCallback(() => {
    setDeleteCalendarId(null);
  }, []);
  const handleDeleteCalendar = useCallback(async () => {
    if (deleteCalendarId) {
      setLoading(true);
      const result = await deleteCalendarMutation({
        id: deleteCalendarId,
      });
      setLoading(false);
      if (result.data?.calendar.delete.isSuccess) {
        showSnackbar(t('calendar.feedback.delete.single'), 'success');
        handleCloseDeleteCalendarDialog();
        reexecuteQuery();
        onChange?.();
      } else {
        showError(result.data?.calendar.delete.validationErrors);
      }
    }
  }, [
    deleteCalendarId,
    deleteCalendarMutation,
    handleCloseDeleteCalendarDialog,
    onChange,
    reexecuteQuery,
    showError,
    showSnackbar,
    t,
  ]);

  return (
    <>
      {loading && <Loader />}
      {calendarDialogProps.isOpen ? (
        <CalendarDialog
          input={calendarDialogProps.input}
          onClose={handleCloseCalendarDialog}
          onSave={handleSaveCalendar}
        />
      ) : deleteCalendarId ? (
        <ConfirmationDialog
          open
          onClose={handleCloseDeleteCalendarDialog}
          type="danger"
          icon={CancelOutlined}
          title="calendar.dialog.delete.title"
          description="calendar.dialog.delete.description.single"
          actions={
            <>
              <Button color="secondary" onClick={handleCloseDeleteCalendarDialog}>
                {t('common.button.cancel')}
              </Button>
              <Button color="destructive" onClick={handleDeleteCalendar}>
                {t('common.button.delete')}
              </Button>
            </>
          }
        />
      ) : (
        <Dialog open title="calendar.dialog.calendars" onClose={onClose}>
          <DialogContent
            action={
              <Button color="primary" variant="contained" startIcon={<CheckCircleOutline />} onClick={onClose}>
                {t('core.button.close')}
              </Button>
            }
          >
            <Grid2 container spacing={{ xs: 2, sm: 3 }} sx={{ pr: 2 }}>
              <SectionTitle
                actions={
                  !readonly ? (
                    <Button
                      color="secondary"
                      variant="contained"
                      startIcon={<AddCircleOutline />}
                      onClick={handleOpenCalendarDialog}
                    >
                      {t('calendar.action.add_calendar')}
                    </Button>
                  ) : undefined
                }
                value="calendar.section_title.calendars"
              />
              {calendars.map((calendar, index) => (
                <Grid2 key={calendar.id} size={12}>
                  <RepeatableField index={index} onDelete={!readonly ? handleOpenDeleteCalendarDialog : undefined}>
                    <CalendarAccordion
                      calendar={calendar}
                      readonly={readonly}
                      onDuplicate={handleDuplicateCalendar}
                      onEdit={handleEditCalendar}
                    />
                  </RepeatableField>
                </Grid2>
              ))}
            </Grid2>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
