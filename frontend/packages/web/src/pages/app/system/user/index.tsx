import { yupResolver } from '@hookform/resolvers/yup';
import { ChevronLeft } from '@mui/icons-material';
import { Box, Button, Card, CardContent, CardHeader } from '@mui/material';
import { BlockerDialog, CardActions, Form, Loader, Tab, Tabs } from '@realgimm5/frontend-common/components';
import { useOperation, useSnackbar } from '@realgimm5/frontend-common/contexts';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { UserType } from '@realgimm5/frontend-common/gql/types';
import { useDebounce, useNavigateBack, useTabsLocation } from '@realgimm5/frontend-common/hooks';
import { StateLocation } from '@realgimm5/frontend-common/interfaces';
import { getContactsSchema, getFullName } from '@realgimm5/frontend-common/utils';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';
import { OperationResult, useClient } from 'urql';

import { UserConfig } from '../../../../components/domains/User/Config/Config';
import { UserContacts } from '../../../../components/domains/User/Contacts/Contacts';
import { UserGeneralData } from '../../../../components/domains/User/GeneralData/GeneralData';
import { UserOrgUnits } from '../../../../components/domains/User/OrgUnits/OrgUnits';
import { UserSessions } from '../../../../components/domains/User/Sessions/Sessions';
import { RawFeature } from '../../../../enums/RawFeature';
import {
  DeleteUserDocument,
  ExportUsersDocument,
  GetUserDocument,
  GetUserQuery,
  useUpdateUserMutation,
} from '../../../../gql/RealGimm.Web.Admin.operation';
import { useFeature } from '../../../../hooks/useFeature';
import { useUser } from '../../../../hooks/useUser';
import { UserFormInput } from '../../../../interfaces/FormInputs/User';
import { parseUserFormInputToUserInput } from '../../../../utils/user/parseUserFormInput';
import { parseUserToUserFormInput } from '../../../../utils/user/parseUserFragment';
import { getUserConfigSchema } from '../../../../utils/user/schemas/config';
import { getUserGeneralDataSchema } from '../../../../utils/user/schemas/generalData';
import { getUserSchema } from '../../../../utils/user/schemas/user';

export default function User() {
  const { canDelete, canUpdate, canRead } = useFeature(RawFeature.ADMIN_USERS_AND_GROUPS);
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const { id } = useParams();
  const { handleDelete, handleExport } = useOperation();
  const { state } = useLocation() as StateLocation;
  const { showError, showSnackbar } = useSnackbar();
  const tabsLocation = useTabsLocation();
  const client = useClient();
  const goBack = useNavigateBack('/app/users-and-groups/users');
  const { checkCanUseUserName } = useUser();
  const [loading, setLoading] = useState(false);
  const [readonly, setReadonly] = useState(state?.readonly ?? true);
  const [, updateUserMutation] = useUpdateUserMutation();
  const [user, setUser] = useState<UserFormInput>();
  const [isSubmitSuccessful, setSubmitSuccessful] = useState(false);
  const debouncedUser = useDebounce(user);
  const [canUseUserName, setCanUseUserName] = useState(true);

  const fetchUser = useCallback(async () => {
    setLoading(true);
    const result: OperationResult<GetUserQuery> = await client.query(GetUserDocument, {
      userId: Number(id),
    });
    setLoading(false);
    if (!result.data?.admin.user) return Promise.reject();
    return parseUserToUserFormInput(result.data.admin.user);
  }, [id, client]);

  const {
    control,
    formState: { isValid: canSave, errors, isSubmitted },
    handleSubmit,
    reset,
    setValue,
    watch,
    getValues,
  } = useForm<UserFormInput>({
    defaultValues: fetchUser,
    resolver: user ? yupResolver(getUserSchema(canUseUserName, language, t, user.status)) : undefined,
  });

  useEffect(() => {
    if (debouncedUser) {
      checkCanUseUserName(debouncedUser.userName, debouncedUser.userId, setCanUseUserName);
    }
    // eslint-disable-next-line
  }, [debouncedUser?.userName, debouncedUser?.userId]);

  useEffect(() => {
    window.history.replaceState(null, document.title);
    const { unsubscribe } = watch((formValues) => {
      setUser(formValues as UserFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(user);
      setSubmitSuccessful(false);
    }
    // eslint-disable-next-line
  }, [isSubmitSuccessful]);

  const handleCancel = useCallback(() => {
    reset();
    setReadonly(true);
  }, [reset]);
  const handleEdit = useCallback(() => {
    setReadonly(false);
  }, []);

  const onSubmit = useCallback(
    async (user: UserFormInput) => {
      setLoading(true);
      const result = await updateUserMutation({
        userId: Number(user.userId),
        userInput: parseUserFormInputToUserInput(user),
      });
      setLoading(false);
      if (result.data?.admin.updateUser.isSuccess) {
        showSnackbar(t('user.feedback.update'), 'success');
        setReadonly(true);
        const updatedUser = await fetchUser();
        setUser(updatedUser);
        setSubmitSuccessful(true);
        return Promise.resolve();
      } else {
        showError(result.data?.admin.updateUser.validationErrors);
        return Promise.reject();
      }
    },
    [t, updateUserMutation, showSnackbar, fetchUser, showError],
  );

  const handleWorkingClose = useCallback(() => {
    const values = getValues();
    return onSubmit(values);
  }, [onSubmit, getValues]);

  const onDelete = useCallback(() => {
    setReadonly(true);
    goBack();
  }, [goBack]);

  return (
    <Form noValidate onSubmit={handleSubmit(onSubmit)}>
      {loading && <Loader />}
      <Card>
        <Box sx={{ px: 1, pt: 2 }}>
          <Button color="secondary" variant="text" startIcon={<ChevronLeft />} onClick={goBack}>
            {t('common.button.back')}
          </Button>
        </Box>
        <CardHeader
          title={getFullName(user?.firstName, user?.lastName)}
          titleTypographyProps={{ variant: 'h2' }}
          action={
            <CardActions
              readonly={readonly}
              onCancel={handleCancel}
              onDelete={canDelete ? handleDelete('user', DeleteUserDocument, onDelete) : undefined}
              onEdit={canUpdate ? handleEdit : undefined}
              onExport={canRead ? handleExport(ExportUsersDocument) : undefined}
            />
          }
        />
        <CardContent>
          <Tabs
            {...tabsLocation}
            tabs={[
              {
                label: 'user.tab.general_data',
                children: user && (
                  <UserGeneralData
                    control={control}
                    errors={errors}
                    setValue={setValue}
                    readonly={readonly}
                    mode={FormMode.Edit}
                  />
                ),
                error:
                  !readonly &&
                  isSubmitted &&
                  user &&
                  !getUserGeneralDataSchema(canUseUserName, language, t, user.status).isValidSync(user),
              },
              {
                label: 'user.tab.config',
                children: user && (
                  <UserConfig control={control} errors={errors} mode={FormMode.Edit} readonly={readonly} />
                ),
                error: !readonly && isSubmitted && user && !getUserConfigSchema(t).isValidSync(user),
              },
              ...((user?.userType === UserType.Internal
                ? [
                    {
                      label: 'user.tab.org_unit',
                      children: <UserOrgUnits control={control} readonly={readonly} setValue={setValue} />,
                    },
                  ]
                : []) as Tab[]),
              {
                label: 'user.tab.contacts',
                children: user && (
                  <UserContacts mode={FormMode.Edit} control={control} errors={errors} readonly={readonly} />
                ),
                error: !readonly && isSubmitted && user && !getContactsSchema(t).isValidSync(user),
              },
              {
                label: 'user.tab.sessions',
                children: user && <UserSessions control={control} readonly={readonly} />,
              },
            ]}
          />
        </CardContent>
      </Card>
      <BlockerDialog isBlocked={!readonly} canSave={canSave} onSave={handleWorkingClose} />
    </Form>
  );
}
