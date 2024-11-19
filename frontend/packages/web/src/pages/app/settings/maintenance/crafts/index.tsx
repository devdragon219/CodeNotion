import { Card, CardContent, CardHeader } from '@mui/material';
import { Loader, PrimaryTable } from '@realgimm5/frontend-common/components';
import { useSnackbar, useTable } from '@realgimm5/frontend-common/contexts';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { CraftDialog } from '../../../../../components/dialogs/Craft/Craft';
import { RawFeature } from '../../../../../enums/RawFeature';
import { CraftFragment } from '../../../../../gql/RealGimm.Web.Craft.fragment';
import {
  DeleteCraftsDocument,
  ExportCraftsDocument,
  GetCraftsQueryVariables,
  useAddCraftMutation,
  useGetCraftsQuery,
  useUpdateCraftMutation,
} from '../../../../../gql/RealGimm.Web.Craft.operation';
import { useFeature } from '../../../../../hooks/useFeature';
import { CraftFormInput } from '../../../../../interfaces/FormInputs/Craft';
import { getCraftsColumns } from '../../../../../utils/craft/getCraftsColumns';
import { getCraftsSortInput } from '../../../../../utils/craft/getCraftsSortInput';
import { parseCraftFormInputToCraftInput } from '../../../../../utils/craft/parseCraftFormInput';
import { parseCraftToCraftFormInput } from '../../../../../utils/craft/parseCraftFragment';

export default function Crafts() {
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
  } = useTable<GetCraftsQueryVariables>();
  const [queryState, reexecuteQuery] = useGetCraftsQuery({ pause, variables });
  const [, createCraftMutation] = useAddCraftMutation();
  const [, updateCraftMutation] = useUpdateCraftMutation();
  const [loading, setLoading] = useState(false);
  const [craftDialogProps, setCraftDialogProps] = useState<{
    input?: CraftFormInput;
    open: boolean;
    readonly?: boolean;
  }>({
    open: false,
  });
  const crafts = useMemo(() => queryState.data?.craft.listCrafts, [queryState.data]);

  const handleCloseCraftDialog = useCallback(() => {
    setCraftDialogProps({ open: false });
  }, []);

  const handleEditCraft = useCallback((row: CraftFragment) => {
    setCraftDialogProps({
      input: parseCraftToCraftFormInput(row),
      open: true,
    });
  }, []);

  const handleViewCraft = useCallback((row: CraftFragment) => {
    setCraftDialogProps({
      input: parseCraftToCraftFormInput(row),
      open: true,
      readonly: true,
    });
  }, []);

  const handleSaveCraft = useCallback(
    async (value: CraftFormInput) => {
      const saveCraft = async () => {
        if (value.craftId) {
          const result = await updateCraftMutation({
            craftId: value.craftId,
            input: parseCraftFormInputToCraftInput(value),
          });
          return result.data?.craft.update;
        } else {
          const result = await createCraftMutation({
            input: parseCraftFormInputToCraftInput(value),
          });
          return result.data?.craft.add;
        }
      };
      setLoading(true);
      const result = await saveCraft();
      setLoading(false);
      if (result?.isSuccess) {
        showSnackbar(t(`craft.feedback.${value.craftId ? 'update' : 'create'}`), 'success');
        handleCloseCraftDialog();
        reexecuteQuery();
      } else {
        showError(result?.validationErrors);
      }
    },
    [updateCraftMutation, createCraftMutation, showSnackbar, t, handleCloseCraftDialog, reexecuteQuery, showError],
  );

  const handleAddCraft = useCallback(() => {
    setCraftDialogProps({
      open: true,
    });
  }, []);

  return (
    <Card>
      {(queryState.fetching || loading) && <Loader />}
      <CardHeader title={t('craft.title')} titleTypographyProps={{ variant: 'h1' }} />
      <CardContent>
        <PrimaryTable
          columns={getCraftsColumns()}
          empty="craft.text.no_crafts"
          initialState={initialState}
          rows={crafts?.nodes ?? []}
          totalCount={crafts?.totalCount ?? 0}
          getRowId={({ id }) => String(id)}
          onAdd={canCreate ? handleAddCraft : undefined}
          onDelete={canDelete ? handleDelete('craft', DeleteCraftsDocument, reexecuteQuery) : undefined}
          onEdit={canUpdate ? handleEditCraft : undefined}
          onExport={canRead ? handleExport('id', ExportCraftsDocument) : undefined}
          onFilter={handleFilter()}
          onPageChange={handlePageChange(crafts?.pageInfo)}
          onStateChange={setInitialState}
          onSort={handleSort(getCraftsSortInput)}
          onView={canRead ? handleViewCraft : undefined}
          useColumnVisibility={false}
        />
      </CardContent>
      {craftDialogProps.open && (
        <CraftDialog
          input={craftDialogProps.input}
          readonly={craftDialogProps.readonly}
          onClose={handleCloseCraftDialog}
          onSave={handleSaveCraft}
        />
      )}
    </Card>
  );
}
