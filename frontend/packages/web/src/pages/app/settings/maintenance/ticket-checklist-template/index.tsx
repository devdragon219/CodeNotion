import { yupResolver } from '@hookform/resolvers/yup';
import { ChevronLeft } from '@mui/icons-material';
import { Box, Button, Card, CardContent, CardHeader } from '@mui/material';
import { BlockerDialog, CardActions, Form, Loader, Tab, Tabs } from '@realgimm5/frontend-common/components';
import { useOperation, useSnackbar } from '@realgimm5/frontend-common/contexts';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { TicketChecklistTemplateType } from '@realgimm5/frontend-common/gql/types';
import { useDebounce, useNavigateBack, useTabsLocation } from '@realgimm5/frontend-common/hooks';
import { StateLocation } from '@realgimm5/frontend-common/interfaces';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';
import { OperationResult, useClient } from 'urql';

import { TicketChecklistTemplateCosts } from '../../../../../components/domains/TicketChecklistTemplate/Costs/Costs';
import { TicketChecklistTemplateGeneralData } from '../../../../../components/domains/TicketChecklistTemplate/GeneralData/GeneralData';
import { TicketChecklistTemplateOnConditionMaintenance } from '../../../../../components/domains/TicketChecklistTemplate/OnConditionMaintenance/OnConditionMaintenance';
import { TicketChecklistTemplatePreventativeMaintenance } from '../../../../../components/domains/TicketChecklistTemplate/PreventativeMaintenance/PreventativeMaintenance';
import { RawFeature } from '../../../../../enums/RawFeature';
import {
  DeleteTicketChecklistTemplateDocument,
  ExportTicketChecklistTemplatesDocument,
  GetTicketChecklistTemplateDocument,
  GetTicketChecklistTemplateQuery,
  useUpdateTicketChecklistTemplateMutation,
} from '../../../../../gql/RealGimm.Web.TicketChecklistTemplate.operation';
import { useFeature } from '../../../../../hooks/useFeature';
import { useTicketChecklistTemplate } from '../../../../../hooks/useTicketChecklistTemplate';
import { TicketChecklistTemplateFormInput } from '../../../../../interfaces/FormInputs/TicketChecklistTemplate';
import { parseTicketChecklistTemplateFormInputToTicketChecklistTemplateInput } from '../../../../../utils/ticketChecklistTemplate/parseTicketChecklistTemplateFormInput';
import { parseTicketChecklistTemplateToTicketChecklistTemplateFormInput } from '../../../../../utils/ticketChecklistTemplate/parseTicketChecklistTemplateFragment';
import { getTicketChecklistTemplateCostsSchema } from '../../../../../utils/ticketChecklistTemplate/schemas/costs';
import { getTicketChecklistTemplateGeneralDataSchema } from '../../../../../utils/ticketChecklistTemplate/schemas/generalData';
import { getTicketChecklistTemplateOnConditionMaintenanceSchema } from '../../../../../utils/ticketChecklistTemplate/schemas/onConditionMaintenance';
import { getTicketChecklistTemplatePreventativeMaintenanceSchema } from '../../../../../utils/ticketChecklistTemplate/schemas/preventativeMaintenance';
import { getTicketChecklistTemplateSchema } from '../../../../../utils/ticketChecklistTemplate/schemas/ticketChecklistTemplate';

export default function TicketChecklistTemplate() {
  const { canDelete, canUpdate, canRead } = useFeature(RawFeature.FCLT_CONFIG);
  const { t } = useTranslation();
  const { id } = useParams();
  const { handleDelete, handleExport } = useOperation();
  const { state } = useLocation() as StateLocation;
  const { showError, showSnackbar } = useSnackbar();
  const tabsLocation = useTabsLocation();
  const client = useClient();
  const goBack = useNavigateBack('/app/settings/maintenance/ticket-checklist-templates');
  const { checkCanUseInternalCode } = useTicketChecklistTemplate();
  const [loading, setLoading] = useState(false);
  const [readonly, setReadonly] = useState(state?.readonly ?? true);
  const [, updateTicketChecklistTemplateMutation] = useUpdateTicketChecklistTemplateMutation();
  const [ticketChecklistTemplate, setTicketChecklistTemplate] = useState<TicketChecklistTemplateFormInput>();
  const [isSubmitSuccessful, setSubmitSuccessful] = useState(false);
  const debouncedTicketChecklistTemplate = useDebounce(ticketChecklistTemplate);
  const [canUseInternalCode, setCanUseInternalCode] = useState(true);

  const fetchTicketChecklistTemplate = useCallback(async () => {
    setLoading(true);
    const result: OperationResult<GetTicketChecklistTemplateQuery> = await client.query(
      GetTicketChecklistTemplateDocument,
      {
        ticketChecklistTemplateId: Number(id),
      },
    );
    setLoading(false);
    if (!result.data?.ticketChecklistTemplate.get) return Promise.reject();
    return parseTicketChecklistTemplateToTicketChecklistTemplateFormInput(result.data.ticketChecklistTemplate.get);
  }, [id, client]);

  const {
    control,
    formState: { isValid: canSave, errors, isSubmitted },
    handleSubmit,
    reset,
    setValue,
    watch,
    getValues,
  } = useForm<TicketChecklistTemplateFormInput>({
    defaultValues: fetchTicketChecklistTemplate,
    resolver: ticketChecklistTemplate
      ? yupResolver(
          getTicketChecklistTemplateSchema(canUseInternalCode, t, ticketChecklistTemplate.ticketChecklistTemplateType),
        )
      : undefined,
  });

  useEffect(() => {
    if (debouncedTicketChecklistTemplate) {
      checkCanUseInternalCode(
        debouncedTicketChecklistTemplate.internalCode,
        debouncedTicketChecklistTemplate.ticketChecklistTemplateId,
        setCanUseInternalCode,
      );
    }
    // eslint-disable-next-line
  }, [debouncedTicketChecklistTemplate?.internalCode, debouncedTicketChecklistTemplate?.ticketChecklistTemplateId]);

  useEffect(() => {
    window.history.replaceState(null, document.title);
    const { unsubscribe } = watch((formValues) => {
      setTicketChecklistTemplate(formValues as TicketChecklistTemplateFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(ticketChecklistTemplate);
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
    async (ticketChecklistTemplate: TicketChecklistTemplateFormInput) => {
      setLoading(true);
      const result = await updateTicketChecklistTemplateMutation({
        ticketChecklistTemplateId: Number(ticketChecklistTemplate.ticketChecklistTemplateId),
        input: parseTicketChecklistTemplateFormInputToTicketChecklistTemplateInput(ticketChecklistTemplate),
      });
      setLoading(false);
      if (result.data?.ticketChecklistTemplate.update.isSuccess) {
        showSnackbar(t('ticket_checklist_template.feedback.update'), 'success');
        setReadonly(true);
        const updatedTicketChecklistTemplate = await fetchTicketChecklistTemplate();
        setTicketChecklistTemplate(updatedTicketChecklistTemplate);
        setSubmitSuccessful(true);
        return Promise.resolve();
      } else {
        showError(result.data?.ticketChecklistTemplate.update.validationErrors);
        return Promise.reject();
      }
    },
    [t, updateTicketChecklistTemplateMutation, showSnackbar, fetchTicketChecklistTemplate, showError],
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
          title={
            ticketChecklistTemplate ? `${ticketChecklistTemplate.internalCode} - ${ticketChecklistTemplate.name}` : ''
          }
          titleTypographyProps={{ variant: 'h2' }}
          action={
            <CardActions
              readonly={readonly}
              onCancel={handleCancel}
              onDelete={
                canDelete
                  ? handleDelete('ticket_checklist_template', DeleteTicketChecklistTemplateDocument, onDelete)
                  : undefined
              }
              onEdit={canUpdate ? handleEdit : undefined}
              onExport={canRead ? handleExport(ExportTicketChecklistTemplatesDocument) : undefined}
            />
          }
        />
        <CardContent>
          <Tabs
            {...tabsLocation}
            tabs={[
              {
                label: 'ticket_checklist_template.tab.general_data',
                children: ticketChecklistTemplate && (
                  <TicketChecklistTemplateGeneralData
                    control={control}
                    errors={errors}
                    readonly={readonly}
                    setValue={setValue}
                  />
                ),
                error:
                  !readonly &&
                  isSubmitted &&
                  ticketChecklistTemplate &&
                  !getTicketChecklistTemplateGeneralDataSchema(canUseInternalCode, t).isValidSync(
                    ticketChecklistTemplate,
                  ),
              },
              {
                label: 'ticket_checklist_template.tab.costs',
                children: ticketChecklistTemplate && (
                  <TicketChecklistTemplateCosts control={control} errors={errors} readonly={readonly} />
                ),
                error:
                  !readonly &&
                  isSubmitted &&
                  ticketChecklistTemplate &&
                  !getTicketChecklistTemplateCostsSchema(t).isValidSync(ticketChecklistTemplate),
              },
              ...((ticketChecklistTemplate?.ticketChecklistTemplateType &&
              [
                TicketChecklistTemplateType.Preventative,
                TicketChecklistTemplateType.PreventativeAndOnTriggerCondition,
              ].includes(ticketChecklistTemplate.ticketChecklistTemplateType)
                ? [
                    {
                      label: 'ticket_checklist_template.tab.preventative_maintenance',
                      children: (
                        <TicketChecklistTemplatePreventativeMaintenance
                          control={control}
                          errors={errors}
                          mode={FormMode.Edit}
                          readonly={readonly}
                          setValue={setValue}
                        />
                      ),
                      error:
                        !readonly &&
                        isSubmitted &&
                        !getTicketChecklistTemplatePreventativeMaintenanceSchema(t).isValidSync(
                          ticketChecklistTemplate,
                        ),
                    },
                  ]
                : []) as Tab[]),
              ...((ticketChecklistTemplate?.ticketChecklistTemplateType &&
              [
                TicketChecklistTemplateType.OnTriggerCondition,
                TicketChecklistTemplateType.PreventativeAndOnTriggerCondition,
              ].includes(ticketChecklistTemplate.ticketChecklistTemplateType)
                ? [
                    {
                      label: 'ticket_checklist_template.tab.on_condition_maintenance',
                      children: (
                        <TicketChecklistTemplateOnConditionMaintenance
                          control={control}
                          errors={errors}
                          mode={FormMode.Edit}
                          readonly={readonly}
                        />
                      ),
                      error:
                        !readonly &&
                        isSubmitted &&
                        !getTicketChecklistTemplateOnConditionMaintenanceSchema(t).isValidSync(ticketChecklistTemplate),
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
