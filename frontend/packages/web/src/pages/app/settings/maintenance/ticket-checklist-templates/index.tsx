import { Card, CardContent, CardHeader } from '@mui/material';
import { Loader, PrimaryTable } from '@realgimm5/frontend-common/components';
import { useSnackbar, useTable } from '@realgimm5/frontend-common/contexts';
import { TicketChecklistTemplateType } from '@realgimm5/frontend-common/gql/types';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { TicketChecklistTemplateCreateDialog } from '../../../../../components/wizards/TicketChecklistTemplate/TicketChecklistTemplate';
import { RawFeature } from '../../../../../enums/RawFeature';
import {
  DeleteTicketChecklistTemplatesDocument,
  ExportTicketChecklistTemplatesDocument,
  GetTicketChecklistTemplatesQueryVariables,
  useAddTicketChecklistTemplateMutation,
  useGetTicketChecklistTemplatesQuery,
} from '../../../../../gql/RealGimm.Web.TicketChecklistTemplate.operation';
import { useFeature } from '../../../../../hooks/useFeature';
import { TicketChecklistTemplateFormInput } from '../../../../../interfaces/FormInputs/TicketChecklistTemplate';
import { getTicketChecklistTemplatesColumns } from '../../../../../utils/ticketChecklistTemplate/getTicketChecklistTemplatesColumns';
import { parseTicketChecklistTemplateFormInputToTicketChecklistTemplateInput } from '../../../../../utils/ticketChecklistTemplate/parseTicketChecklistTemplateFormInput';

export default function TicketChecklistTemplates() {
  const { canCreate, canDelete, canUpdate, canRead } = useFeature(RawFeature.FCLT_CONFIG);
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
  } = useTable<GetTicketChecklistTemplatesQueryVariables>();
  const [queryState, reexecuteQuery] = useGetTicketChecklistTemplatesQuery({ pause, variables });
  const [, createTicketChecklistTemplateMutation] = useAddTicketChecklistTemplateMutation();
  const [loading, setLoading] = useState(false);
  const [createTicketChecklistTemplateDialogProps, setCreateTicketChecklistTemplateDialogProps] =
    useState<TicketChecklistTemplateType | null>(null);
  const ticketChecklistTemplates = useMemo(
    () => queryState.data?.ticketChecklistTemplate.listTicketChecklistTemplates,
    [queryState.data],
  );

  const handleOpenCreateTicketChecklistTemplateDialog = useCallback(
    (ticketChecklistTemplateType: TicketChecklistTemplateType) => () => {
      setCreateTicketChecklistTemplateDialogProps(ticketChecklistTemplateType);
    },
    [],
  );

  const handleCloseCreateTicketChecklistTemplateDialog = useCallback(() => {
    setCreateTicketChecklistTemplateDialogProps(null);
  }, []);
  const handleSaveCreateTicketChecklistTemplate = useCallback(
    async (ticketChecklistTemplate: TicketChecklistTemplateFormInput) => {
      setLoading(true);
      const result = await createTicketChecklistTemplateMutation({
        input: parseTicketChecklistTemplateFormInputToTicketChecklistTemplateInput(ticketChecklistTemplate),
      });
      setLoading(false);
      if (result.data?.ticketChecklistTemplate.add.isSuccess) {
        showSnackbar(t('ticket_checklist_template.feedback.create'), 'success');
        handleCloseCreateTicketChecklistTemplateDialog();
        reexecuteQuery();
      } else {
        showError(result.data?.ticketChecklistTemplate.add.validationErrors);
      }
    },
    [
      createTicketChecklistTemplateMutation,
      showSnackbar,
      t,
      handleCloseCreateTicketChecklistTemplateDialog,
      reexecuteQuery,
      showError,
    ],
  );

  return (
    <Card>
      {(queryState.fetching || loading) && <Loader />}
      <CardHeader title={t('ticket_checklist_template.title')} titleTypographyProps={{ variant: 'h1' }} />
      <CardContent>
        <PrimaryTable
          columns={getTicketChecklistTemplatesColumns(t)}
          empty="ticket_checklist_template.text.no_ticket_checklist_templates"
          initialState={initialState}
          rows={ticketChecklistTemplates?.nodes ?? []}
          totalCount={ticketChecklistTemplates?.totalCount ?? 0}
          getRowId={({ id }) => String(id)}
          onAdd={
            canCreate
              ? [
                  {
                    label: 'ticket_checklist_template.action.add_ticket_checklist_template_preventative',
                    onClick: handleOpenCreateTicketChecklistTemplateDialog(TicketChecklistTemplateType.Preventative),
                  },
                  {
                    label: 'ticket_checklist_template.action.add_ticket_checklist_template_on_condition',
                    onClick: handleOpenCreateTicketChecklistTemplateDialog(
                      TicketChecklistTemplateType.OnTriggerCondition,
                    ),
                  },
                  {
                    label:
                      'ticket_checklist_template.action.add_ticket_checklist_template_preventative_and_on_condition',
                    onClick: handleOpenCreateTicketChecklistTemplateDialog(
                      TicketChecklistTemplateType.PreventativeAndOnTriggerCondition,
                    ),
                  },
                ]
              : undefined
          }
          onDelete={
            canDelete
              ? handleDelete('ticket_checklist_template', DeleteTicketChecklistTemplatesDocument, reexecuteQuery)
              : undefined
          }
          onEdit={
            canUpdate
              ? (row) => {
                  navigate(`/app/settings/maintenance/ticket-checklist-templates/${row.id}`, {
                    state: { readonly: false },
                  });
                }
              : undefined
          }
          onExport={canRead ? handleExport('id', ExportTicketChecklistTemplatesDocument) : undefined}
          onFilter={handleFilter()}
          onPageChange={handlePageChange(ticketChecklistTemplates?.pageInfo)}
          onStateChange={setInitialState}
          onSort={handleSort()}
          onView={
            canRead
              ? (row) => {
                  navigate(`/app/settings/maintenance/ticket-checklist-templates/${row.id}`);
                }
              : undefined
          }
          useColumnVisibility={false}
        />
      </CardContent>
      {createTicketChecklistTemplateDialogProps && (
        <TicketChecklistTemplateCreateDialog
          ticketChecklistTemplateType={createTicketChecklistTemplateDialogProps}
          onClose={handleCloseCreateTicketChecklistTemplateDialog}
          onSave={handleSaveCreateTicketChecklistTemplate}
        />
      )}
    </Card>
  );
}
