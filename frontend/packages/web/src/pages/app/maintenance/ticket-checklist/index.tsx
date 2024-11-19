import { yupResolver } from '@hookform/resolvers/yup';
import { ChevronLeft } from '@mui/icons-material';
import { Box, Button, Card, CardContent, CardHeader } from '@mui/material';
import { BlockerDialog, CardActions, Form, Loader, Tab, Tabs } from '@realgimm5/frontend-common/components';
import { useOperation, useSnackbar } from '@realgimm5/frontend-common/contexts';
import { TicketChecklistTemplateType } from '@realgimm5/frontend-common/gql/types';
import { useNavigateBack, useTabsLocation } from '@realgimm5/frontend-common/hooks';
import { StateLocation } from '@realgimm5/frontend-common/interfaces';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';
import { OperationResult, useClient } from 'urql';

import { TicketChecklistCosts } from '../../../../components/domains/TicketChecklist/Costs/Costs';
import { TicketChecklistGeneralData } from '../../../../components/domains/TicketChecklist/GeneralData/GeneralData';
import { TicketChecklistOnConditionMaintenance } from '../../../../components/domains/TicketChecklist/OnConditionMaintenance/OnConditionMaintenance';
import { TicketChecklistPreventativeMaintenance } from '../../../../components/domains/TicketChecklist/PreventativeMaintenance/PreventativeMaintenance';
import { RawFeature } from '../../../../enums/RawFeature';
import {
  DeleteTicketChecklistDocument,
  ExportTicketChecklistsDocument,
  GetTicketChecklistDocument,
  GetTicketChecklistQuery,
  useUpdateTicketChecklistMutation,
} from '../../../../gql/RealGimm.Web.TicketChecklist.operation';
import { useFeature } from '../../../../hooks/useFeature';
import { TicketChecklistFormInput } from '../../../../interfaces/FormInputs/TicketChecklist';
import { parseTicketChecklistFormInputToTicketChecklistInput } from '../../../../utils/ticketChecklist/parseTicketChecklistFormInput';
import { parseTicketChecklistToTicketChecklistFormInput } from '../../../../utils/ticketChecklist/parseTicketChecklistFragment';
import { getTicketChecklistCostsSchema } from '../../../../utils/ticketChecklist/schemas/costs';
import { getTicketChecklistGeneralDataSchema } from '../../../../utils/ticketChecklist/schemas/generalData';
import { getTicketChecklistOnConditionMaintenanceSchema } from '../../../../utils/ticketChecklist/schemas/onConditionMaintenance';
import { getTicketChecklistPreventativeMaintenanceSchema } from '../../../../utils/ticketChecklist/schemas/preventativeMaintenance';
import { getTicketChecklistSchema } from '../../../../utils/ticketChecklist/schemas/ticketChecklist';

export default function TicketChecklist() {
  const { canDelete, canUpdate, canRead } = useFeature(RawFeature.FCLT_CONTRACT_BASE);
  const { t } = useTranslation();
  const { id, ticketChecklistId } = useParams();
  const { handleDelete, handleExport } = useOperation();
  const { state } = useLocation() as StateLocation;
  const { showError, showSnackbar } = useSnackbar();
  const tabsLocation = useTabsLocation();
  const client = useClient();
  const goBack = useNavigateBack(`/app/maintenance/facility-contracts/${id}`);
  const [loading, setLoading] = useState(false);
  const [readonly, setReadonly] = useState(state?.readonly ?? true);
  const [, updateTicketChecklistMutation] = useUpdateTicketChecklistMutation();
  const [ticketChecklist, setTicketChecklist] = useState<TicketChecklistFormInput>();
  const [isSubmitSuccessful, setSubmitSuccessful] = useState(false);

  const fetchTicketChecklist = useCallback(async () => {
    setLoading(true);
    const result: OperationResult<GetTicketChecklistQuery> = await client.query(GetTicketChecklistDocument, {
      ticketChecklistId: Number(ticketChecklistId),
    });
    setLoading(false);
    if (!result.data?.ticketChecklist.get) return Promise.reject();
    return parseTicketChecklistToTicketChecklistFormInput(result.data.ticketChecklist.get);
  }, [ticketChecklistId, client]);

  const {
    control,
    formState: { isValid: canSave, errors, isSubmitted },
    handleSubmit,
    reset,
    setValue,
    watch,
    getValues,
  } = useForm<TicketChecklistFormInput>({
    defaultValues: fetchTicketChecklist,
    resolver: ticketChecklist
      ? yupResolver(getTicketChecklistSchema(t, ticketChecklist.ticketChecklistTemplateType))
      : undefined,
  });

  useEffect(() => {
    window.history.replaceState(null, document.title);
    const { unsubscribe } = watch((formValues) => {
      setTicketChecklist(formValues as TicketChecklistFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(ticketChecklist);
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
    async (ticketChecklist: TicketChecklistFormInput) => {
      setLoading(true);
      const result = await updateTicketChecklistMutation({
        ticketChecklistId: Number(ticketChecklist.ticketChecklistId),
        input: parseTicketChecklistFormInputToTicketChecklistInput(ticketChecklist),
      });
      setLoading(false);
      if (result.data?.ticketChecklist.update.isSuccess) {
        showSnackbar(t('ticket_checklist_template.feedback.update'), 'success');
        setReadonly(true);
        const updatedTicketChecklist = await fetchTicketChecklist();
        setTicketChecklist(updatedTicketChecklist);
        setSubmitSuccessful(true);
        return Promise.resolve();
      } else {
        showError(result.data?.ticketChecklist.update.validationErrors);
        return Promise.reject();
      }
    },
    [updateTicketChecklistMutation, showSnackbar, t, fetchTicketChecklist, showError],
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
          title={ticketChecklist ? `${ticketChecklist.internalCode} - ${ticketChecklist.name}` : ''}
          titleTypographyProps={{ variant: 'h2' }}
          action={
            <CardActions
              readonly={readonly}
              onCancel={handleCancel}
              onDelete={
                canDelete ? handleDelete('ticket_checklist', DeleteTicketChecklistDocument, onDelete) : undefined
              }
              onEdit={canUpdate ? handleEdit : undefined}
              onExport={canRead ? handleExport(ExportTicketChecklistsDocument) : undefined}
            />
          }
        />
        <CardContent>
          <Tabs
            {...tabsLocation}
            tabs={[
              {
                label: 'ticket_checklist.tab.general_data',
                children: ticketChecklist && (
                  <TicketChecklistGeneralData
                    control={control}
                    errors={errors}
                    readonly={readonly}
                    setValue={setValue}
                  />
                ),
                error:
                  !readonly &&
                  isSubmitted &&
                  ticketChecklist &&
                  !getTicketChecklistGeneralDataSchema(t).isValidSync(ticketChecklist),
              },
              {
                label: 'ticket_checklist.tab.costs',
                children: ticketChecklist && (
                  <TicketChecklistCosts control={control} errors={errors} readonly={readonly} />
                ),
                error:
                  !readonly &&
                  isSubmitted &&
                  ticketChecklist &&
                  !getTicketChecklistCostsSchema(t).isValidSync(ticketChecklist),
              },
              ...((ticketChecklist?.ticketChecklistTemplateType &&
              [
                TicketChecklistTemplateType.Preventative,
                TicketChecklistTemplateType.PreventativeAndOnTriggerCondition,
              ].includes(ticketChecklist.ticketChecklistTemplateType)
                ? [
                    {
                      label: 'ticket_checklist.tab.preventative_maintenance',
                      children: (
                        <TicketChecklistPreventativeMaintenance
                          control={control}
                          errors={errors}
                          readonly={readonly}
                          setValue={setValue}
                        />
                      ),
                      error:
                        !readonly &&
                        isSubmitted &&
                        !getTicketChecklistPreventativeMaintenanceSchema(t).isValidSync(ticketChecklist),
                    },
                  ]
                : []) as Tab[]),
              ...((ticketChecklist?.ticketChecklistTemplateType &&
              [
                TicketChecklistTemplateType.OnTriggerCondition,
                TicketChecklistTemplateType.PreventativeAndOnTriggerCondition,
              ].includes(ticketChecklist.ticketChecklistTemplateType)
                ? [
                    {
                      label: 'ticket_checklist.tab.on_condition_maintenance',
                      children: (
                        <TicketChecklistOnConditionMaintenance control={control} errors={errors} readonly={readonly} />
                      ),
                      error:
                        !readonly &&
                        isSubmitted &&
                        !getTicketChecklistOnConditionMaintenanceSchema(t).isValidSync(ticketChecklist),
                    },
                  ]
                : []) as Tab[]),
            ]}
          />
        </CardContent>
      </Card>
      <BlockerDialog isBlocked={!readonly} canSave={canSave} onSave={handleWorkingClose} />
    </Form>
  );
}
