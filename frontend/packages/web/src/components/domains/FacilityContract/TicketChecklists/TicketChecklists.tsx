import { Grid2 } from '@mui/material';
import { Loader, PrimaryTable, SectionTitle } from '@realgimm5/frontend-common/components';
import { useSnackbar, useTable } from '@realgimm5/frontend-common/contexts';
import { TicketChecklistTemplatesPerEstateUnitInput } from '@realgimm5/frontend-common/gql/types';
import { useCallback, useMemo, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { RawFeature } from '../../../../enums/RawFeature';
import {
  DeleteTicketChecklistsDocument,
  GetGroupedTicketChecklistsQueryVariables,
  useAddTicketChecklistsMutation,
  useGetGroupedTicketChecklistsQuery,
} from '../../../../gql/RealGimm.Web.TicketChecklist.operation';
import { useFeature } from '../../../../hooks/useFeature';
import {
  GroupedTicketChecklistRow,
  TicketChecklistsFormInput,
} from '../../../../interfaces/FormInputs/TicketChecklist';
import { getTicketChecklistsColumns } from '../../../../utils/ticketChecklist/getTicketChecklistsColumns';
import { TicketChecklistCreateDialog } from '../../../wizards/TicketChecklist/TicketChecklist';
import { FacilityContractTicketChecklistsProps } from './TicketChecklists.types';

export const FacilityContractTicketChecklists = ({ control, readonly }: FacilityContractTicketChecklistsProps) => {
  const { canCreate, canDelete, canUpdate, canRead } = useFeature(RawFeature.FCLT_CONTRACT_BASE);
  const { t } = useTranslation();
  const { showError, showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const facilityContractId = useWatch({ control, name: 'facilityContractId' });
  const estateUnits = useWatch({ control, name: 'estateUnits' });
  const { initialState, pause, variables, handleDelete, handleFilter, handlePageChange, handleSort, setInitialState } =
    useTable<GetGroupedTicketChecklistsQueryVariables>((variables) => ({
      ...variables,
      where: {
        ...(variables.where ?? {}),
        contract: {
          id: {
            eq: facilityContractId,
          },
        },
      },
    }));
  const [queryState, reexecuteQuery] = useGetGroupedTicketChecklistsQuery({ pause, variables });
  const [, addTicketChecklistMutation] = useAddTicketChecklistsMutation();
  const [loading, setLoading] = useState(false);
  const [isTicketChecklistCreateDialogOpen, setTicketChecklistCreateDialogOpen] = useState(false);
  const ticketChecklists = useMemo(
    () => queryState.data?.ticketChecklist.listTicketChecklistsPerEstateUnits,
    [queryState.data],
  );

  const handleOpenTicketChecklistCreateDialog = useCallback(() => {
    setTicketChecklistCreateDialogOpen(true);
  }, []);
  const handleCloseTicketChecklistCreateDialog = useCallback(() => {
    setTicketChecklistCreateDialogOpen(false);
  }, []);
  const handleSaveTicketChecklists = useCallback(
    async (ticketChecklists: TicketChecklistsFormInput) => {
      setLoading(true);
      const result = await addTicketChecklistMutation({
        facilityContractId: Number(facilityContractId),
        inputs: ticketChecklists.estateUnits.reduce<TicketChecklistTemplatesPerEstateUnitInput[]>((acc, estateUnit) => {
          const templateIds = ticketChecklists.ticketChecklistTemplates.reduce<number[]>(
            (acc, template) =>
              ticketChecklists.catalogueTypes[template.catalogueType.id]?.includes(estateUnit.estate.id)
                ? [...acc, template.id]
                : acc,
            [],
          );
          if (templateIds.length === 0) return acc;

          return [
            ...acc,
            {
              estateUnitId: estateUnit.id,
              templateIds,
            },
          ];
        }, []),
      });
      setLoading(false);
      if (result.data?.ticketChecklist.addRange.isSuccess) {
        showSnackbar(t('ticket_checklist.feedback.create'), 'success');
        handleCloseTicketChecklistCreateDialog();
        reexecuteQuery();
      } else {
        showError(result.data?.ticketChecklist.addRange.validationErrors);
      }
    },
    [
      addTicketChecklistMutation,
      facilityContractId,
      handleCloseTicketChecklistCreateDialog,
      reexecuteQuery,
      showError,
      showSnackbar,
      t,
    ],
  );

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      {(loading || queryState.fetching) && <Loader />}
      {isTicketChecklistCreateDialogOpen && (
        <TicketChecklistCreateDialog
          estateUnits={estateUnits}
          onClose={handleCloseTicketChecklistCreateDialog}
          onSave={handleSaveTicketChecklists}
        />
      )}
      <SectionTitle value="facility_contract.section_title.ticket_checklists" />
      <Grid2 size={12}>
        <PrimaryTable
          color="secondary"
          columns={getTicketChecklistsColumns<GroupedTicketChecklistRow>(t, { useGroupByEstateUnit: true })}
          empty="ticket_checklist.text.no_ticket_checklists"
          hideRowActions={(row) => !!row.ticketChecklists}
          initialState={initialState}
          rows={ticketChecklists?.nodes ?? []}
          rowActionsVariant="inline"
          totalCount={ticketChecklists?.totalCount ?? 0}
          useRowExpandCollapse
          useRowSelection={false}
          useSelectedRows={false}
          getRowId={(row) => String(row.estateUnit?.id ?? row.id)}
          getSubRows={(row) => row.ticketChecklists}
          onAdd={
            canCreate
              ? {
                  color: 'secondary',
                  label: 'ticket_checklist.action.add_ticket_checklists',
                  onClick: handleOpenTicketChecklistCreateDialog,
                }
              : undefined
          }
          onDelete={
            canDelete && !readonly
              ? handleDelete('ticket_checklist', DeleteTicketChecklistsDocument, reexecuteQuery)
              : undefined
          }
          onEdit={
            canUpdate && !readonly
              ? (row) => {
                  navigate(`/app/maintenance/facility-contracts/${facilityContractId}/ticket-checklists/${row.id}`, {
                    state: { readonly: false },
                  });
                }
              : undefined
          }
          onFilter={handleFilter()}
          onPageChange={handlePageChange(ticketChecklists?.pageInfo)}
          onStateChange={setInitialState}
          onSort={handleSort()}
          onView={
            canRead
              ? (row) => {
                  if (row.ticketChecklists) return;
                  navigate(`/app/maintenance/facility-contracts/${facilityContractId}/ticket-checklists/${row.id}`);
                }
              : undefined
          }
        />
      </Grid2>
    </Grid2>
  );
};
