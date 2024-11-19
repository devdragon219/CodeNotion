import { Card, CardContent, CardHeader } from '@mui/material';
import { Loader, PrimaryTable } from '@realgimm5/frontend-common/components';
import { useSnackbar, useTable } from '@realgimm5/frontend-common/contexts';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { SlaCreateDialog } from '../../../../../components/dialogs/SLA/SLA';
import { RawFeature } from '../../../../../enums/RawFeature';
import {
  DeleteSlasDocument,
  ExportSlasDocument,
  GetSlasQueryVariables,
  useAddSlasMutation,
  useGetSlasQuery,
} from '../../../../../gql/RealGimm.Web.SLA.operation';
import { useFeature } from '../../../../../hooks/useFeature';
import { SlaFormInput } from '../../../../../interfaces/FormInputs/SLA';
import { getSlasColumns } from '../../../../../utils/sla/getSLAsColumns';
import { parseSlaFormInputToSlaInput } from '../../../../../utils/sla/parseSLAFormInput';

export default function Slas() {
  const { canCreate, canDelete, canUpdate, canRead } = useFeature(RawFeature.FCLT_SLA_BASE);
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
    setInitialState,
  } = useTable<GetSlasQueryVariables>((variables) => ({
    ...variables,
    where: {
      ...(variables.where ?? {}),
      isAttachedToContract: {
        eq: false,
      },
    },
  }));
  const [queryState, reexecuteQuery] = useGetSlasQuery({ pause, variables });
  const [, createSlasMutation] = useAddSlasMutation();
  const [loading, setLoading] = useState(false);
  const [isCreateSlaDialogOpen, setCreateSlaDialogOpen] = useState(false);
  const slas = useMemo(() => queryState.data?.sla.listSLAs, [queryState.data]);

  const handleOpenSlaCreateDialog = useCallback(() => {
    setCreateSlaDialogOpen(true);
  }, []);

  const handleCloseSlaCreateDialog = useCallback(() => {
    setCreateSlaDialogOpen(false);
  }, []);
  const handleSaveCreateSla = useCallback(
    async (slas: SlaFormInput[]) => {
      setLoading(true);
      const result = await createSlasMutation({
        inputs: slas.map((sla) => parseSlaFormInputToSlaInput(sla, FormMode.Create)),
      });
      setLoading(false);
      if (result.data?.sla.addRange.isSuccess) {
        showSnackbar(t('sla.feedback.create'), 'success');
        handleCloseSlaCreateDialog();
        reexecuteQuery();
      } else {
        showError(result.data?.sla.addRange.validationErrors);
      }
    },
    [createSlasMutation, showSnackbar, t, handleCloseSlaCreateDialog, reexecuteQuery, showError],
  );

  return (
    <Card>
      {(queryState.fetching || loading) && <Loader />}
      <CardHeader title={t('sla.title')} titleTypographyProps={{ variant: 'h1' }} />
      <CardContent>
        <PrimaryTable
          columns={getSlasColumns()}
          empty="sla.text.no_slas"
          initialState={initialState}
          rows={slas?.nodes ?? []}
          totalCount={slas?.totalCount ?? 0}
          getRowId={({ id }) => String(id)}
          onAdd={canCreate ? handleOpenSlaCreateDialog : undefined}
          onDelete={canDelete ? handleDelete('sla', DeleteSlasDocument, reexecuteQuery) : undefined}
          onEdit={
            canUpdate
              ? (row) => {
                  navigate(`/app/settings/maintenance/slas/${row.id}`, { state: { readonly: false } });
                }
              : undefined
          }
          onExport={canRead ? handleExport('id', ExportSlasDocument) : undefined}
          onFilter={handleFilter()}
          onPageChange={handlePageChange(slas?.pageInfo)}
          onStateChange={setInitialState}
          onSort={handleSort()}
          onView={
            canRead
              ? (row) => {
                  navigate(`/app/settings/maintenance/slas/${row.id}`);
                }
              : undefined
          }
          useColumnVisibility={false}
        />
      </CardContent>
      {isCreateSlaDialogOpen && <SlaCreateDialog onClose={handleCloseSlaCreateDialog} onSave={handleSaveCreateSla} />}
    </Card>
  );
}
