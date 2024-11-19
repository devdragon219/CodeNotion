import { Card, CardContent, CardHeader } from '@mui/material';
import { Loader, PrimaryTable } from '@realgimm5/frontend-common/components';
import { useSnackbar, useTable } from '@realgimm5/frontend-common/contexts';
import { UserType } from '@realgimm5/frontend-common/gql/types';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { UserCreateDialog } from '../../../../components/wizards/User/User';
import { RawFeature } from '../../../../enums/RawFeature';
import {
  DeleteUsersDocument,
  ExportUsersDocument,
  GetUsersQueryVariables,
  useCreateUserMutation,
  useGetUsersQuery,
} from '../../../../gql/RealGimm.Web.Admin.operation';
import { useFeature } from '../../../../hooks/useFeature';
import { UserFormInput } from '../../../../interfaces/FormInputs/User';
import { getUsersColumns } from '../../../../utils/user/getUsersColumns';
import { getUsersFilterInput } from '../../../../utils/user/getUsersFilterInput';
import { getUsersSortInput } from '../../../../utils/user/getUsersSortInput';
import { parseUserFormInputToUserInput } from '../../../../utils/user/parseUserFormInput';

export default function Users() {
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
  } = useTable<GetUsersQueryVariables>();
  const [queryState, reexecuteQuery] = useGetUsersQuery({ pause, variables });
  const [, createUserMutation] = useCreateUserMutation();
  const [loading, setLoading] = useState(false);
  const [createUserDialogProps, setCreateUserDialogProps] = useState<UserType | null>(null);
  const users = useMemo(() => queryState.data?.admin.listUsers, [queryState.data]);

  const handleOpenCreateUserDialog = useCallback(
    (userType: UserType) => () => {
      setCreateUserDialogProps(userType);
    },
    [],
  );
  const handleCloseCreateUserDialog = useCallback(() => {
    setCreateUserDialogProps(null);
  }, []);
  const handleSaveCreateUser = useCallback(
    async (userInput: UserFormInput) => {
      setLoading(true);
      const result = await createUserMutation({
        userInput: parseUserFormInputToUserInput(userInput),
      });
      setLoading(false);
      if (result.data?.admin.addUser.isSuccess) {
        showSnackbar(t('user.feedback.create'), 'success');
        handleCloseCreateUserDialog();
        reexecuteQuery();
      } else {
        showError(result.data?.admin.addUser.validationErrors);
      }
    },
    [t, createUserMutation, handleCloseCreateUserDialog, reexecuteQuery, showSnackbar, showError],
  );

  return (
    <Card>
      {(queryState.fetching || loading) && <Loader />}
      <CardHeader title={t('user.title')} titleTypographyProps={{ variant: 'h1' }} />
      <CardContent>
        <PrimaryTable
          columns={getUsersColumns(t)}
          empty="user.text.no_users"
          initialState={initialState}
          rows={users?.nodes ?? []}
          totalCount={users?.totalCount ?? 0}
          getRowId={({ id }) => String(id)}
          onAdd={
            canCreate
              ? [
                  {
                    label: 'user.action.add_internal_user',
                    onClick: handleOpenCreateUserDialog(UserType.Internal),
                  },
                  {
                    label: 'user.action.add_external_user',
                    onClick: handleOpenCreateUserDialog(UserType.ExternalSupplier),
                  },
                ]
              : undefined
          }
          onDelete={canDelete ? handleDelete('user', DeleteUsersDocument, reexecuteQuery) : undefined}
          onEdit={
            canUpdate
              ? (row) => {
                  navigate(`/app/system/users/${row.id}`, { state: { readonly: false } });
                }
              : undefined
          }
          onExport={canRead ? handleExport('id', ExportUsersDocument) : undefined}
          onFilter={handleFilter(getUsersFilterInput)}
          onPageChange={handlePageChange(users?.pageInfo)}
          onStateChange={setInitialState}
          onSort={handleSort(getUsersSortInput)}
          onView={
            canRead
              ? (row) => {
                  navigate(`/app/system/users/${row.id}`);
                }
              : undefined
          }
          useColumnVisibility={false}
        />
      </CardContent>
      {createUserDialogProps && (
        <UserCreateDialog
          userType={createUserDialogProps}
          onClose={handleCloseCreateUserDialog}
          onSave={handleSaveCreateUser}
        />
      )}
    </Card>
  );
}
