import { Card, CardContent, CardHeader } from '@mui/material';
import { Loader, PrimaryTable } from '@realgimm5/frontend-common/components';
import { useSnackbar, useTable } from '@realgimm5/frontend-common/contexts';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { InterventionTypeDialog } from '../../../../../components/dialogs/InterventionType/InterventionType';
import { RawFeature } from '../../../../../enums/RawFeature';
import { InterventionTypeFragment } from '../../../../../gql/RealGimm.Web.InterventionType.fragment';
import {
  DeleteInterventionTypesDocument,
  ExportInterventionTypesDocument,
  GetInterventionTypesQueryVariables,
  useAddInterventionTypeMutation,
  useGetInterventionTypesQuery,
  useUpdateInterventionTypeMutation,
} from '../../../../../gql/RealGimm.Web.InterventionType.operation';
import { useFeature } from '../../../../../hooks/useFeature';
import { InterventionTypeFormInput } from '../../../../../interfaces/FormInputs/InterventionType';
import { getInterventionTypesColumns } from '../../../../../utils/interventionType/getInterventionTypesColumns';
import { parseInterventionTypeFormInputToInterventionTypeInput } from '../../../../../utils/interventionType/parseInterventionTypeFormInput';
import { parseInterventionTypeToInterventionTypeFormInput } from '../../../../../utils/interventionType/parseInterventionTypeFragment';

export default function InterventionTypes() {
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
  } = useTable<GetInterventionTypesQueryVariables>();
  const [queryState, reexecuteQuery] = useGetInterventionTypesQuery({ pause, variables });
  const [, createInterventionTypeMutation] = useAddInterventionTypeMutation();
  const [, updateInterventionTypeMutation] = useUpdateInterventionTypeMutation();
  const [loading, setLoading] = useState(false);
  const [interventionTypeDialogProps, setInterventionTypeDialogProps] = useState<{
    input?: InterventionTypeFormInput;
    open: boolean;
    readonly?: boolean;
  }>({
    open: false,
  });
  const interventionTypes = useMemo(() => queryState.data?.interventionType.listInterventionTypes, [queryState.data]);

  const handleCloseInterventionTypeDialog = useCallback(() => {
    setInterventionTypeDialogProps({ open: false });
  }, []);

  const handleEditInterventionType = useCallback((row: InterventionTypeFragment) => {
    setInterventionTypeDialogProps({
      input: parseInterventionTypeToInterventionTypeFormInput(row),
      open: true,
    });
  }, []);

  const handleViewInterventionType = useCallback((row: InterventionTypeFragment) => {
    setInterventionTypeDialogProps({
      input: parseInterventionTypeToInterventionTypeFormInput(row),
      open: true,
      readonly: true,
    });
  }, []);

  const handleSaveInterventionType = useCallback(
    async (value: InterventionTypeFormInput) => {
      const saveInterventionType = async () => {
        if (value.interventionTypeId) {
          const result = await updateInterventionTypeMutation({
            interventionTypeId: value.interventionTypeId,
            input: parseInterventionTypeFormInputToInterventionTypeInput(value),
          });
          return result.data?.interventionType.update;
        } else {
          const result = await createInterventionTypeMutation({
            input: parseInterventionTypeFormInputToInterventionTypeInput(value),
          });
          return result.data?.interventionType.add;
        }
      };
      setLoading(true);
      const result = await saveInterventionType();
      setLoading(false);
      if (result?.isSuccess) {
        showSnackbar(t(`intervention_type.feedback.${value.interventionTypeId ? 'update' : 'create'}`), 'success');
        handleCloseInterventionTypeDialog();
        reexecuteQuery();
      } else {
        showError(result?.validationErrors);
      }
    },
    [
      updateInterventionTypeMutation,
      createInterventionTypeMutation,
      showSnackbar,
      t,
      handleCloseInterventionTypeDialog,
      reexecuteQuery,
      showError,
    ],
  );

  const handleAddInterventionType = useCallback(() => {
    setInterventionTypeDialogProps({
      open: true,
    });
  }, []);

  return (
    <Card>
      {(queryState.fetching || loading) && <Loader />}
      <CardHeader title={t('intervention_type.title')} titleTypographyProps={{ variant: 'h1' }} />
      <CardContent>
        <PrimaryTable
          columns={getInterventionTypesColumns()}
          empty="intervention_type.text.no_intervention_types"
          initialState={initialState}
          rows={interventionTypes?.nodes ?? []}
          totalCount={interventionTypes?.totalCount ?? 0}
          getRowId={({ id }) => String(id)}
          onAdd={canCreate ? handleAddInterventionType : undefined}
          onDelete={
            canDelete ? handleDelete('intervention_type', DeleteInterventionTypesDocument, reexecuteQuery) : undefined
          }
          onEdit={canUpdate ? handleEditInterventionType : undefined}
          onExport={canRead ? handleExport('id', ExportInterventionTypesDocument) : undefined}
          onFilter={handleFilter()}
          onPageChange={handlePageChange(interventionTypes?.pageInfo)}
          onStateChange={setInitialState}
          onSort={handleSort()}
          onView={canRead ? handleViewInterventionType : undefined}
          useColumnVisibility={false}
        />
      </CardContent>
      {interventionTypeDialogProps.open && (
        <InterventionTypeDialog
          input={interventionTypeDialogProps.input}
          readonly={interventionTypeDialogProps.readonly}
          onClose={handleCloseInterventionTypeDialog}
          onSave={handleSaveInterventionType}
        />
      )}
    </Card>
  );
}
