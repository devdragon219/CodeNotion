import { Card, CardContent, CardHeader } from '@mui/material';
import { Loader, PrimaryTable } from '@realgimm5/frontend-common/components';
import { useSnackbar, useTable } from '@realgimm5/frontend-common/contexts';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { FunctionAreaDialog } from '../../../../../components/dialogs/FunctionArea/FunctionArea';
import { FunctionAreaDialogInput } from '../../../../../components/dialogs/FunctionArea/FunctionArea.types';
import { RawFeature } from '../../../../../enums/RawFeature';
import { FunctionAreaFragment } from '../../../../../gql/RealGimm.Web.FunctionArea.fragment';
import {
  DeleteFunctionAreasDocument,
  ExportFunctionAreasDocument,
  GetFunctionAreasQueryVariables,
  useCreateFunctionAreasMutation,
  useGetFunctionAreasQuery,
  useUpdateFunctionAreaMutation,
} from '../../../../../gql/RealGimm.Web.FunctionArea.operation';
import { useFeature } from '../../../../../hooks/useFeature';
import { FunctionAreaFormInput } from '../../../../../interfaces/FormInputs/FunctionArea';
import { getFunctionAreasColumns } from '../../../../../utils/functionArea/getFunctionAreasColumns';
import { parseFunctionAreaFormInputToFunctionAreaInput } from '../../../../../utils/functionArea/parseFunctionAreaFormInput';
import { parseFunctionAreaToFunctionAreaFormInput } from '../../../../../utils/functionArea/parseFunctionAreaFragment';

export default function FunctionAreas() {
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
  } = useTable<GetFunctionAreasQueryVariables>();
  const [queryState, reexecuteQuery] = useGetFunctionAreasQuery({ pause, variables });
  const [, createFunctionAreasMutation] = useCreateFunctionAreasMutation();
  const [, updateFunctionAreaMutation] = useUpdateFunctionAreaMutation();
  const [loading, setLoading] = useState(false);
  const [functionAreaDialogProps, setFunctionAreaDialogProps] = useState<{
    input?: FunctionAreaDialogInput;
    open: boolean;
    readonly?: boolean;
  }>({
    open: false,
  });
  const functionAreas = useMemo(() => queryState.data?.functionArea.listFunctionAreas, [queryState.data]);

  const handleCloseFunctionAreaDialog = useCallback(() => {
    setFunctionAreaDialogProps({ open: false });
  }, []);
  const handleEditFunctionArea = useCallback((row: FunctionAreaFragment) => {
    setFunctionAreaDialogProps({
      input: { functionArea: parseFunctionAreaToFunctionAreaFormInput(row), index: 0 },
      open: true,
    });
  }, []);

  const handleViewFunctionArea = useCallback((row: FunctionAreaFragment) => {
    setFunctionAreaDialogProps({
      input: { functionArea: parseFunctionAreaToFunctionAreaFormInput(row), index: 0 },
      open: true,
      readonly: true,
    });
  }, []);

  const handleSaveFunctionArea = useCallback(
    async (value: FunctionAreaFormInput[] | FunctionAreaDialogInput) => {
      const saveFunctionArea = async () => {
        if (Array.isArray(value)) {
          const result = await createFunctionAreasMutation({
            functionAreaInputs: value.map(parseFunctionAreaFormInputToFunctionAreaInput),
          });
          return result.data?.functionArea.addRange;
        } else {
          const result = await updateFunctionAreaMutation({
            functionAreaId: value.functionArea.functionAreaId!,
            functionAreaInput: parseFunctionAreaFormInputToFunctionAreaInput(value.functionArea),
          });
          return result.data?.functionArea.update;
        }
      };
      setLoading(true);
      const result = await saveFunctionArea();
      setLoading(false);
      if (result?.isSuccess) {
        showSnackbar(
          t(
            `function_area.feedback.${
              Array.isArray(value) ? (value.length > 1 ? 'create.multiple' : 'create.single') : 'update'
            }`,
          ),
          'success',
        );
        handleCloseFunctionAreaDialog();
        reexecuteQuery();
      } else {
        showError(result?.validationErrors);
      }
    },
    [
      t,
      createFunctionAreasMutation,
      updateFunctionAreaMutation,
      showError,
      showSnackbar,
      reexecuteQuery,
      handleCloseFunctionAreaDialog,
    ],
  );

  const handleAddFunctionArea = useCallback(() => {
    setFunctionAreaDialogProps({ open: true });
  }, []);

  return (
    <Card>
      {(queryState.fetching || loading) && <Loader />}
      <CardHeader title={t('function_area.title')} titleTypographyProps={{ variant: 'h1' }} />
      <CardContent>
        <PrimaryTable
          columns={getFunctionAreasColumns(t)}
          empty="function_area.text.no_function_areas"
          initialState={initialState}
          rows={functionAreas?.nodes ?? []}
          totalCount={functionAreas?.totalCount ?? 0}
          getRowId={({ id }) => String(id)}
          onAdd={canCreate ? handleAddFunctionArea : undefined}
          onDelete={canDelete ? handleDelete('function_area', DeleteFunctionAreasDocument, reexecuteQuery) : undefined}
          onEdit={canUpdate ? handleEditFunctionArea : undefined}
          onExport={canRead ? handleExport('id', ExportFunctionAreasDocument) : undefined}
          onFilter={handleFilter()}
          onPageChange={handlePageChange(functionAreas?.pageInfo)}
          onSort={handleSort()}
          onStateChange={setInitialState}
          onView={canRead ? handleViewFunctionArea : undefined}
          useColumnVisibility={false}
        />
      </CardContent>
      {functionAreaDialogProps.open && (
        <FunctionAreaDialog
          input={functionAreaDialogProps.input}
          readonly={functionAreaDialogProps.readonly}
          onClose={handleCloseFunctionAreaDialog}
          onSave={handleSaveFunctionArea}
        />
      )}
    </Card>
  );
}
