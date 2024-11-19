import { Card, CardContent, CardHeader } from '@mui/material';
import { Loader, PrimaryTable } from '@realgimm5/frontend-common/components';
import { useSnackbar, useTable } from '@realgimm5/frontend-common/contexts';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { UsageTypeDialog } from '../../../../../components/dialogs/UsageType/UsageType';
import { RawFeature } from '../../../../../enums/RawFeature';
import { UsageTypeFragment } from '../../../../../gql/RealGimm.Web.EstateUsageType.fragment';
import {
  DeleteUsageTypesDocument,
  ExportUsageTypesDocument,
  GetUsageTypesQueryVariables,
  useAddUsageTypeMutation,
  useGetUsageTypesQuery,
  useUpdateUsageTypeMutation,
} from '../../../../../gql/RealGimm.Web.UsageType.operation';
import { useFeature } from '../../../../../hooks/useFeature';
import { UsageTypeFormInput } from '../../../../../interfaces/FormInputs/UsageType';
import { getUsageTypesColumns } from '../../../../../utils/usageType/getUsageTypesColumns';
import { getUsageTypesFilterInput } from '../../../../../utils/usageType/getUsageTypesFilterInput';
import { getUsageTypesSortInput } from '../../../../../utils/usageType/getUsageTypesSortInput';
import { parseUsageTypeFormInputToUsageTypeInput } from '../../../../../utils/usageType/parseUsageTypeFormInput';
import { parseUsageTypeToUsageTypeFormInput } from '../../../../../utils/usageType/parseUsageTypeFragment';

export default function UsageTypes() {
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
  } = useTable<GetUsageTypesQueryVariables>();
  const [queryState, reexecuteQuery] = useGetUsageTypesQuery({ pause, variables });
  const [, createUsageTypeMutation] = useAddUsageTypeMutation();
  const [, updateUsageTypeMutation] = useUpdateUsageTypeMutation();
  const [loading, setLoading] = useState(false);
  const [usageTypesDialogProps, setUsageTypesDialogProps] = useState<{
    input?: UsageTypeFormInput;
    open: boolean;
    readonly?: boolean;
  }>({
    open: false,
  });
  const usageTypes = useMemo(() => queryState.data?.estateUsageType.listEstateUsageTypes, [queryState.data]);

  const handleCloseUsageTypesDialog = useCallback(() => {
    setUsageTypesDialogProps({ open: false });
  }, []);

  const handleEditUsageType = useCallback((row: UsageTypeFragment) => {
    setUsageTypesDialogProps({
      input: parseUsageTypeToUsageTypeFormInput(row),
      open: true,
    });
  }, []);

  const handleViewUsageType = useCallback((row: UsageTypeFragment) => {
    setUsageTypesDialogProps({
      input: parseUsageTypeToUsageTypeFormInput(row),
      open: true,
      readonly: true,
    });
  }, []);

  const handleSaveUsageType = useCallback(
    async (value: UsageTypeFormInput) => {
      const saveUsageType = async () => {
        if (value.usageTypeId) {
          const result = await updateUsageTypeMutation({
            usageTypeId: value.usageTypeId,
            input: parseUsageTypeFormInputToUsageTypeInput(value),
          });
          return result.data?.estateUsageType.update;
        } else {
          const result = await createUsageTypeMutation({
            input: parseUsageTypeFormInputToUsageTypeInput(value),
          });
          return result.data?.estateUsageType.add;
        }
      };
      setLoading(true);
      const result = await saveUsageType();
      setLoading(false);
      if (result?.isSuccess) {
        showSnackbar(t(`usage_type.feedback.${value.usageTypeId ? 'update' : 'create'}`), 'success');
        handleCloseUsageTypesDialog();
        reexecuteQuery();
      } else {
        showError(result?.validationErrors);
      }
    },
    [
      updateUsageTypeMutation,
      createUsageTypeMutation,
      showSnackbar,
      t,
      handleCloseUsageTypesDialog,
      reexecuteQuery,
      showError,
    ],
  );

  const handleAddUsageType = useCallback(() => {
    setUsageTypesDialogProps({
      open: true,
    });
  }, []);

  return (
    <Card>
      {(queryState.fetching || loading) && <Loader />}
      <CardHeader title={t('usage_type.title')} titleTypographyProps={{ variant: 'h1' }} />
      <CardContent>
        <PrimaryTable
          columns={getUsageTypesColumns(t)}
          empty="usage_type.text.no_usage_types"
          initialState={initialState}
          rows={usageTypes?.nodes ?? []}
          totalCount={usageTypes?.totalCount ?? 0}
          getRowId={({ id }) => String(id)}
          onAdd={canCreate ? handleAddUsageType : undefined}
          onDelete={canDelete ? handleDelete('usage_type', DeleteUsageTypesDocument, reexecuteQuery) : undefined}
          onEdit={canUpdate ? handleEditUsageType : undefined}
          onExport={canRead ? handleExport('id', ExportUsageTypesDocument) : undefined}
          onFilter={handleFilter(getUsageTypesFilterInput)}
          onPageChange={handlePageChange(usageTypes?.pageInfo)}
          onStateChange={setInitialState}
          onSort={handleSort(getUsageTypesSortInput)}
          onView={canRead ? handleViewUsageType : undefined}
          useColumnVisibility={false}
        />
      </CardContent>
      {usageTypesDialogProps.open && (
        <UsageTypeDialog
          input={usageTypesDialogProps.input}
          readonly={usageTypesDialogProps.readonly}
          onClose={handleCloseUsageTypesDialog}
          onSave={handleSaveUsageType}
        />
      )}
    </Card>
  );
}
