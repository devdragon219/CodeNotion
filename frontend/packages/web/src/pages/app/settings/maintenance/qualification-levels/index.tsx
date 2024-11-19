import { Card, CardContent, CardHeader } from '@mui/material';
import { Loader, PrimaryTable } from '@realgimm5/frontend-common/components';
import { useSnackbar, useTable } from '@realgimm5/frontend-common/contexts';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { QualificationLevelDialog } from '../../../../../components/dialogs/QualificationLevel/QualificationLevel';
import { RawFeature } from '../../../../../enums/RawFeature';
import { QualificationLevelFragment } from '../../../../../gql/RealGimm.Web.QualificationLevel.fragment';
import {
  DeleteQualificationLevelsDocument,
  ExportQualificationLevelsDocument,
  GetQualificationLevelsQueryVariables,
  useAddQualificationLevelMutation,
  useGetQualificationLevelsQuery,
  useUpdateQualificationLevelMutation,
} from '../../../../../gql/RealGimm.Web.QualificationLevel.operation';
import { useFeature } from '../../../../../hooks/useFeature';
import { QualificationLevelFormInput } from '../../../../../interfaces/FormInputs/QualificationLevel';
import { getQualificationLevelsColumns } from '../../../../../utils/qualificationLevel/getQualificationLevelsColumns';
import { getQualificationLevelsSortInput } from '../../../../../utils/qualificationLevel/getQualificationLevelsSortInput';
import { parseQualificationLevelFormInputToQualificationLevelInput } from '../../../../../utils/qualificationLevel/parseQualificationLevelFormInput';
import { parseQualificationLevelToQualificationLevelFormInput } from '../../../../../utils/qualificationLevel/parseQualificationLevelFragment';

export default function QualificationLevels() {
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
  } = useTable<GetQualificationLevelsQueryVariables>();
  const [queryState, reexecuteQuery] = useGetQualificationLevelsQuery({ pause, variables });
  const [, createQualificationLevelMutation] = useAddQualificationLevelMutation();
  const [, updateQualificationLevelMutation] = useUpdateQualificationLevelMutation();
  const [loading, setLoading] = useState(false);
  const [craftDialogProps, setQualificationLevelDialogProps] = useState<{
    input?: QualificationLevelFormInput;
    open: boolean;
    readonly?: boolean;
  }>({
    open: false,
  });
  const qualificationLevels = useMemo(
    () => queryState.data?.qualificationLevel.listQualificationLevels,
    [queryState.data],
  );

  const handleCloseQualificationLevelDialog = useCallback(() => {
    setQualificationLevelDialogProps({ open: false });
  }, []);

  const handleEditQualificationLevel = useCallback((row: QualificationLevelFragment) => {
    setQualificationLevelDialogProps({
      input: parseQualificationLevelToQualificationLevelFormInput(row),
      open: true,
    });
  }, []);

  const handleViewQualificationLevel = useCallback((row: QualificationLevelFragment) => {
    setQualificationLevelDialogProps({
      input: parseQualificationLevelToQualificationLevelFormInput(row),
      open: true,
      readonly: true,
    });
  }, []);

  const handleSaveQualificationLevel = useCallback(
    async (value: QualificationLevelFormInput) => {
      const saveQualificationLevel = async () => {
        if (value.qualificationLevelId) {
          const result = await updateQualificationLevelMutation({
            qualificationLevelId: value.qualificationLevelId,
            input: parseQualificationLevelFormInputToQualificationLevelInput(value),
          });
          return result.data?.qualificationLevel.update;
        } else {
          const result = await createQualificationLevelMutation({
            input: parseQualificationLevelFormInputToQualificationLevelInput(value),
          });
          return result.data?.qualificationLevel.add;
        }
      };
      setLoading(true);
      const result = await saveQualificationLevel();
      setLoading(false);
      if (result?.isSuccess) {
        showSnackbar(t(`qualification_level.feedback.${value.qualificationLevelId ? 'update' : 'create'}`), 'success');
        handleCloseQualificationLevelDialog();
        reexecuteQuery();
      } else {
        showError(result?.validationErrors);
      }
    },
    [
      updateQualificationLevelMutation,
      createQualificationLevelMutation,
      showSnackbar,
      t,
      handleCloseQualificationLevelDialog,
      reexecuteQuery,
      showError,
    ],
  );

  const handleAddQualificationLevel = useCallback(() => {
    setQualificationLevelDialogProps({
      open: true,
    });
  }, []);

  return (
    <Card>
      {(queryState.fetching || loading) && <Loader />}
      <CardHeader title={t('qualification_level.title')} titleTypographyProps={{ variant: 'h1' }} />
      <CardContent>
        <PrimaryTable
          columns={getQualificationLevelsColumns()}
          empty="qualification_level.text.no_qualification_levels"
          initialState={initialState}
          rows={qualificationLevels?.nodes ?? []}
          totalCount={qualificationLevels?.totalCount ?? 0}
          getRowId={({ id }) => String(id)}
          onAdd={canCreate ? handleAddQualificationLevel : undefined}
          onDelete={
            canDelete
              ? handleDelete('qualification_level', DeleteQualificationLevelsDocument, reexecuteQuery)
              : undefined
          }
          onEdit={canUpdate ? handleEditQualificationLevel : undefined}
          onExport={canRead ? handleExport('id', ExportQualificationLevelsDocument) : undefined}
          onFilter={handleFilter()}
          onPageChange={handlePageChange(qualificationLevels?.pageInfo)}
          onStateChange={setInitialState}
          onSort={handleSort(getQualificationLevelsSortInput)}
          onView={canRead ? handleViewQualificationLevel : undefined}
          useColumnVisibility={false}
        />
      </CardContent>
      {craftDialogProps.open && (
        <QualificationLevelDialog
          input={craftDialogProps.input}
          readonly={craftDialogProps.readonly}
          onClose={handleCloseQualificationLevelDialog}
          onSave={handleSaveQualificationLevel}
        />
      )}
    </Card>
  );
}
