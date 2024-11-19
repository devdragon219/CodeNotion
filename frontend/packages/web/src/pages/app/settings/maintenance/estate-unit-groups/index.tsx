import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import { Loader, PrimaryTable } from '@realgimm5/frontend-common/components';
import { useSnackbar, useTable } from '@realgimm5/frontend-common/contexts';
import { MouseEvent, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { EstateUnitGroupViewEstateUnitsDialog } from '../../../../../components/dialogs/EstateUnitGroup/ViewEstateUnits/ViewEstateUnits';
import { EstateUnitGroupCreateDialog } from '../../../../../components/wizards/EstateUnitGroup/EstateUnitGroup';
import { RawFeature } from '../../../../../enums/RawFeature';
import { EstateUnitGroupFragment } from '../../../../../gql/RealGimm.Web.EstateUnitGroup.fragment';
import {
  DeleteEstateUnitGroupsDocument,
  ExportEstateUnitGroupsDocument,
  GetEstateUnitGroupsQueryVariables,
  useAddEstateUnitGroupMutation,
  useGetEstateUnitGroupsQuery,
} from '../../../../../gql/RealGimm.Web.EstateUnitGroup.operation';
import { useFeature } from '../../../../../hooks/useFeature';
import { EstateUnitGroupFormInput } from '../../../../../interfaces/FormInputs/EstateUnitGroup';
import { getEstateUnitGroupsColumns } from '../../../../../utils/estateUnitGroup/getEstateUnitGroupsColumns';
import { parseEstateUnitGroupFormInputToEstateUnitGroupInput } from '../../../../../utils/estateUnitGroup/parseEstateUnitGroupFormInput';

export default function EstateUnitGroups() {
  const { canCreate, canDelete, canUpdate, canRead } = useFeature(RawFeature.FCLT_ESTATE_UNIT_GROUP_BASE);
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
  } = useTable<GetEstateUnitGroupsQueryVariables>();
  const [queryState, reexecuteQuery] = useGetEstateUnitGroupsQuery({ pause, variables });
  const [, createEstateUnitGroupMutation] = useAddEstateUnitGroupMutation();
  const [loading, setLoading] = useState(false);
  const [estateUnitGroupEstateUnitsDialogProps, setEstateUnitGroupEstateUnitsDialogProps] =
    useState<EstateUnitGroupFragment | null>(null);
  const [isCreateEstateUnitGroupDialogOpen, setCreateEstateUnitGroupDialogOpen] = useState(false);
  const estateUnitGroups = useMemo(() => queryState.data?.estateUnitGroup.listEstateUnitGroups, [queryState.data]);

  const handleOpenCreateEstateUnitGroupDialog = useCallback(() => {
    setCreateEstateUnitGroupDialogOpen(true);
  }, []);

  const handleCloseCreateEstateUnitGroupDialog = useCallback(() => {
    setCreateEstateUnitGroupDialogOpen(false);
  }, []);
  const handleSaveCreateEstateUnitGroup = useCallback(
    async (estateUnitGroup: EstateUnitGroupFormInput) => {
      setLoading(true);
      const result = await createEstateUnitGroupMutation({
        input: parseEstateUnitGroupFormInputToEstateUnitGroupInput(estateUnitGroup),
      });
      setLoading(false);
      if (result.data?.estateUnitGroup.add.isSuccess) {
        showSnackbar(t('estate_unit_group.feedback.create'), 'success');
        handleCloseCreateEstateUnitGroupDialog();
        reexecuteQuery();
      } else {
        showError(result.data?.estateUnitGroup.add.validationErrors);
      }
    },
    [createEstateUnitGroupMutation, showSnackbar, t, handleCloseCreateEstateUnitGroupDialog, reexecuteQuery, showError],
  );

  const showAllButton = useCallback(
    (row: EstateUnitGroupFragment) => {
      const onClick = (e: MouseEvent<HTMLSpanElement>) => {
        e.stopPropagation();
        setEstateUnitGroupEstateUnitsDialogProps(row);
      };

      return (
        <Typography variant="link" onClick={onClick}>
          {t('core.button.show_all')}
        </Typography>
      );
    },
    [t],
  );
  const handleCloseEstateUnitGroupEstateUnitsDialog = useCallback(() => {
    setEstateUnitGroupEstateUnitsDialogProps(null);
  }, []);

  return (
    <Card>
      {(queryState.fetching || loading) && <Loader />}
      <CardHeader title={t('estate_unit_group.title')} titleTypographyProps={{ variant: 'h1' }} />
      <CardContent>
        <PrimaryTable
          columns={getEstateUnitGroupsColumns(showAllButton)}
          empty="estate_unit_group.text.no_estate_unit_groups"
          initialState={initialState}
          rows={estateUnitGroups?.nodes ?? []}
          totalCount={estateUnitGroups?.totalCount ?? 0}
          getRowId={({ id }) => String(id)}
          onAdd={canCreate ? handleOpenCreateEstateUnitGroupDialog : undefined}
          onDelete={
            canDelete ? handleDelete('estate_unit_group', DeleteEstateUnitGroupsDocument, reexecuteQuery) : undefined
          }
          onEdit={
            canUpdate
              ? (row) => {
                  navigate(`/app/settings/maintenance/estate-unit-groups/${row.id}`, { state: { readonly: false } });
                }
              : undefined
          }
          onExport={canRead ? handleExport('id', ExportEstateUnitGroupsDocument) : undefined}
          onFilter={handleFilter()}
          onPageChange={handlePageChange(estateUnitGroups?.pageInfo)}
          onStateChange={setInitialState}
          onSort={handleSort()}
          onView={
            canRead
              ? (row) => {
                  navigate(`/app/settings/maintenance/estate-unit-groups/${row.id}`);
                }
              : undefined
          }
          useColumnVisibility={false}
        />
      </CardContent>
      {estateUnitGroupEstateUnitsDialogProps && (
        <EstateUnitGroupViewEstateUnitsDialog
          estateUnitGroup={estateUnitGroupEstateUnitsDialogProps}
          onClose={handleCloseEstateUnitGroupEstateUnitsDialog}
        />
      )}
      {isCreateEstateUnitGroupDialogOpen && (
        <EstateUnitGroupCreateDialog
          onClose={handleCloseCreateEstateUnitGroupDialog}
          onSave={handleSaveCreateEstateUnitGroup}
        />
      )}
    </Card>
  );
}
