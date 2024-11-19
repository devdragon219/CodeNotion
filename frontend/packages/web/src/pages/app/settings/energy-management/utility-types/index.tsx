import { Card, CardContent, CardHeader } from '@mui/material';
import { Loader, PrimaryTable } from '@realgimm5/frontend-common/components';
import { useSnackbar, useTable } from '@realgimm5/frontend-common/contexts';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { UtilityTypeCreateDialog } from '../../../../../components/wizards/UtilityType/UtilityType';
import { RawFeature } from '../../../../../enums/RawFeature';
import {
  DeleteUtilityTypesDocument,
  ExportUtilityTypesDocument,
  GetUtilityTypesQueryVariables,
  useCreateUtilityTypeMutation,
  useGetUtilityTypesQuery,
} from '../../../../../gql/RealGimm.Web.UtilityType.operation';
import { useFeature } from '../../../../../hooks/useFeature';
import { UtilityTypeFormInput } from '../../../../../interfaces/FormInputs/UtilityType';
import { getUtilityTypesColumns } from '../../../../../utils/utilityType/getUtilityTypesColumns';
import { parseUtilityTypeFormInputToUtilityTypeInput } from '../../../../../utils/utilityType/parseUtilityTypeFormInput';

export default function UtilityTypes() {
  const { canCreate, canDelete, canUpdate, canRead } = useFeature(RawFeature.NRGY_TYPE_BASE);
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
  } = useTable<GetUtilityTypesQueryVariables>();
  const [queryState, reexecuteQuery] = useGetUtilityTypesQuery({ pause, variables });
  const [, createUtilityTypeMutation] = useCreateUtilityTypeMutation();
  const [loading, setLoading] = useState(false);
  const [isCreateUtilityTypeDialogOpen, setCreateUtilityTypeDialogOpen] = useState(false);
  const utilityTypes = useMemo(() => queryState.data?.utilityType.listUtilityType, [queryState.data]);

  const handleOpenCreateUtilityTypeDialog = useCallback(() => {
    setCreateUtilityTypeDialogOpen(true);
  }, []);

  const handleCloseCreateUtilityTypeDialog = useCallback(() => {
    setCreateUtilityTypeDialogOpen(false);
  }, []);
  const handleSaveCreateUtilityType = useCallback(
    async (utilityType: UtilityTypeFormInput) => {
      setLoading(true);
      const result = await createUtilityTypeMutation({
        utilityTypeInput: parseUtilityTypeFormInputToUtilityTypeInput(utilityType),
      });
      setLoading(false);
      if (result.data?.utilityType.add.isSuccess) {
        showSnackbar(t('utility_type.feedback.create'), 'success');
        handleCloseCreateUtilityTypeDialog();
        reexecuteQuery();
      } else {
        showError(result.data?.utilityType.add.validationErrors);
      }
    },
    [createUtilityTypeMutation, showSnackbar, t, handleCloseCreateUtilityTypeDialog, reexecuteQuery, showError],
  );

  return (
    <Card>
      {(queryState.fetching || loading) && <Loader />}
      <CardHeader title={t('utility_type.title')} titleTypographyProps={{ variant: 'h1' }} />
      <CardContent>
        <PrimaryTable
          columns={getUtilityTypesColumns(t)}
          empty="utility_type.text.no_utility_types"
          initialState={initialState}
          rows={utilityTypes?.nodes ?? []}
          totalCount={utilityTypes?.totalCount ?? 0}
          getRowId={({ id }) => String(id)}
          onAdd={canCreate ? handleOpenCreateUtilityTypeDialog : undefined}
          onDelete={canDelete ? handleDelete('utility_type', DeleteUtilityTypesDocument, reexecuteQuery) : undefined}
          onEdit={
            canUpdate
              ? (row) => {
                  navigate(`/app/settings/energy-management/utility-types/${row.id}`, { state: { readonly: false } });
                }
              : undefined
          }
          onExport={canRead ? handleExport('id', ExportUtilityTypesDocument) : undefined}
          onFilter={handleFilter()}
          onPageChange={handlePageChange(utilityTypes?.pageInfo)}
          onStateChange={setInitialState}
          onSort={handleSort()}
          onView={
            canRead
              ? (row) => {
                  navigate(`/app/settings/energy-management/utility-types/${row.id}`);
                }
              : undefined
          }
          useColumnVisibility={false}
        />
      </CardContent>
      {isCreateUtilityTypeDialogOpen && (
        <UtilityTypeCreateDialog onClose={handleCloseCreateUtilityTypeDialog} onSave={handleSaveCreateUtilityType} />
      )}
    </Card>
  );
}
