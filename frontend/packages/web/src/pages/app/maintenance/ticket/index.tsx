import { yupResolver } from '@hookform/resolvers/yup';
import { ChevronLeft, Warning } from '@mui/icons-material';
import { Box, Button, Card, CardContent, CardHeader } from '@mui/material';
import {
  BlockerDialog,
  CardActions,
  ConfirmationDialog,
  Form,
  Loader,
  Tab,
  Tabs,
} from '@realgimm5/frontend-common/components';
import { useOperation, useSnackbar } from '@realgimm5/frontend-common/contexts';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { TicketMainType } from '@realgimm5/frontend-common/gql/types';
import { useDebounce, useNavigateBack, useTabsLocation } from '@realgimm5/frontend-common/hooks';
import { StateLocation } from '@realgimm5/frontend-common/interfaces';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';
import { OperationResult, useClient } from 'urql';

import { TicketDocuments } from '../../../../components/domains/Ticket/Documents/Documents';
import { TicketGeneralData } from '../../../../components/domains/Ticket/GeneralData/GeneralData';
import { TicketHistory } from '../../../../components/domains/Ticket/History/History';
import { TicketPerformedActivities } from '../../../../components/domains/Ticket/PerformedActivities/PerformedActivities';
import { TicketQuote } from '../../../../components/domains/Ticket/Quote/Quote';
import { TicketReminders } from '../../../../components/domains/Ticket/Reminders/Reminders';
import { TicketReplies } from '../../../../components/domains/Ticket/Replies/Replies';
import { TicketResolution } from '../../../../components/domains/Ticket/Resolution/Resolution';
import { TicketActions } from '../../../../components/domains/TicketActions/TicketActions';
import { RawFeature } from '../../../../enums/RawFeature';
import {
  DeleteTicketDocument,
  ExportTicketsDocument,
  GetTicketDocument,
  GetTicketQuery,
  useConvertTicketToExcludedFromMaintenanceContractMutation,
  useUpdateTicketMutation,
} from '../../../../gql/RealGimm.Web.Ticket.operation';
import { useFeature } from '../../../../hooks/useFeature';
import { useTicket } from '../../../../hooks/useTicket';
import { TicketFormInput } from '../../../../interfaces/FormInputs/Ticket';
import { parseTicketFormInputToTicketInput } from '../../../../utils/ticket/parseTicketFormInput';
import { parseTicketToTicketFormInput } from '../../../../utils/ticket/parseTicketFragment';
import { getTicketDocumentsAndImagesSchema } from '../../../../utils/ticket/schemas/documents';
import { getTicketGeneralDataSchema } from '../../../../utils/ticket/schemas/generalData';
import { getTicketQuoteSchema } from '../../../../utils/ticket/schemas/quote';
import { getTicketRemindersSchema } from '../../../../utils/ticket/schemas/reminders';
import { getTicketResolutionSchema } from '../../../../utils/ticket/schemas/resolution';
import { getTicketSchema } from '../../../../utils/ticket/schemas/ticket';

export default function Ticket() {
  const { canDelete, canRead, canUpdate } = useFeature(RawFeature.FCLT_TICKET);
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const { id, type } = useParams();
  const { handleDelete, handleExport } = useOperation();
  const { state } = useLocation() as StateLocation;
  const { showError, showSnackbar } = useSnackbar();
  const tabsLocation = useTabsLocation();
  const client = useClient();
  const goBack = useNavigateBack(
    [`/app/maintenance/tickets${type ? '-timetable' : ''}`, type].filter((it) => !!it).join('/'),
  );
  const { checkCanUseInternalCode } = useTicket();
  const [loading, setLoading] = useState(false);
  const [isConvertTicketConfirmationDialogOpen, setConvertTicketConfirmationDialogOpen] = useState(false);
  const [, convertTicketToExcludedFromMaintenanceContractMutation] =
    useConvertTicketToExcludedFromMaintenanceContractMutation();
  const [readonly, setReadonly] = useState(state?.readonly ?? true);
  const [, updateTicketMutation] = useUpdateTicketMutation();
  const [ticket, setTicket] = useState<TicketFormInput>();
  const debouncedTicket = useDebounce(ticket);
  const [canUseInternalCode, setCanUseInternalCode] = useState(true);
  const [isSubmitSuccessful, setSubmitSuccessful] = useState(false);

  const isChecklist = useMemo(
    () =>
      ticket?.mainType === TicketMainType.ChecklistOnTriggerCondition ||
      ticket?.mainType === TicketMainType.ChecklistPreventative,
    [ticket?.mainType],
  );

  const fetchTicket = useCallback(async () => {
    setLoading(true);
    const result: OperationResult<GetTicketQuery> = await client.query(GetTicketDocument, {
      ticketId: Number(id),
    });
    setLoading(false);
    if (!result.data?.ticket.get) return Promise.reject();
    return parseTicketToTicketFormInput(result.data.ticket.get);
  }, [id, client]);

  const {
    control,
    formState: { isValid: canSave, errors, isSubmitted },
    handleSubmit,
    reset,
    setValue,
    watch,
    getValues,
  } = useForm<TicketFormInput>({
    defaultValues: fetchTicket,
    resolver: ticket ? yupResolver(getTicketSchema(canUseInternalCode, language, FormMode.Edit, t)) : undefined,
  });

  useEffect(() => {
    if (debouncedTicket) {
      checkCanUseInternalCode(debouncedTicket.internalCode, debouncedTicket.ticketId, setCanUseInternalCode);
    }
    // eslint-disable-next-line
  }, [debouncedTicket?.internalCode, debouncedTicket?.ticketId]);

  useEffect(() => {
    window.history.replaceState(null, document.title);
    const { unsubscribe } = watch((formValues) => {
      setTicket(formValues as TicketFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(ticket);
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
    async (ticket: TicketFormInput) => {
      setLoading(true);
      const result = await updateTicketMutation({
        ticketId: Number(ticket.ticketId),
        input: parseTicketFormInputToTicketInput(ticket, FormMode.Edit),
      });
      setLoading(false);
      if (result.data?.ticket.update.isSuccess) {
        showSnackbar(t('ticket.feedback.update'), 'success');
        setReadonly(true);
        const updatedTicket = await fetchTicket();
        setTicket(updatedTicket);
        setSubmitSuccessful(true);
        return Promise.resolve();
      } else {
        showError(result.data?.ticket.update.validationErrors);
        return Promise.reject();
      }
    },
    [updateTicketMutation, showSnackbar, t, fetchTicket, showError],
  );

  const handleWorkingClose = useCallback(() => {
    const values = getValues();
    return onSubmit(values);
  }, [onSubmit, getValues]);

  const onDelete = useCallback(() => {
    setReadonly(true);
    goBack();
  }, [goBack]);

  const handleOpenConvertTicketConfirmationDialog = useCallback(() => {
    setConvertTicketConfirmationDialogOpen(true);
  }, []);
  const handleCloseConvertTicketConfirmationDialog = useCallback(() => {
    setConvertTicketConfirmationDialogOpen(false);
  }, []);
  const handleConvertTicket = useCallback(async () => {
    setLoading(true);
    const result = await convertTicketToExcludedFromMaintenanceContractMutation({ ticketId: Number(id) });
    setLoading(false);
    if (result.data?.ticket.convertToExcludedFromMaintenanceContract.isSuccess) {
      showSnackbar(t('ticket.feedback.convert'), 'success');
      handleCloseConvertTicketConfirmationDialog();
      const updatedTicket = await fetchTicket();
      setTicket(updatedTicket);
      setSubmitSuccessful(true);
    } else {
      showError(result.data?.ticket.convertToExcludedFromMaintenanceContract.validationErrors);
    }
  }, [
    convertTicketToExcludedFromMaintenanceContractMutation,
    fetchTicket,
    handleCloseConvertTicketConfirmationDialog,
    id,
    showError,
    showSnackbar,
    t,
  ]);

  return (
    <Form noValidate onSubmit={handleSubmit(onSubmit)}>
      {loading && <Loader />}
      <ConfirmationDialog
        open={isConvertTicketConfirmationDialogOpen}
        onClose={handleCloseConvertTicketConfirmationDialog}
        type="alert"
        icon={Warning}
        title="ticket.dialog.convert.title"
        actions={
          <>
            <Button color="secondary" onClick={handleCloseConvertTicketConfirmationDialog}>
              {t('common.button.cancel')}
            </Button>
            <Button color="primary" variant="contained" onClick={handleConvertTicket}>
              {t('ticket.dialog.convert.action')}
            </Button>
          </>
        }
      />
      <Card>
        <Box sx={{ px: 1, pt: 2 }}>
          <Button color="secondary" variant="text" startIcon={<ChevronLeft />} onClick={goBack}>
            {t('common.button.back')}
          </Button>
        </Box>
        <CardHeader
          title={ticket?.internalCode}
          titleTypographyProps={{ variant: 'h2' }}
          action={
            <CardActions
              leftActions={
                readonly &&
                ticket &&
                !ticket.isExcludedFromMaintenanceContract && (
                  <TicketActions onConvert={handleOpenConvertTicketConfirmationDialog} />
                )
              }
              readonly={readonly}
              onCancel={handleCancel}
              onDelete={canDelete ? handleDelete('ticket', DeleteTicketDocument, onDelete) : undefined}
              onEdit={canUpdate ? handleEdit : undefined}
              onExport={canRead ? handleExport(ExportTicketsDocument) : undefined}
            />
          }
        />
        <CardContent>
          <Tabs
            {...tabsLocation}
            tabs={[
              {
                label: 'ticket.tab.general_data',
                children: ticket && (
                  <TicketGeneralData
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
                  ticket &&
                  !getTicketGeneralDataSchema(canUseInternalCode, language, FormMode.Edit, t).isValidSync(ticket),
              },
              ...((ticket?.isExcludedFromMaintenanceContract
                ? [
                    {
                      label: 'ticket.tab.quote',
                      children: <TicketQuote control={control} errors={errors} readonly={readonly} />,
                      error:
                        !readonly &&
                        isSubmitted &&
                        !getTicketQuoteSchema(language, FormMode.Edit, t).isValidSync(ticket),
                    },
                  ]
                : []) as Tab[]),
              {
                label: 'ticket.tab.reminders',
                children: ticket && <TicketReminders control={control} readonly={readonly} />,
                error: !readonly && isSubmitted && ticket && !getTicketRemindersSchema(language, t).isValidSync(ticket),
              },
              {
                label: `ticket.tab.${isChecklist ? 'checklist_' : ''}resolution`,
                children: ticket && <TicketResolution control={control} errors={errors} readonly={readonly} />,
                error:
                  !readonly && isSubmitted && ticket && !getTicketResolutionSchema(language, t).isValidSync(ticket),
              },
              ...((isChecklist
                ? [
                    {
                      label: 'ticket.tab.performed_activities',
                      children: <TicketPerformedActivities control={control} readonly={readonly} />,
                    },
                  ]
                : []) as Tab[]),
              {
                label: 'ticket.tab.replies',
                children: ticket && <TicketReplies control={control} readonly={readonly} />,
              },
              {
                label: 'ticket.tab.history',
                children: ticket && <TicketHistory history={ticket.history} readonly={readonly} />,
              },
              {
                label: 'ticket.tab.documents',
                children: ticket && (
                  <TicketDocuments control={control} errors={errors} mode={FormMode.Edit} readonly={readonly} />
                ),
                error:
                  !readonly &&
                  isSubmitted &&
                  ticket &&
                  !getTicketDocumentsAndImagesSchema(language, t).isValidSync(ticket),
              },
            ]}
          />
        </CardContent>
      </Card>
      <BlockerDialog isBlocked={!readonly} canSave={canSave} onSave={handleWorkingClose} />
    </Form>
  );
}
