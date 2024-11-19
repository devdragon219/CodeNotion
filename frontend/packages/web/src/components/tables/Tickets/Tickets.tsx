import { Loader, PrimaryTable } from '@realgimm5/frontend-common/components';
import { useSnackbar, useTable } from '@realgimm5/frontend-common/contexts';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { TicketMainType, TicketMasterStatus } from '@realgimm5/frontend-common/gql/types';
import { parseDateToString } from '@realgimm5/frontend-common/utils';
import { addDays, startOfToday } from 'date-fns';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { RawFeature } from '../../../enums/RawFeature';
import {
  DeleteTicketsDocument,
  ExportTicketsDocument,
  GetTicketsQueryVariables,
  useCreateIssueTicketMutation,
  useCreateOnConditionTicketMutation,
  useGetTicketsQuery,
} from '../../../gql/RealGimm.Web.Ticket.operation';
import { useFeature } from '../../../hooks/useFeature';
import { useTicket } from '../../../hooks/useTicket';
import { TicketFormInput } from '../../../interfaces/FormInputs/Ticket';
import { getTicketsColumns } from '../../../utils/ticket/getTicketsColumns';
import { getTicketsFilterInput } from '../../../utils/ticket/getTicketsFilterInput';
import {
  parseTicketFormInputToOnConditionTicketInput,
  parseTicketFormInputToTicketInput,
} from '../../../utils/ticket/parseTicketFormInput';
import { TicketCreateDialog } from '../../wizards/Ticket/Ticket';
import { TicketsTableProps } from './Tickets.types';

export const TicketsTable = ({ mainType, status }: TicketsTableProps) => {
  const { canCreate, canDelete, canUpdate, canRead } = useFeature(RawFeature.FCLT_TICKET);
  const { t } = useTranslation();
  const { showError, showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const {
    initialState,
    pause,
    variables,
    handleDelete,
    handleExport,
    handleFilter,
    handlePageChange,
    handleSort,
    setDefaultVariables,
    setInitialState,
  } = useTable<GetTicketsQueryVariables>((variables) => ({
    ...variables,
    where: {
      ...(variables.where ?? {}),
      ...(mainType
        ? {
            mainType: {
              eq: mainType,
            },
          }
        : {}),
      ...(status
        ? {
            masterStatus: {
              neq: TicketMasterStatus.Completed,
            },
            dueDate:
              status === 'expiring'
                ? {
                    gte: parseDateToString(new Date()),
                    lte: parseDateToString(addDays(startOfToday(), 30)),
                  }
                : {
                    lt: parseDateToString(new Date()),
                  },
          }
        : {}),
    },
  }));
  const [queryState, reexecuteQuery] = useGetTicketsQuery({ pause, variables });
  const [, createIssueTicketMutation] = useCreateIssueTicketMutation();
  const [, createOnConditionTicketMutation] = useCreateOnConditionTicketMutation();
  const { addDocumentsAsync } = useTicket();
  const [loading, setLoading] = useState(false);
  const [createTicketDialogProps, setCreateTicketDialogProps] = useState<TicketMainType | null>(null);
  const tickets = useMemo(() => queryState.data?.ticket.listTickets, [queryState.data]);

  useEffect(() => {
    setDefaultVariables(() => (variables: GetTicketsQueryVariables) => ({
      ...variables,
      where: {
        ...(variables.where ?? {}),
        ...(status
          ? {
              dueDate:
                status === 'expiring'
                  ? {
                      gte: parseDateToString(new Date()),
                      lte: parseDateToString(addDays(startOfToday(), 30)),
                    }
                  : {
                      lt: parseDateToString(new Date()),
                    },
            }
          : {}),
      },
    }));
    // eslint-disable-next-line
  }, [status]);

  const handleOpenCreateTicketDialog = useCallback(
    (mainType: TicketMainType) => () => {
      setCreateTicketDialogProps(mainType);
    },
    [],
  );

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
    <>
      {(queryState.fetching || loading) && <Loader />}
      <PrimaryTable
        columns={getTicketsColumns(t, { status, useMainType: !mainType })}
        empty="ticket.text.no_tickets"
        initialState={initialState}
        rows={tickets?.nodes ?? []}
        totalCount={tickets?.totalCount ?? 0}
        getRowId={({ id }) => String(id)}
        onAdd={
          canCreate && mainType !== TicketMainType.ChecklistPreventative
            ? mainType
              ? handleOpenCreateTicketDialog(mainType)
              : [
                  {
                    label: 'ticket.action.add_single_ticket',
                    onClick: handleOpenCreateTicketDialog(TicketMainType.Issue),
                  },
                  {
                    label: 'ticket.action.add_maintenance_on_condition',
                    onClick: handleOpenCreateTicketDialog(TicketMainType.ChecklistOnTriggerCondition),
                  },
                ]
            : undefined
        }
        onDelete={canDelete ? handleDelete('ticket', DeleteTicketsDocument, reexecuteQuery) : undefined}
        onEdit={
          canUpdate
            ? (row) => {
                navigate(
                  [`/app/maintenance/tickets${status ? '-timetable' : ''}`, status, row.id]
                    .filter((it) => !!it)
                    .join('/'),
                  {
                    state: { readonly: false },
                  },
                );
              }
            : undefined
        }
        onExport={canRead ? handleExport('id', ExportTicketsDocument) : undefined}
        onFilter={handleFilter(getTicketsFilterInput)}
        onPageChange={handlePageChange(tickets?.pageInfo)}
        onStateChange={setInitialState}
        onSort={handleSort()}
        onView={
          canRead
            ? (row) => {
                navigate(
                  [`/app/maintenance/tickets${status ? '-timetable' : ''}`, status, row.id]
                    .filter((it) => !!it)
                    .join('/'),
                );
              }
            : undefined
        }
      />
      {createTicketDialogProps && (
        <TicketCreateDialog
          mainType={createTicketDialogProps}
          onClose={handleCloseCreateTicketDialog}
          onSave={handleSaveCreateTicket}
        />
      )}
    </>
  );
};
