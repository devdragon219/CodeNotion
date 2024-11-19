import { Card, CardContent, CardHeader } from '@mui/material';
import { Loader, PrimaryTable } from '@realgimm5/frontend-common/components';
import { useSnackbar, useTable } from '@realgimm5/frontend-common/contexts';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { GroupCreateDialog } from '../../../../components/wizards/Group/Group';
import { RawFeature } from '../../../../enums/RawFeature';
import {
  DeleteGroupsDocument,
  ExportGroupsDocument,
  GetGroupsQueryVariables,
  useCreateGroupMutation,
  useGetGroupsQuery,
} from '../../../../gql/RealGimm.Web.Group.operation';
import { useFeature } from '../../../../hooks/useFeature';
import { GroupFormInput } from '../../../../interfaces/FormInputs/Group';
import { getGroupsColumns } from '../../../../utils/group/getGroupsColumns';
import { parseGroupFormInputToGroupInput } from '../../../../utils/group/parseGroupFormInput';

export default function Groups() {
  const { canCreate, canDelete, canUpdate, canRead } = useFeature(RawFeature.ADMIN_USERS_AND_GROUPS);
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
  } = useTable<GetGroupsQueryVariables>();
  const [queryState, reexecuteQuery] = useGetGroupsQuery({ pause, variables });
  const [, createGroupMutation] = useCreateGroupMutation();
  const [loading, setLoading] = useState(false);
  const [isCreateGroupDialogOpen, setCreateGroupDialogOpen] = useState(false);
  const groups = useMemo(() => queryState.data?.admin.listGroup, [queryState.data]);

  const handleOpenCreateGroupDialog = useCallback(() => {
    setCreateGroupDialogOpen(true);
  }, []);
  const handleCloseCreateGroupDialog = useCallback(() => {
    setCreateGroupDialogOpen(false);
  }, []);
  const handleSaveCreateGroup = useCallback(
    async (groupInput: GroupFormInput) => {
      setLoading(true);

      const result = await createGroupMutation({
        groupInput: parseGroupFormInputToGroupInput(groupInput),
      });
      setLoading(false);
      if (result.data?.admin.addGroup.isSuccess) {
        showSnackbar(t('group.feedback.create'), 'success');
        handleCloseCreateGroupDialog();
        reexecuteQuery();
      } else {
        showError(result.data?.admin.addGroup.validationErrors);
      }
    },
    [t, createGroupMutation, handleCloseCreateGroupDialog, reexecuteQuery, showSnackbar, showError],
  );

  return (
    <Card>
      {(queryState.fetching || loading) && <Loader />}
      <CardHeader title={t('group.title')} titleTypographyProps={{ variant: 'h1' }} />
      <CardContent>
        <PrimaryTable
          columns={getGroupsColumns()}
          empty="group.text.no_groups"
          initialState={initialState}
          rows={groups?.nodes ?? []}
          totalCount={groups?.totalCount ?? 0}
          getRowId={({ id }) => String(id)}
          onAdd={canCreate ? handleOpenCreateGroupDialog : undefined}
          onDelete={canDelete ? handleDelete('group', DeleteGroupsDocument, reexecuteQuery) : undefined}
          onEdit={
            canUpdate
              ? (row) => {
                  navigate(`/app/system/groups/${row.id}`, { state: { readonly: false } });
                }
              : undefined
          }
          onExport={canRead ? handleExport('id', ExportGroupsDocument) : undefined}
          onFilter={handleFilter()}
          onPageChange={handlePageChange(groups?.pageInfo)}
          onStateChange={setInitialState}
          onSort={handleSort()}
          onView={
            canRead
              ? (row) => {
                  navigate(`/app/system/groups/${row.id}`);
                }
              : undefined
          }
          useColumnVisibility={false}
        />
      </CardContent>
      {isCreateGroupDialogOpen && (
        <GroupCreateDialog onClose={handleCloseCreateGroupDialog} onSave={handleSaveCreateGroup} />
      )}
    </Card>
  );
}
