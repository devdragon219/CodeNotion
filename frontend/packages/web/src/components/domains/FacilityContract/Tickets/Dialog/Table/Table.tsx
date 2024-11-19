import { Grid2 } from '@mui/material';
import { Loader, PrimaryTable, SectionTitle } from '@realgimm5/frontend-common/components';
import { useTable } from '@realgimm5/frontend-common/contexts';
import { TicketMainType } from '@realgimm5/frontend-common/gql/types';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { RawFeature } from '../../../../../../enums/RawFeature';
import {
  GetTicketsPerEstateUnitsPerYearsQueryVariables,
  useGetTicketsPerEstateUnitsPerYearsQuery,
} from '../../../../../../gql/RealGimm.Web.Ticket.operation';
import { useFeature } from '../../../../../../hooks/useFeature';
import { getFacilityContractTicketsColumns } from '../../../../../../utils/facilityContract/getFacilityContractTicketsColumns';
import { TicketsHistoryTableProps } from './Table.types';

export const TicketsHistoryTable = ({ facilityContractId }: TicketsHistoryTableProps) => {
  const { canRead } = useFeature(RawFeature.FCLT_CONTRACT_BASE);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { initialState, pause, variables, handleFilter, handlePageChange, handleSort, setInitialState } =
    useTable<GetTicketsPerEstateUnitsPerYearsQueryVariables>((variables) => ({
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
          neq: new Date().getFullYear(),
        },
      },
    }));
  const [queryState] = useGetTicketsPerEstateUnitsPerYearsQuery({ pause, variables });
  const tickets = useMemo(() => queryState.data?.ticket.listTicketsPerEstateUnitsPerYears, [queryState.data]);

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      {queryState.fetching && <Loader />}
      <SectionTitle value="facility_contract.section_title.tickets" />
      <Grid2 size={12}>
        <PrimaryTable
          color="secondary"
          columns={getFacilityContractTicketsColumns(t, { useGroupByEstateUnit: true, useGroupByYear: true })}
          empty="facility_contract.text.no_tickets_history"
          hideRowActions={(row) => !!row.tickets}
          initialState={initialState}
          rows={tickets?.nodes ?? []}
          rowActionsVariant="inline"
          totalCount={tickets?.totalCount ?? 0}
          useRowExpandCollapse
          useRowSelection={false}
          useSelectedRows={false}
          getRowId={(row) => String(row.requestYear ?? row.locationEstateUnit?.id ?? row.id)}
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
