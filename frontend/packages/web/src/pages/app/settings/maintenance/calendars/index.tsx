import { Card, CardContent, CardHeader } from '@mui/material';
import { Loader, PrimaryTable } from '@realgimm5/frontend-common/components';
import { useSnackbar, useTable } from '@realgimm5/frontend-common/contexts';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { CalendarDialog } from '../../../../../components/dialogs/Calendar/Calendar';
import { RawFeature } from '../../../../../enums/RawFeature';
import { CalendarFragment } from '../../../../../gql/RealGimm.Web.Calendar.fragment';
import {
  DeleteCalendarsDocument,
  ExportCalendarsDocument,
  GetCalendarsQueryVariables,
  useAddCalendarMutation,
  useGetCalendarsQuery,
  useUpdateCalendarMutation,
} from '../../../../../gql/RealGimm.Web.Calendar.operation';
import { useFeature } from '../../../../../hooks/useFeature';
import { CalendarFormInput } from '../../../../../interfaces/FormInputs/Calendar';
import { getCalendarsColumns } from '../../../../../utils/calendar/getCalendarsColumns';
import { getCalendarsFilterInput } from '../../../../../utils/calendar/getCalendarsFilterInput';
import { parseCalendarFormInputToCalendarInput } from '../../../../../utils/calendar/parseCalendarFormInput';
import { parseCalendarToCalendarFormInput } from '../../../../../utils/calendar/parseCalendarFragment';

export default function Calendars() {
  const { canCreate, canDelete, canUpdate, canRead } = useFeature(RawFeature.FCLT_CONFIG);
  const { t } = useTranslation();
  const { showError, showSnackbar } = useSnackbar();
  const {
    initialState,
    pause,
    variables,
    handleDelete,
    handleExport,
    handleFilter,
    handlePageChange,
    handleSort,
    setInitialState,
  } = useTable<GetCalendarsQueryVariables>();
  const [queryState, reexecuteQuery] = useGetCalendarsQuery({ pause, variables });
  const [, createCalendarMutation] = useAddCalendarMutation();
  const [, updateCalendarMutation] = useUpdateCalendarMutation();
  const [loading, setLoading] = useState(false);
  const [calendarDialogProps, setCalendarDialogProps] = useState<{
    input?: CalendarFormInput;
    open: boolean;
    readonly?: boolean;
  }>({
    open: false,
  });
  const calendars = useMemo(() => queryState.data?.calendar.listCalendars, [queryState.data]);

  const handleCloseCalendarDialog = useCallback(() => {
    setCalendarDialogProps({ open: false });
  }, []);

  const handleEditCalendar = useCallback((row: CalendarFragment) => {
    setCalendarDialogProps({
      input: parseCalendarToCalendarFormInput(row),
      open: true,
    });
  }, []);

  const handleViewCalendar = useCallback((row: CalendarFragment) => {
    setCalendarDialogProps({
      input: parseCalendarToCalendarFormInput(row),
      open: true,
      readonly: true,
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
      showError,
    ],
  );

  const handleAddCalendar = useCallback(() => {
    setCalendarDialogProps({
      open: true,
    });
  }, []);

  return (
    <Card>
      {(queryState.fetching || loading) && <Loader />}
      <CardHeader title={t('calendar.title')} titleTypographyProps={{ variant: 'h1' }} />
      <CardContent>
        <PrimaryTable
          columns={getCalendarsColumns()}
          empty="calendar.text.no_calendars"
          initialState={initialState}
          rows={calendars?.nodes ?? []}
          totalCount={calendars?.totalCount ?? 0}
          getRowId={({ id }) => String(id)}
          onAdd={canCreate ? handleAddCalendar : undefined}
          onDelete={canDelete ? handleDelete('calendar', DeleteCalendarsDocument, reexecuteQuery) : undefined}
          onEdit={canUpdate ? handleEditCalendar : undefined}
          onExport={canRead ? handleExport('id', ExportCalendarsDocument) : undefined}
          onFilter={handleFilter(getCalendarsFilterInput)}
          onPageChange={handlePageChange(calendars?.pageInfo)}
          onStateChange={setInitialState}
          onSort={handleSort()}
          onView={canRead ? handleViewCalendar : undefined}
          useColumnVisibility={false}
        />
      </CardContent>
      {calendarDialogProps.open && (
        <CalendarDialog
          input={calendarDialogProps.input}
          readonly={calendarDialogProps.readonly}
          onClose={handleCloseCalendarDialog}
          onSave={handleSaveCalendar}
        />
      )}
    </Card>
  );
}
