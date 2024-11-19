import { yupResolver } from '@hookform/resolvers/yup';
import { ChevronLeft } from '@mui/icons-material';
import { Box, Button, Card, CardContent, CardHeader } from '@mui/material';
import { BlockerDialog, CardActions, Form, Loader, Tabs } from '@realgimm5/frontend-common/components';
import { useOperation, useSnackbar } from '@realgimm5/frontend-common/contexts';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useNavigateBack, useTabsLocation } from '@realgimm5/frontend-common/hooks';
import { StateLocation } from '@realgimm5/frontend-common/interfaces';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';
import { OperationResult, useClient } from 'urql';

import { GroupGeneralData } from '../../../../components/domains/Group/GeneralData/GeneralData';
import { GroupPermissions } from '../../../../components/domains/Group/Permissions/Permissions';
import { RawFeature } from '../../../../enums/RawFeature';
import {
  DeleteGroupDocument,
  ExportGroupsDocument,
  GetGroupDocument,
  GetGroupQuery,
  useUpdateGroupMutation,
} from '../../../../gql/RealGimm.Web.Group.operation';
import { useFeature } from '../../../../hooks/useFeature';
import { GroupFormInput } from '../../../../interfaces/FormInputs/Group';
import { getEmptyGroupFormInput } from '../../../../utils/group/initialValues';
import { parseGroupFormInputToGroupInput } from '../../../../utils/group/parseGroupFormInput';
import { parseGroupToGroupFormInput } from '../../../../utils/group/parseGroupFragment';
import { getGroupGeneralDataSchema } from '../../../../utils/group/schemas/generalData';
import { getGroupSchema } from '../../../../utils/group/schemas/group';

export default function Group() {
  const { canDelete, canUpdate, canRead } = useFeature(RawFeature.ADMIN_USERS_AND_GROUPS);
  const { t } = useTranslation();
  const { id } = useParams();
  const { handleDelete, handleExport } = useOperation();
  const { state } = useLocation() as StateLocation;
  const { showError, showSnackbar } = useSnackbar();
  const tabsLocation = useTabsLocation();
  const client = useClient();
  const goBack = useNavigateBack('/app/system/groups');
  const [loading, setLoading] = useState(false);
  const [readonly, setReadonly] = useState(state?.readonly ?? true);
  const [, updateGroupMutation] = useUpdateGroupMutation();
  const [group, setGroup] = useState<GroupFormInput>();
  const [isSubmitSuccessful, setSubmitSuccessful] = useState(false);

  const fetchGroup = useCallback(async () => {
    setLoading(true);
    const result: OperationResult<GetGroupQuery> = await client.query(GetGroupDocument, {
      groupId: Number(id),
    });
    setLoading(false);
    if (!result.data?.admin.group) return getEmptyGroupFormInput();
    return parseGroupToGroupFormInput(result.data.admin.group);
  }, [id, client]);

  const {
    control,
    formState: { isValid: canSave, errors, isSubmitted },
    handleSubmit,
    reset,
    setValue,
    watch,
    getValues,
  } = useForm<GroupFormInput>({
    defaultValues: fetchGroup,
    resolver: group ? yupResolver(getGroupSchema(t)) : undefined,
  });

  useEffect(() => {
    window.history.replaceState(null, document.title);
    const { unsubscribe } = watch((formValues) => {
      setGroup(formValues as GroupFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(group);
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
    async (group: GroupFormInput) => {
      setLoading(true);
      const result = await updateGroupMutation({
        groupId: Number(group.groupId),
        groupInput: parseGroupFormInputToGroupInput(group),
      });
      setLoading(false);
      if (result.data?.admin.updateGroup.isSuccess) {
        showSnackbar(t('group.feedback.update'), 'success');
        setReadonly(true);
        const updatedGroup = await fetchGroup();
        setGroup(updatedGroup);
        setSubmitSuccessful(true);
        return Promise.resolve();
      } else {
        showError(result.data?.admin.updateGroup.validationErrors);
        return Promise.reject();
      }
    },
    [t, updateGroupMutation, showSnackbar, showError, fetchGroup],
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
          title={group?.name}
          titleTypographyProps={{ variant: 'h2' }}
          action={
            <CardActions
              readonly={readonly}
              onCancel={handleCancel}
              onDelete={canDelete ? handleDelete('group', DeleteGroupDocument, onDelete) : undefined}
              onEdit={canUpdate ? handleEdit : undefined}
              onExport={canRead ? handleExport(ExportGroupsDocument) : undefined}
            />
          }
        />
        <CardContent>
          <Tabs
            {...tabsLocation}
            tabs={[
              {
                label: 'group.tab.general_data',
                children: group && (
                  <GroupGeneralData control={control} errors={errors} readonly={readonly} mode={FormMode.Edit} />
                ),
                error: !readonly && isSubmitted && group && !getGroupGeneralDataSchema(t).isValidSync(group),
              },
              {
                label: 'group.tab.permissions',
                children: group && <GroupPermissions control={control} readonly={readonly} setValue={setValue} />,
              },
            ]}
          />
        </CardContent>
      </Card>
      <BlockerDialog isBlocked={!readonly} canSave={canSave} onSave={handleWorkingClose} />
    </Form>
  );
}
