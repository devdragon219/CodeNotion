import { Card, CardContent, CardHeader } from '@mui/material';
import { Loader, PrimaryTable } from '@realgimm5/frontend-common/components';
import { useSnackbar, useTable } from '@realgimm5/frontend-common/contexts';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { MainUsageTypeDialog } from '../../../../../components/dialogs/MainUsageType/MainUsageType';
import { RawFeature } from '../../../../../enums/RawFeature';
import { MainUsageTypeFragment } from '../../../../../gql/RealGimm.Web.EstateMainUsageType.fragment';
import {
  DeleteMainUsageTypesDocument,
  ExportMainUsageTypesDocument,
  GetMainUsageTypesQueryVariables,
  useAddMainUsageTypeMutation,
  useGetMainUsageTypesQuery,
  useUpdateMainUsageTypeMutation,
} from '../../../../../gql/RealGimm.Web.MainUsageType.operation';
import { useFeature } from '../../../../../hooks/useFeature';
import { MainUsageTypeFormInput } from '../../../../../interfaces/FormInputs/MainUsageType';
import { getMainUsageTypesColumns } from '../../../../../utils/mainUsageType/getMainUsageTypesColumns';
import { getMainUsageTypesSortInput } from '../../../../../utils/mainUsageType/getMainUsageTypesSortInput';
import { parseMainUsageTypeFormInputToMainUsageTypeInput } from '../../../../../utils/mainUsageType/parseMainUsageTypeFormInput';
import { parseMainUsageTypeToMainUsageTypeFormInput } from '../../../../../utils/mainUsageType/parseMainUsageTypeFragment';

export default function MainUsageTypes() {
  const { canCreate, canDelete, canUpdate, canRead } = useFeature(RawFeature.ASST_ESTATE_BASE);
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
  } = useTable<GetMainUsageTypesQueryVariables>();
  const [queryState, reexecuteQuery] = useGetMainUsageTypesQuery({ pause, variables });
  const [, createMainUsageTypeMutation] = useAddMainUsageTypeMutation();
  const [, updateMainUsageTypeMutation] = useUpdateMainUsageTypeMutation();
  const [loading, setLoading] = useState(false);
  const [mainUsageTypesDialogProps, setMainUsageTypesDialogProps] = useState<{
    input?: MainUsageTypeFormInput;
    open: boolean;
    readonly?: boolean;
  }>({
    open: false,
  });
  const mainUsageTypes = useMemo(
    () => queryState.data?.estateMainUsageType.listEstateMainUsageTypes,
    [queryState.data],
  );

  const handleCloseMainUsageTypesDialog = useCallback(() => {
    setMainUsageTypesDialogProps({ open: false });
  }, []);

  const handleEditMainUsageType = useCallback((row: MainUsageTypeFragment) => {
    setMainUsageTypesDialogProps({
      input: parseMainUsageTypeToMainUsageTypeFormInput(row),
      open: true,
    });
  }, []);

  const handleViewMainUsageType = useCallback((row: MainUsageTypeFragment) => {
    setMainUsageTypesDialogProps({
      input: parseMainUsageTypeToMainUsageTypeFormInput(row),
      open: true,
      readonly: true,
    });
  }, []);

  const handleSaveMainUsageType = useCallback(
    async (value: MainUsageTypeFormInput) => {
      const saveMainUsageType = async () => {
        if (value.mainUsageTypeId) {
          const result = await updateMainUsageTypeMutation({
            mainUsageTypeId: value.mainUsageTypeId,
            input: parseMainUsageTypeFormInputToMainUsageTypeInput(value),
          });
          return result.data?.estateMainUsageType.update;
        } else {
          const result = await createMainUsageTypeMutation({
            input: parseMainUsageTypeFormInputToMainUsageTypeInput(value),
          });
          return result.data?.estateMainUsageType.add;
        }
      };
      setLoading(true);
      const result = await saveMainUsageType();
      setLoading(false);
      if (result?.isSuccess) {
        showSnackbar(t(`main_usage_type.feedback.${value.mainUsageTypeId ? 'update' : 'create'}`), 'success');
        handleCloseMainUsageTypesDialog();
        reexecuteQuery();
      } else {
        showError(result?.validationErrors);
      }
    },
    [
      updateMainUsageTypeMutation,
      createMainUsageTypeMutation,
      showSnackbar,
      t,
      handleCloseMainUsageTypesDialog,
      reexecuteQuery,
      showError,
    ],
  );

  const handleAddMainUsageType = useCallback(() => {
    setMainUsageTypesDialogProps({
      open: true,
    });
  }, []);

  return (
    <Card>
      {(queryState.fetching || loading) && <Loader />}
      <CardHeader title={t('main_usage_type.title')} titleTypographyProps={{ variant: 'h1' }} />
      <CardContent>
        <PrimaryTable
          columns={getMainUsageTypesColumns()}
          empty="main_usage_type.text.no_main_usage_types"
          initialState={initialState}
          rows={mainUsageTypes?.nodes ?? []}
          totalCount={mainUsageTypes?.totalCount ?? 0}
          getRowId={({ id }) => String(id)}
          onAdd={canCreate ? handleAddMainUsageType : undefined}
          onDelete={
            canDelete ? handleDelete('main_usage_type', DeleteMainUsageTypesDocument, reexecuteQuery) : undefined
          }
          onEdit={canUpdate ? handleEditMainUsageType : undefined}
          onExport={canRead ? handleExport('id', ExportMainUsageTypesDocument) : undefined}
          onFilter={handleFilter()}
          onPageChange={handlePageChange(mainUsageTypes?.pageInfo)}
          onStateChange={setInitialState}
          onSort={handleSort(getMainUsageTypesSortInput)}
          onView={canRead ? handleViewMainUsageType : undefined}
          useColumnVisibility={false}
        />
      </CardContent>
      {mainUsageTypesDialogProps.open && (
        <MainUsageTypeDialog
          input={mainUsageTypesDialogProps.input}
          readonly={mainUsageTypesDialogProps.readonly}
          onClose={handleCloseMainUsageTypesDialog}
          onSave={handleSaveMainUsageType}
        />
      )}
    </Card>
  );
}
