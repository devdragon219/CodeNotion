import { Card, CardContent, CardHeader } from '@mui/material';
import { Loader, PrimaryTable } from '@realgimm5/frontend-common/components';
import { useSnackbar, useTable } from '@realgimm5/frontend-common/contexts';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { FloorTemplateDialog } from '../../../../../components/dialogs/FloorTemplate/FloorTemplate';
import { FloorTemplateDialogInput } from '../../../../../components/dialogs/FloorTemplate/FloorTemplate.types';
import { RawFeature } from '../../../../../enums/RawFeature';
import { FloorTemplateFragment } from '../../../../../gql/RealGimm.Web.FloorTemplate.fragment';
import {
  DeleteFloorTemplatesDocument,
  GetFloorTemplatesQueryVariables,
  useAddFloorTemplatesMutation,
  useGetFloorTemplatesQuery,
  useUpdateFloorTemplateMutation,
} from '../../../../../gql/RealGimm.Web.FloorTemplate.operation';
import { useFeature } from '../../../../../hooks/useFeature';
import { FloorTemplateFormInput } from '../../../../../interfaces/FormInputs/Floor';
import { getFloorTemplatesColumns } from '../../../../../utils/floorTemplate/getFloorTemplatesColumns';
import { parseFloorTemplateFormInputToFloorTemplateInput } from '../../../../../utils/floorTemplate/parseFloorTemplateFormInput';
import { parseFloorTemplateToFloorTemplateFormInput } from '../../../../../utils/floorTemplate/parseFloorTemplateFragment';

export default function Floors() {
  const { canCreate, canDelete, canUpdate, canRead } = useFeature(RawFeature.ASST_CATALOGUE_CONFIG);
  const { t } = useTranslation();
  const { showError, showSnackbar } = useSnackbar();
  const { initialState, pause, variables, handleDelete, handleFilter, handlePageChange, handleSort, setInitialState } =
    useTable<GetFloorTemplatesQueryVariables>();
  const [queryState, reexecuteQuery] = useGetFloorTemplatesQuery({ pause, variables });
  const [, createFloorTemplatesMutation] = useAddFloorTemplatesMutation();
  const [, updateFloorTemplateMutation] = useUpdateFloorTemplateMutation();
  const [loading, setLoading] = useState(false);
  const [floorTemplatesDialogProps, setFloorTemplatesDialogProps] = useState<{
    input?: FloorTemplateDialogInput;
    open: boolean;
    readonly?: boolean;
  }>({
    open: false,
  });
  const floorTemplates = useMemo(() => queryState.data?.floorTemplate.listFloorTemplatesPaginated, [queryState.data]);

  const handleCloseFloorTemplatesDialog = useCallback(() => {
    setFloorTemplatesDialogProps({ open: false });
  }, []);

  const handleEditFloorTemplate = useCallback((row: FloorTemplateFragment) => {
    setFloorTemplatesDialogProps({
      input: {
        floorTemplate: parseFloorTemplateToFloorTemplateFormInput(row),
        index: 0,
      },
      open: true,
    });
  }, []);

  const handleViewFloorTemplate = useCallback((row: FloorTemplateFragment) => {
    setFloorTemplatesDialogProps({
      input: {
        floorTemplate: parseFloorTemplateToFloorTemplateFormInput(row),
        index: 0,
      },
      open: true,
      readonly: true,
    });
  }, []);

  const handleSaveFloorTemplate = useCallback(
    async (value: FloorTemplateFormInput[] | FloorTemplateDialogInput) => {
      const saveFloorTemplate = async () => {
        if (Array.isArray(value)) {
          const result = await createFloorTemplatesMutation({
            input: value.map(parseFloorTemplateFormInputToFloorTemplateInput),
          });
          return result.data?.floorTemplate.addFloorTemplates;
        } else {
          const result = await updateFloorTemplateMutation({
            floorTemplateId: value.floorTemplate.floorTemplateId!,
            input: parseFloorTemplateFormInputToFloorTemplateInput(value.floorTemplate),
          });
          return result.data?.floorTemplate.updateFloor;
        }
      };
      setLoading(true);
      const result = await saveFloorTemplate();
      setLoading(false);
      if (result?.isSuccess) {
        showSnackbar(
          t(
            `floor.feedback.${
              Array.isArray(value) ? (value.length > 1 ? 'create.multiple' : 'create.single') : 'update'
            }`,
          ),
          'success',
        );
        handleCloseFloorTemplatesDialog();
        reexecuteQuery();
      } else {
        showError(result?.validationErrors);
      }
    },
    [
      t,
      createFloorTemplatesMutation,
      updateFloorTemplateMutation,
      showError,
      showSnackbar,
      reexecuteQuery,
      handleCloseFloorTemplatesDialog,
    ],
  );

  const handleAddFloorTemplate = useCallback(() => {
    setFloorTemplatesDialogProps({ open: true });
  }, []);

  return (
    <Card>
      {(queryState.fetching || loading) && <Loader />}
      <CardHeader title={t('floor.title')} titleTypographyProps={{ variant: 'h1' }} />
      <CardContent>
        <PrimaryTable
          columns={getFloorTemplatesColumns()}
          empty="floor.text.no_floors"
          initialState={initialState}
          rows={floorTemplates?.nodes ?? []}
          totalCount={floorTemplates?.totalCount ?? 0}
          getRowId={({ id }) => String(id)}
          onAdd={canCreate ? handleAddFloorTemplate : undefined}
          onDelete={canDelete ? handleDelete('floor', DeleteFloorTemplatesDocument, reexecuteQuery) : undefined}
          onEdit={canUpdate ? handleEditFloorTemplate : undefined}
          onFilter={handleFilter()}
          onPageChange={handlePageChange(floorTemplates?.pageInfo)}
          onSort={handleSort()}
          onStateChange={setInitialState}
          onView={canRead ? handleViewFloorTemplate : undefined}
          useColumnVisibility={false}
        />
      </CardContent>
      {floorTemplatesDialogProps.open && (
        <FloorTemplateDialog
          input={floorTemplatesDialogProps.input}
          readonly={floorTemplatesDialogProps.readonly}
          onClose={handleCloseFloorTemplatesDialog}
          onSave={handleSaveFloorTemplate}
        />
      )}
    </Card>
  );
}
