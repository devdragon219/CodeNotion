import { yupResolver } from '@hookform/resolvers/yup';
import { ChevronLeft } from '@mui/icons-material';
import { Box, Button, Card, CardContent, CardHeader, Grid2 } from '@mui/material';
import { BlockerDialog, CardActions, Form, Loader } from '@realgimm5/frontend-common/components';
import { useOperation, useSnackbar } from '@realgimm5/frontend-common/contexts';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useDebounce, useNavigateBack } from '@realgimm5/frontend-common/hooks';
import { StateLocation } from '@realgimm5/frontend-common/interfaces';
import { useCallback, useEffect, useState } from 'react';
import { Control, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';
import { OperationResult, useClient } from 'urql';

import { WorkTeamGeneralData } from '../../../../components/domains/WorkTeam/GeneralData/GeneralData';
import { Workers } from '../../../../components/domains/Worker/Workers';
import { RawFeature } from '../../../../enums/RawFeature';
import {
  DeleteWorkTeamDocument,
  ExportWorkTeamsDocument,
  GetWorkTeamDocument,
  GetWorkTeamQuery,
  useUpdateWorkTeamMutation,
} from '../../../../gql/RealGimm.Web.WorkTeam.operation';
import { useFeature } from '../../../../hooks/useFeature';
import { useWorkTeam } from '../../../../hooks/useWorkTeam';
import { WorkTeamFormInput } from '../../../../interfaces/FormInputs/WorkTeam';
import { WorkersFieldValues } from '../../../../interfaces/FormInputs/Worker';
import { parseWorkTeamFormInputToWorkTeamInput } from '../../../../utils/workTeam/parseWorkTeamFormInput';
import { parseWorkTeamToWorkTeamFormInput } from '../../../../utils/workTeam/parseWorkTeamFragment';
import { getWorkTeamSchema } from '../../../../utils/workTeam/schemas/workTeam';

export default function WorkTeam() {
  const { canDelete, canRead, canUpdate } = useFeature(RawFeature.FCLT_CONFIG);
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const { id } = useParams();
  const { handleDelete, handleExport } = useOperation();
  const { state } = useLocation() as StateLocation;
  const { showError, showSnackbar } = useSnackbar();
  const client = useClient();
  const goBack = useNavigateBack('/app/maintenance/work-teams');
  const { checkCanUseInternalCode } = useWorkTeam();
  const [loading, setLoading] = useState(false);
  const [readonly, setReadonly] = useState(state?.readonly ?? true);
  const [, updateWorkTeamMutation] = useUpdateWorkTeamMutation();
  const [workTeam, setWorkTeam] = useState<WorkTeamFormInput>();
  const debouncedWorkTeam = useDebounce(workTeam);
  const [canUseInternalCode, setCanUseInternalCode] = useState(true);
  const [isSubmitSuccessful, setSubmitSuccessful] = useState(false);

  const fetchWorkTeam = useCallback(async () => {
    setLoading(true);
    const result: OperationResult<GetWorkTeamQuery> = await client.query(GetWorkTeamDocument, {
      workTeamId: Number(id),
    });
    setLoading(false);
    if (!result.data?.workTeam.get) return Promise.reject();
    return parseWorkTeamToWorkTeamFormInput(result.data.workTeam.get);
  }, [id, client]);

  const {
    control,
    formState: { isValid: canSave, errors },
    handleSubmit,
    reset,
    setValue,
    watch,
    getValues,
  } = useForm<WorkTeamFormInput>({
    defaultValues: fetchWorkTeam,
    resolver: workTeam ? yupResolver(getWorkTeamSchema(canUseInternalCode, language, t)) : undefined,
  });

  useEffect(() => {
    if (debouncedWorkTeam) {
      checkCanUseInternalCode(debouncedWorkTeam.internalCode, debouncedWorkTeam.workTeamId, setCanUseInternalCode);
    }
    // eslint-disable-next-line
  }, [debouncedWorkTeam?.internalCode, debouncedWorkTeam?.workTeamId]);

  useEffect(() => {
    window.history.replaceState(null, document.title);
    const { unsubscribe } = watch((formValues) => {
      setWorkTeam(formValues as WorkTeamFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(workTeam);
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
    async (workTeam: WorkTeamFormInput) => {
      setLoading(true);
      const result = await updateWorkTeamMutation({
        workTeamId: Number(workTeam.workTeamId),
        input: parseWorkTeamFormInputToWorkTeamInput(workTeam),
      });
      setLoading(false);
      if (result.data?.workTeam.update.isSuccess) {
        showSnackbar(t('work_team.feedback.update'), 'success');
        setReadonly(true);
        const updatedWorkTeam = await fetchWorkTeam();
        setWorkTeam(updatedWorkTeam);
        setSubmitSuccessful(true);
        return Promise.resolve();
      } else {
        showError(result.data?.workTeam.update.validationErrors);
        return Promise.reject();
      }
    },
    [updateWorkTeamMutation, showSnackbar, t, fetchWorkTeam, showError],
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
          title={workTeam ? `${workTeam.internalCode} - ${workTeam.description}` : ''}
          titleTypographyProps={{ variant: 'h2' }}
          action={
            <CardActions
              readonly={readonly}
              onCancel={handleCancel}
              onDelete={canDelete ? handleDelete('work_team', DeleteWorkTeamDocument, onDelete) : undefined}
              onEdit={canUpdate ? handleEdit : undefined}
              onExport={canRead ? handleExport(ExportWorkTeamsDocument) : undefined}
            />
          }
        />
        <CardContent>
          {workTeam && (
            <Grid2 container spacing={{ xs: 2, sm: 3 }}>
              <Grid2 size={12}>
                <WorkTeamGeneralData control={control} errors={errors} readonly={readonly} setValue={setValue} />
              </Grid2>
              <Grid2 size={12}>
                <Workers
                  control={control as unknown as Control<WorkersFieldValues>}
                  errors={errors}
                  readonly={readonly}
                  mode={FormMode.Edit}
                />
              </Grid2>
            </Grid2>
          )}
        </CardContent>
      </Card>
      <BlockerDialog isBlocked={!readonly} canSave={canSave} onSave={handleWorkingClose} />
    </Form>
  );
}
