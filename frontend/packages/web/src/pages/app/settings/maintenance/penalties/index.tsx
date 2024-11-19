import { Card, CardContent, CardHeader } from '@mui/material';
import { Loader, PrimaryTable } from '@realgimm5/frontend-common/components';
import { useSnackbar, useTable } from '@realgimm5/frontend-common/contexts';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { PenaltyCreateDialog } from '../../../../../components/dialogs/Penalty/Penalty';
import { RawFeature } from '../../../../../enums/RawFeature';
import {
  DeletePenaltiesDocument,
  ExportPenaltiesDocument,
  GetPenaltiesQueryVariables,
  useAddPenaltiesMutation,
  useGetPenaltiesQuery,
} from '../../../../../gql/RealGimm.Web.Penalty.operation';
import { useFeature } from '../../../../../hooks/useFeature';
import { PenaltyFormInput } from '../../../../../interfaces/FormInputs/Penalty';
import { getPenaltiesColumns } from '../../../../../utils/penalty/getPenaltiesColumns';
import { parsePenaltyFormInputToPenaltyInput } from '../../../../../utils/penalty/parsePenaltyFormInput';

export default function Penalties() {
  const { canCreate, canDelete, canUpdate, canRead } = useFeature(RawFeature.FCLT_PENALTY_BASE);
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
  } = useTable<GetPenaltiesQueryVariables>((variables) => ({
    ...variables,
    where: {
      ...(variables.where ?? {}),
      isAttachedToContract: {
        eq: false,
      },
    },
  }));
  const [queryState, reexecuteQuery] = useGetPenaltiesQuery({ pause, variables });
  const [, createPenaltiesMutation] = useAddPenaltiesMutation();
  const [loading, setLoading] = useState(false);
  const [isCreatePenaltyDialogOpen, setCreatePenaltyDialogOpen] = useState(false);
  const penalties = useMemo(() => queryState.data?.penalty.listPenalties, [queryState.data]);

  const handleOpenPenaltyCreateDialog = useCallback(() => {
    setCreatePenaltyDialogOpen(true);
  }, []);

  const handleClosePenaltyCreateDialog = useCallback(() => {
    setCreatePenaltyDialogOpen(false);
  }, []);
  const handleSaveCreatePenalty = useCallback(
    async (penalties: PenaltyFormInput[]) => {
      setLoading(true);
      const result = await createPenaltiesMutation({
        inputs: penalties.map((penalty) => parsePenaltyFormInputToPenaltyInput(penalty, FormMode.Create)),
      });
      setLoading(false);
      if (result.data?.penalty.addRange.isSuccess) {
        showSnackbar(t('penalty.feedback.create'), 'success');
        handleClosePenaltyCreateDialog();
        reexecuteQuery();
      } else {
        showError(result.data?.penalty.addRange.validationErrors);
      }
    },
    [createPenaltiesMutation, showSnackbar, t, handleClosePenaltyCreateDialog, reexecuteQuery, showError],
  );

  return (
    <Card>
      {(queryState.fetching || loading) && <Loader />}
      <CardHeader title={t('penalty.title')} titleTypographyProps={{ variant: 'h1' }} />
      <CardContent>
        <PrimaryTable
          columns={getPenaltiesColumns()}
          empty="penalty.text.no_penalties"
          initialState={initialState}
          rows={penalties?.nodes ?? []}
          totalCount={penalties?.totalCount ?? 0}
          getRowId={({ id }) => String(id)}
          onAdd={canCreate ? handleOpenPenaltyCreateDialog : undefined}
          onDelete={canDelete ? handleDelete('penalty', DeletePenaltiesDocument, reexecuteQuery) : undefined}
          onEdit={
            canUpdate
              ? (row) => {
                  navigate(`/app/settings/maintenance/penalties/${row.id}`, { state: { readonly: false } });
                }
              : undefined
          }
          onExport={canRead ? handleExport('id', ExportPenaltiesDocument) : undefined}
          onFilter={handleFilter()}
          onPageChange={handlePageChange(penalties?.pageInfo)}
          onStateChange={setInitialState}
          onSort={handleSort()}
          onView={
            canRead
              ? (row) => {
                  navigate(`/app/settings/maintenance/penalties/${row.id}`);
                }
              : undefined
          }
          useColumnVisibility={false}
        />
      </CardContent>
      {isCreatePenaltyDialogOpen && (
        <PenaltyCreateDialog onClose={handleClosePenaltyCreateDialog} onSave={handleSaveCreatePenalty} />
      )}
    </Card>
  );
}
