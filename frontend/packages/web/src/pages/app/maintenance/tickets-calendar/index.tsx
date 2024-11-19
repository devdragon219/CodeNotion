import { Button, Card, CardContent, CardHeader, Stack } from '@mui/material';
import {
  CalendarDateRange,
  CalendarEvent,
  CalendarEventType,
  FullCalendar,
  FullSearch,
  Loader,
  SelectField,
  Transition,
} from '@realgimm5/frontend-common/components';
import { useSnackbar } from '@realgimm5/frontend-common/contexts';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { TicketMainType, TicketMasterStatus } from '@realgimm5/frontend-common/gql/types';
import { parseDateToString, parseStringToDate } from '@realgimm5/frontend-common/utils';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { TicketsAdd } from '../../../../components/domains/TicketsAdd/TicketsAdd';
import { TicketCreateDialog } from '../../../../components/wizards/Ticket/Ticket';
import { RawFeature } from '../../../../enums/RawFeature';
import {
  useCreateIssueTicketMutation,
  useCreateOnConditionTicketMutation,
  useGetTicketsCalendarQuery,
} from '../../../../gql/RealGimm.Web.Ticket.operation';
import { useFeature } from '../../../../hooks/useFeature';
import { useTicket } from '../../../../hooks/useTicket';
import { TicketFormInput } from '../../../../interfaces/FormInputs/Ticket';
import { getTicketsCalendarFilterInput } from '../../../../utils/ticket/getTicketsCalendarFilterInput';
import {
  parseTicketFormInputToOnConditionTicketInput,
  parseTicketFormInputToTicketInput,
} from '../../../../utils/ticket/parseTicketFormInput';

export default function TicketsCalendar() {
  useFeature(RawFeature.FCLT_TICKET);
  const { t } = useTranslation();
  const { showError, showSnackbar } = useSnackbar();
  const [searchInput, setSearchInput] = useState('');
  const [areFiltersVisible, setFiltersVisible] = useState(false);
  const [mainTypes, setMainTypes] = useState<TicketMainType[]>([]);
  const [masterStatuses, setMasterStatuses] = useState<TicketMasterStatus[]>([]);
  const [isExcludedFromMaintenanceContract, setExcludedFromMaintenanceContract] = useState<boolean | null>(null);
  const [dateRange, setDateRange] = useState<CalendarDateRange>();
  const [queryState, reexecuteQuery] = useGetTicketsCalendarQuery({
    pause: dateRange === undefined,
    variables: {
      startDate: parseDateToString(dateRange?.start ?? new Date())!,
      endDate: parseDateToString(dateRange?.end ?? new Date())!,
      where: getTicketsCalendarFilterInput(searchInput, mainTypes, masterStatuses, isExcludedFromMaintenanceContract),
    },
  });
  const [, createIssueTicketMutation] = useCreateIssueTicketMutation();
  const [, createOnConditionTicketMutation] = useCreateOnConditionTicketMutation();
  const { addDocumentsAsync } = useTicket();
  const [loading, setLoading] = useState(false);
  const [createTicketDialogProps, setCreateTicketDialogProps] = useState<TicketMainType | null>(null);
  const events = useMemo(
    () =>
      queryState.data?.ticket.listTicketsForCalendar.map<CalendarEvent>(({ dueDate, id, mainType }) => {
        const getType = (): CalendarEventType => {
          switch (mainType) {
            case TicketMainType.ChecklistOnTriggerCondition:
              return 'schedule';
            case TicketMainType.ChecklistPreventative:
              return 'recurring';
            case TicketMainType.Issue:
            case TicketMainType.IssueParent:
              return 'report';
          }
        };

        return {
          date: parseStringToDate(dueDate)!,
          title: t(`common.enum.ticket_main_type.${mainType}`),
          type: getType(),
          url: id ? `/app/maintenance/tickets/${id}` : undefined,
        };
      }),
    [queryState.data, t],
  );

  const activeFilters = useMemo(
    () =>
      [mainTypes.length !== 0, masterStatuses.length !== 0, isExcludedFromMaintenanceContract !== null].filter(
        (it) => it,
      ).length,
    [isExcludedFromMaintenanceContract, mainTypes.length, masterStatuses.length],
  );

  const handleToggleFiltersVisible = useCallback(() => {
    setFiltersVisible((areFiltersVisible) => !areFiltersVisible);
  }, []);
  const handleResetFilters = useCallback(() => {
    setMainTypes([]);
    setMasterStatuses([]);
    setExcludedFromMaintenanceContract(null);
  }, []);

  const handleCloseCreateTicketDialog = useCallback(() => {
    setCreateTicketDialogProps(null);
  }, []);
  const handleSaveCreateTicket = useCallback(
    async (ticket: TicketFormInput) => {
      const execute = async () => {
        if (ticket.mainType === TicketMainType.ChecklistOnTriggerCondition) {
          const result = await createOnConditionTicketMutation({
            input: parseTicketFormInputToOnConditionTicketInput(ticket),
          });
          return result.data?.ticket.addOnTriggerChecklistTicketRange;
        } else {
          const result = await createIssueTicketMutation({
            input: parseTicketFormInputToTicketInput(ticket, FormMode.Create),
          });
          return result.data?.ticket.addIssue;
        }
      };

      setLoading(true);
      const result = await execute();
      setLoading(false);
      if (result?.isSuccess) {
        showSnackbar(t('ticket.feedback.create'), 'success');
        if (Array.isArray(result.value)) {
          result.value.forEach((it) => {
            addDocumentsAsync(it!.id, ticket.documents, ticket.images);
          });
        } else {
          addDocumentsAsync(result.value!.id, ticket.documents, ticket.images);
        }
        handleCloseCreateTicketDialog();
        reexecuteQuery();
      } else {
        showError(result?.validationErrors);
      }
    },
    [
      createOnConditionTicketMutation,
      createIssueTicketMutation,
      showSnackbar,
      t,
      addDocumentsAsync,
      handleCloseCreateTicketDialog,
      reexecuteQuery,
      showError,
    ],
  );

  return (
    <Card>
      <CardHeader title={t('ticket.title.calendar')} titleTypographyProps={{ variant: 'h1' }} />
      <CardContent>
        {(queryState.fetching || loading) && <Loader />}
        {createTicketDialogProps && (
          <TicketCreateDialog
            mainType={createTicketDialogProps}
            onClose={handleCloseCreateTicketDialog}
            onSave={handleSaveCreateTicket}
          />
        )}
        <Stack direction="column" spacing={{ xs: 3, sm: 4 }}>
          <Stack direction="column" spacing={2}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} sx={{ justifyContent: 'space-between' }}>
              <FullSearch
                areFiltersVisible={areFiltersVisible}
                inUseFilters={activeFilters}
                hasFilters
                value={searchInput}
                onSearch={setSearchInput}
                onToggleFiltersVisible={handleToggleFiltersVisible}
              />
              <TicketsAdd onAdd={setCreateTicketDialogProps} />
            </Stack>
            <Transition type="collapse" in={areFiltersVisible} unmountOnExit>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                <SelectField
                  label={t(`ticket.field.main_type`)}
                  options={Object.values(TicketMainType)}
                  getOptionLabel={(option) => t(`common.enum.ticket_main_type.${option}`)}
                  value={mainTypes}
                  onChange={setMainTypes}
                  sx={(theme) => ({
                    [theme.breakpoints.up('md')]: {
                      maxWidth: '250px',
                    },
                  })}
                  clearable
                  multiple
                />
                <SelectField
                  label={t(`ticket.field.ticket_status`)}
                  options={Object.values(TicketMasterStatus)}
                  getOptionLabel={(option) => t(`common.enum.ticket_master_status.${option}`)}
                  value={masterStatuses}
                  onChange={setMasterStatuses}
                  sx={(theme) => ({
                    [theme.breakpoints.up('md')]: {
                      maxWidth: '250px',
                    },
                  })}
                  clearable
                  multiple
                />
                <SelectField
                  label={t(`ticket.field.excluded_from_contract`)}
                  options={[true, false]}
                  getOptionLabel={(option) => t(`common.text.${option}`)}
                  value={isExcludedFromMaintenanceContract}
                  onChange={setExcludedFromMaintenanceContract}
                  sx={(theme) => ({
                    [theme.breakpoints.up('md')]: {
                      maxWidth: '250px',
                    },
                  })}
                  clearable
                />
                {activeFilters !== 0 && (
                  <Button
                    color="secondary"
                    variant="outlined"
                    onClick={handleResetFilters}
                    sx={{ whiteSpace: 'nowrap' }}
                  >
                    {t('common.component.table.reset_filters')}
                  </Button>
                )}
              </Stack>
            </Transition>
          </Stack>
          <FullCalendar events={events} onDateRangeChange={setDateRange} />
        </Stack>
      </CardContent>
    </Card>
  );
}
