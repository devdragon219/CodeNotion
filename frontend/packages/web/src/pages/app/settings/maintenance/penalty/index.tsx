import { yupResolver } from '@hookform/resolvers/yup';
import { ChevronLeft, EventTwoTone } from '@mui/icons-material';
import { Box, Button, Card, CardContent, CardHeader, Grid2 } from '@mui/material';
import { BlockerDialog, CardActions, Form, Loader, SectionTitle } from '@realgimm5/frontend-common/components';
import { useOperation, useSnackbar } from '@realgimm5/frontend-common/contexts';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useDebounce, useNavigateBack } from '@realgimm5/frontend-common/hooks';
import { StateLocation } from '@realgimm5/frontend-common/interfaces';
import { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';
import { OperationResult, useClient } from 'urql';

import { CalendarsDialog } from '../../../../../components/dialogs/Calendars/Calendars';
import { PenaltyField } from '../../../../../components/domains/Penalty/Field/Field';
import { RawFeature } from '../../../../../enums/RawFeature';
import {
  DeletePenaltyDocument,
  ExportPenaltiesDocument,
  GetPenaltyDocument,
  GetPenaltyQuery,
  useUpdatePenaltyMutation,
} from '../../../../../gql/RealGimm.Web.Penalty.operation';
import { useFeature } from '../../../../../hooks/useFeature';
import { usePenalty } from '../../../../../hooks/usePenalty';
import { PenaltiesFieldValues, PenaltyFormInput } from '../../../../../interfaces/FormInputs/Penalty';
import { parsePenaltyFormInputToPenaltyInput } from '../../../../../utils/penalty/parsePenaltyFormInput';
import { parsePenaltyToPenaltyFormInput } from '../../../../../utils/penalty/parsePenaltyFragment';
import { getPenaltiesSchema } from '../../../../../utils/penalty/schemas/penalties';

export default function Penalty() {
  const { canDelete, canRead, canUpdate } = useFeature(RawFeature.FCLT_PENALTY_BASE);
  const { t } = useTranslation();
  const { id } = useParams();
  const { handleDelete, handleExport } = useOperation();
  const { state } = useLocation() as StateLocation;
  const { showError, showSnackbar } = useSnackbar();
  const client = useClient();
  const goBack = useNavigateBack('/app/settings/maintenance/penalties');
  const { checkCanUseInternalCode } = usePenalty();
  const [loading, setLoading] = useState(false);
  const [readonly, setReadonly] = useState(state?.readonly ?? true);
  const [, updatePenaltyMutation] = useUpdatePenaltyMutation();
  const [penalty, setPenalty] = useState<PenaltyFormInput>();
  const debouncedPenalty = useDebounce(penalty);
  const [canUseInternalCode, setCanUseInternalCode] = useState(true);
  const [isSubmitSuccessful, setSubmitSuccessful] = useState(false);
  const [isCalendarsDialogOpen, setCalendarsDialogOpen] = useState(false);

  const fetchPenalty = useCallback(async () => {
    setLoading(true);
    const result: OperationResult<GetPenaltyQuery> = await client.query(GetPenaltyDocument, {
      penaltyId: Number(id),
    });
    setLoading(false);
    if (!result.data?.penalty.get) return Promise.reject();
    return {
      penalties: [parsePenaltyToPenaltyFormInput(result.data.penalty.get)],
    };
  }, [id, client]);

  const {
    control,
    formState: { isValid: canSave, errors },
    handleSubmit,
    reset,
    watch,
    getValues,
  } = useForm<PenaltiesFieldValues>({
    defaultValues: fetchPenalty,
    resolver: penalty ? yupResolver(getPenaltiesSchema({ [penalty.guid]: canUseInternalCode }, t)) : undefined,
  });

  useEffect(() => {
    if (debouncedPenalty) {
      checkCanUseInternalCode(debouncedPenalty.internalCode, debouncedPenalty.penaltyId, [], setCanUseInternalCode);
    }
    // eslint-disable-next-line
  }, [debouncedPenalty?.internalCode, debouncedPenalty?.penaltyId]);

  useEffect(() => {
    window.history.replaceState(null, document.title);
    const { unsubscribe } = watch((formValues) => {
      setPenalty((formValues as PenaltiesFieldValues).penalties[0]);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        penalties: [penalty],
      });
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
    async (penalties: PenaltiesFieldValues) => {
      const penalty = penalties.penalties[0];
      setLoading(true);
      const result = await updatePenaltyMutation({
        penaltyId: Number(penalty.penaltyId),
        input: parsePenaltyFormInputToPenaltyInput(penalty, FormMode.Edit),
      });
      setLoading(false);
      if (result.data?.penalty.update.isSuccess) {
        showSnackbar(t('penalty.feedback.update'), 'success');
        setReadonly(true);
        const updatedPenalty = await fetchPenalty();
        setPenalty(updatedPenalty.penalties[0]);
        setSubmitSuccessful(true);
        return Promise.resolve();
      } else {
        showError(result.data?.penalty.update.validationErrors);
        return Promise.reject();
      }
    },
    [updatePenaltyMutation, showSnackbar, t, fetchPenalty, showError],
  );

  const handleWorkingClose = useCallback(() => {
    const values = getValues();
    return onSubmit(values);
  }, [onSubmit, getValues]);

  const onDelete = useCallback(() => {
    setReadonly(true);
    goBack();
  }, [goBack]);

  const handleOpenCalendarsDialog = useCallback(() => {
    setCalendarsDialogOpen(true);
  }, []);
  const handleCloseCalendarsDialog = useCallback(() => {
    setCalendarsDialogOpen(false);
  }, []);

  const handleCalendarChange = useCallback(async () => {
    setPenalty(undefined);
    const updatedPenalty = await fetchPenalty();
    setPenalty(updatedPenalty.penalties[0]);
    reset(updatedPenalty);
  }, [fetchPenalty, reset]);

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
          title={penalty ? penalty.internalCode : ''}
          titleTypographyProps={{ variant: 'h2' }}
          action={
            <CardActions
              readonly={readonly}
              onCancel={handleCancel}
              onDelete={canDelete ? handleDelete('penalty', DeletePenaltyDocument, onDelete) : undefined}
              onEdit={canUpdate ? handleEdit : undefined}
              onExport={canRead ? handleExport(ExportPenaltiesDocument) : undefined}
            />
          }
        />
        <CardContent>
          {isCalendarsDialogOpen && (
            <CalendarsDialog
              readonly={!readonly}
              onClose={handleCloseCalendarsDialog}
              onChange={handleCalendarChange}
            />
          )}
          {penalty && (
            <Grid2 container spacing={{ xs: 2, sm: 3 }}>
              <SectionTitle
                actions={
                  <Button
                    color="secondary"
                    variant="contained"
                    startIcon={<EventTwoTone />}
                    onClick={handleOpenCalendarsDialog}
                  >
                    {t('penalty.action.calendar')}
                  </Button>
                }
                value="penalty.section_title.general_data"
              />
              <Grid2 size={12}>
                <Controller
                  name="penalties.0"
                  control={control}
                  render={({ field }) => <PenaltyField {...field} errors={errors.penalties?.[0]} readonly={readonly} />}
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
