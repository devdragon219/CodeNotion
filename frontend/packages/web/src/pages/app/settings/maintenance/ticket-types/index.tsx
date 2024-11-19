import { Card, CardContent, CardHeader } from '@mui/material';
import { Loader, PrimaryTable } from '@realgimm5/frontend-common/components';
import { useSnackbar, useTable } from '@realgimm5/frontend-common/contexts';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { TicketTypeDialog } from '../../../../../components/dialogs/TicketType/TicketType';
import { RawFeature } from '../../../../../enums/RawFeature';
import { TicketTypeFragment } from '../../../../../gql/RealGimm.Web.TicketType.fragment';
import {
  DeleteTicketTypesDocument,
  ExportTicketTypesDocument,
  GetTicketTypesQueryVariables,
  useAddTicketTypeMutation,
  useGetTicketTypesQuery,
  useUpdateTicketTypeMutation,
} from '../../../../../gql/RealGimm.Web.TicketType.operation';
import { useFeature } from '../../../../../hooks/useFeature';
import { TicketTypeFormInput } from '../../../../../interfaces/FormInputs/TicketType';
import { getTicketTypesColumns } from '../../../../../utils/ticketType/getTicketTypesColumns';
import { getTicketTypesSortInput } from '../../../../../utils/ticketType/getTicketTypesSortInput';
import { parseTicketTypeFormInputToTicketTypeInput } from '../../../../../utils/ticketType/parseTicketTypeFormInput';
import { parseTicketTypeToTicketTypeFormInput } from '../../../../../utils/ticketType/parseTicketTypeFragment';

export default function TicketTypes() {
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
  } = useTable<GetTicketTypesQueryVariables>();
  const [queryState, reexecuteQuery] = useGetTicketTypesQuery({ pause, variables });
  const [, createTicketTypeMutation] = useAddTicketTypeMutation();
  const [, updateTicketTypeMutation] = useUpdateTicketTypeMutation();
  const [loading, setLoading] = useState(false);
  const [interventionTypeDialogProps, setTicketTypeDialogProps] = useState<{
    input?: TicketTypeFormInput;
    open: boolean;
    readonly?: boolean;
  }>({
    open: false,
  });
  const ticketTypes = useMemo(() => queryState.data?.ticketType.listTicketTypes, [queryState.data]);

  const handleCloseTicketTypeDialog = useCallback(() => {
    setTicketTypeDialogProps({ open: false });
  }, []);

  const handleEditTicketType = useCallback((row: TicketTypeFragment) => {
    setTicketTypeDialogProps({
      input: parseTicketTypeToTicketTypeFormInput(row),
      open: true,
    });
  }, []);

  const handleViewTicketType = useCallback((row: TicketTypeFragment) => {
    setTicketTypeDialogProps({
      input: parseTicketTypeToTicketTypeFormInput(row),
      open: true,
      readonly: true,
    });
  }, []);

  const handleSaveTicketType = useCallback(
    async (value: TicketTypeFormInput) => {
      const saveTicketType = async () => {
        if (value.ticketTypeId) {
          const result = await updateTicketTypeMutation({
            ticketTypeId: value.ticketTypeId,
            input: parseTicketTypeFormInputToTicketTypeInput(value),
          });
          return result.data?.ticketType.update;
        } else {
          const result = await createTicketTypeMutation({
            input: parseTicketTypeFormInputToTicketTypeInput(value),
          });
          return result.data?.ticketType.add;
        }
      };
      setLoading(true);
      const result = await saveTicketType();
      setLoading(false);
      if (result?.isSuccess) {
        showSnackbar(t(`ticket_type.feedback.${value.ticketTypeId ? 'update' : 'create'}`), 'success');
        handleCloseTicketTypeDialog();
        reexecuteQuery();
      } else {
        showError(result?.validationErrors);
      }
    },
    [
      updateTicketTypeMutation,
      createTicketTypeMutation,
      showSnackbar,
      t,
      handleCloseTicketTypeDialog,
      reexecuteQuery,
      showError,
    ],
  );

  const handleAddTicketType = useCallback(() => {
    setTicketTypeDialogProps({
      open: true,
    });
  }, []);

  return (
    <Card>
      {(queryState.fetching || loading) && <Loader />}
      <CardHeader title={t('ticket_type.title')} titleTypographyProps={{ variant: 'h1' }} />
      <CardContent>
        <PrimaryTable
          columns={getTicketTypesColumns()}
          empty="ticket_type.text.no_ticket_types"
          initialState={initialState}
          rows={ticketTypes?.nodes ?? []}
          totalCount={ticketTypes?.totalCount ?? 0}
          getRowId={({ id }) => String(id)}
          onAdd={canCreate ? handleAddTicketType : undefined}
          onDelete={canDelete ? handleDelete('ticket_type', DeleteTicketTypesDocument, reexecuteQuery) : undefined}
          onEdit={canUpdate ? handleEditTicketType : undefined}
          onExport={canRead ? handleExport('id', ExportTicketTypesDocument) : undefined}
          onFilter={handleFilter()}
          onPageChange={handlePageChange(ticketTypes?.pageInfo)}
          onStateChange={setInitialState}
          onSort={handleSort(getTicketTypesSortInput)}
          onView={canRead ? handleViewTicketType : undefined}
          useColumnVisibility={false}
        />
      </CardContent>
      {interventionTypeDialogProps.open && (
        <TicketTypeDialog
          input={interventionTypeDialogProps.input}
          readonly={interventionTypeDialogProps.readonly}
          onClose={handleCloseTicketTypeDialog}
          onSave={handleSaveTicketType}
        />
      )}
    </Card>
  );
}
