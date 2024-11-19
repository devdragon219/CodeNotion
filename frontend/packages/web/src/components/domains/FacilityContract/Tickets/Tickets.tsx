import { Button, Grid2 } from '@mui/material';
import { Loader, PrimaryTable, SectionTitle } from '@realgimm5/frontend-common/components';
import { useTable } from '@realgimm5/frontend-common/contexts';
import { TicketMainType } from '@realgimm5/frontend-common/gql/types';
import { useCallback, useMemo, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { RawFeature } from '../../../../enums/RawFeature';
import {
  GetTicketsPerEstateUnitsQueryVariables,
  useGetTicketsPerEstateUnitsQuery,
} from '../../../../gql/RealGimm.Web.Ticket.operation';
import { useFeature } from '../../../../hooks/useFeature';
import { getFacilityContractTicketsColumns } from '../../../../utils/facilityContract/getFacilityContractTicketsColumns';
import { TicketsHistoryDialog } from './Dialog/Dialog';
import { FacilityContractTicketsProps } from './Tickets.types';

export const FacilityContractTickets = ({ control }: FacilityContractTicketsProps) => {
  const { canRead } = useFeature(RawFeature.FCLT_CONTRACT_BASE);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const facilityContractId = useWatch({ control, name: 'facilityContractId' });
  const { initialState, pause, variables, handleFilter, handlePageChange, handleSort, setInitialState } =
    useTable<GetTicketsPerEstateUnitsQueryVariables>((variables) => ({
      ...variables,
      where: {
        ...(variables.where ?? {}),
        contract: {
          id: {
            eq: facilityContractId,
          },
        },
        mainType: {
          in: [TicketMainType.ChecklistOnTriggerCondition, TicketMainType.ChecklistPreventative],
        },
        requestYear: {
          eq: new Date().getFullYear(),
        },
      },
    }));
  const [queryState] = useGetTicketsPerEstateUnitsQuery({ pause, variables });
  const [isTicketsHistoryDialogOpen, setTicketsHistoryDialogOpen] = useState(false);
  const tickets = useMemo(() => queryState.data?.ticket.listTicketsPerEstateUnits, [queryState.data]);

  const handleOpenTicketsHistoryDialog = useCallback(() => {
    setTicketsHistoryDialogOpen(true);
  }, []);
  const handleCloseTicketsHistoryDialog = useCallback(() => {
    setTicketsHistoryDialogOpen(false);
  }, []);

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      {queryState.fetching && <Loader />}
      {isTicketsHistoryDialogOpen && (
        <TicketsHistoryDialog facilityContractId={facilityContractId} onClose={handleCloseTicketsHistoryDialog} />
      )}
      <SectionTitle
        actions={
          <Button variant="text" onClick={handleOpenTicketsHistoryDialog}>
            {t('facility_contract.action.view_tickets_history')}
          </Button>
        }
        value="facility_contract.section_title.tickets"
      />
      <Grid2 size={12}>
        <PrimaryTable
          color="secondary"
          columns={getFacilityContractTicketsColumns(t, { useGroupByEstateUnit: true })}
          empty="facility_contract.text.no_tickets"
          hideRowActions={(row) => !!row.tickets}
          initialState={initialState}
          rows={tickets?.nodes ?? []}
          rowActionsVariant="inline"
          totalCount={tickets?.totalCount ?? 0}
          useRowExpandCollapse
          useRowSelection={false}
          useSelectedRows={false}
          getRowId={(row) => String(row.locationEstateUnit?.id ?? row.id)}
          getSubRows={(row) => row.tickets}
          onFilter={handleFilter()}
          onPageChange={handlePageChange(tickets?.pageInfo)}
          onStateChange={setInitialState}
          onSort={handleSort()}
          onView={
            canRead
              ? (row) => {
                  if (row.tickets) return;
                  navigate(`/app/maintenance/tickets/${row.id}`);
                }
              : undefined
          }
        />
      </Grid2>
    </Grid2>
  );
};
