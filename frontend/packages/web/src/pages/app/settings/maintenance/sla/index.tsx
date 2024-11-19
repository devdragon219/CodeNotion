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
import { SlaField } from '../../../../../components/domains/SLA/Field/Field';
import { RawFeature } from '../../../../../enums/RawFeature';
import {
  DeleteSlaDocument,
  ExportSlasDocument,
  GetSlaDocument,
  GetSlaQuery,
  useUpdateSlaMutation,
} from '../../../../../gql/RealGimm.Web.SLA.operation';
import { useFeature } from '../../../../../hooks/useFeature';
import { useSla } from '../../../../../hooks/useSLA';
import { SlaFormInput, SlasFieldValues } from '../../../../../interfaces/FormInputs/SLA';
import { parseSlaFormInputToSlaInput } from '../../../../../utils/sla/parseSLAFormInput';
import { parseSlaToSlaFormInput } from '../../../../../utils/sla/parseSLAFragment';
import { getSlasSchema } from '../../../../../utils/sla/schemas/slas';

export default function Sla() {
  const { canDelete, canRead, canUpdate } = useFeature(RawFeature.FCLT_SLA_BASE);
  const { t } = useTranslation();
  const { id } = useParams();
  const { handleDelete, handleExport } = useOperation();
  const { state } = useLocation() as StateLocation;
  const { showError, showSnackbar } = useSnackbar();
  const client = useClient();
  const goBack = useNavigateBack('/app/settings/maintenance/slas');
  const { checkCanUseInternalCode } = useSla();
  const [loading, setLoading] = useState(false);
  const [readonly, setReadonly] = useState(state?.readonly ?? true);
  const [, updateSlaMutation] = useUpdateSlaMutation();
  const [sla, setSla] = useState<SlaFormInput>();
  const debouncedSla = useDebounce(sla);
  const [canUseInternalCode, setCanUseInternalCode] = useState(true);
  const [isSubmitSuccessful, setSubmitSuccessful] = useState(false);
  const [isCalendarsDialogOpen, setCalendarsDialogOpen] = useState(false);

  const fetchSla = useCallback(async () => {
    setLoading(true);
    const result: OperationResult<GetSlaQuery> = await client.query(GetSlaDocument, {
      slaId: Number(id),
    });
    setLoading(false);
    if (!result.data?.sla.get) return Promise.reject();
    return {
      slas: [parseSlaToSlaFormInput(result.data.sla.get)],
    };
  }, [id, client]);

  const {
    control,
    formState: { isValid: canSave, errors },
    handleSubmit,
    reset,
    watch,
    getValues,
  } = useForm<SlasFieldValues>({
    defaultValues: fetchSla,
    resolver: sla ? yupResolver(getSlasSchema({ [sla.guid]: canUseInternalCode }, t)) : undefined,
  });

  useEffect(() => {
    if (debouncedSla) {
      checkCanUseInternalCode(debouncedSla.internalCode, debouncedSla.slaId, [], setCanUseInternalCode);
    }
    // eslint-disable-next-line
  }, [debouncedSla?.internalCode, debouncedSla?.slaId]);

  useEffect(() => {
    window.history.replaceState(null, document.title);
    const { unsubscribe } = watch((formValues) => {
      setSla((formValues as SlasFieldValues).slas[0]);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        slas: [sla],
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
    async (slas: SlasFieldValues) => {
      const sla = slas.slas[0];
      setLoading(true);
      const result = await updateSlaMutation({
        slaId: Number(sla.slaId),
        input: parseSlaFormInputToSlaInput(sla, FormMode.Edit),
      });
      setLoading(false);
      if (result.data?.sla.update.isSuccess) {
        showSnackbar(t('sla.feedback.update'), 'success');
        setReadonly(true);
        const updatedSla = await fetchSla();
        setSla(updatedSla.slas[0]);
        setSubmitSuccessful(true);
        return Promise.resolve();
      } else {
        showError(result.data?.sla.update.validationErrors);
        return Promise.reject();
      }
    },
    [updateSlaMutation, showSnackbar, t, fetchSla, showError],
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
    setSla(undefined);
    const updatedSla = await fetchSla();
    setSla(updatedSla.slas[0]);
    reset(updatedSla);
  }, [fetchSla, reset]);

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
          title={sla ? sla.internalCode : ''}
          titleTypographyProps={{ variant: 'h2' }}
          action={
            <CardActions
              readonly={readonly}
              onCancel={handleCancel}
              onDelete={canDelete ? handleDelete('sla', DeleteSlaDocument, onDelete) : undefined}
              onEdit={canUpdate ? handleEdit : undefined}
              onExport={canRead ? handleExport(ExportSlasDocument) : undefined}
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
          {sla && (
            <Grid2 container spacing={{ xs: 2, sm: 3 }}>
              <SectionTitle
                actions={
                  <Button
                    color="secondary"
                    variant="contained"
                    startIcon={<EventTwoTone />}
                    onClick={handleOpenCalendarsDialog}
                  >
                    {t('sla.action.calendar')}
                  </Button>
                }
                value="sla.section_title.general_data"
              />
              <Grid2 size={12}>
                <Controller
                  name="slas.0"
                  control={control}
                  render={({ field }) => <SlaField {...field} errors={errors.slas?.[0]} readonly={readonly} />}
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
