import { CloseDialog, Dialog, Stepper, Tab } from '@realgimm5/frontend-common/components';
import { TableProvider } from '@realgimm5/frontend-common/contexts';
import { TicketChecklistTemplateType } from '@realgimm5/frontend-common/gql/types';
import { useDebounce, useStepper } from '@realgimm5/frontend-common/hooks';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useTicketChecklistTemplate } from '../../../hooks/useTicketChecklistTemplate';
import { getEmptyTicketChecklistTemplateFormInput } from '../../../utils/ticketChecklistTemplate/initialValues';
import { getTicketChecklistTemplateSchema } from '../../../utils/ticketChecklistTemplate/schemas/ticketChecklistTemplate';
import { TicketChecklistTemplateCostsStep } from './Costs/Costs';
import { TicketChecklistTemplateGeneralDataStep } from './GeneralData/GeneralData';
import { TicketChecklistTemplateOnConditionMaintenanceStep } from './OnConditionMaintenance/OnConditionMaintenance';
import { TicketChecklistTemplatePreventativeMaintenanceStep } from './PreventativeMaintenance/PreventativeMaintenance';
import { TicketChecklistTemplateRecapStep } from './Recap/Recap';
import { TicketChecklistTemplateCreateDialogProps } from './TicketChecklistTemplate.types';

export const TicketChecklistTemplateCreateDialog = ({
  ticketChecklistTemplateType,
  onClose,
  onSave,
}: TicketChecklistTemplateCreateDialogProps) => {
  const { t } = useTranslation();
  const { activeStep, error, handleBack, handleEdit, handleError, handleNext } = useStepper();
  const { checkCanUseInternalCode } = useTicketChecklistTemplate();
  const [isCloseConfirmationDialogOpen, setCloseConfirmationDialogOpen] = useState(false);
  const [ticketChecklistTemplate, setTicketChecklistTemplate] = useState(
    getEmptyTicketChecklistTemplateFormInput(ticketChecklistTemplateType),
  );
  const debouncedTicketChecklistTemplate = useDebounce(ticketChecklistTemplate);
  const [canUseInternalCode, setCanUseInternalCode] = useState(true);

  useEffect(() => {
    checkCanUseInternalCode(
      debouncedTicketChecklistTemplate.internalCode,
      debouncedTicketChecklistTemplate.ticketChecklistTemplateId,
      setCanUseInternalCode,
    );
    // eslint-disable-next-line
  }, [debouncedTicketChecklistTemplate.internalCode, debouncedTicketChecklistTemplate.ticketChecklistTemplateId]);

  const canSave = useMemo(
    () =>
      getTicketChecklistTemplateSchema(canUseInternalCode, t, ticketChecklistTemplateType).isValidSync(
        ticketChecklistTemplate,
      ),
    [canUseInternalCode, t, ticketChecklistTemplate, ticketChecklistTemplateType],
  );

  const openCloseConfirmationDialog = useCallback(() => {
    setCloseConfirmationDialogOpen(true);
  }, []);
  const closeCloseConfirmationDialog = useCallback(() => {
    setCloseConfirmationDialogOpen(false);
  }, []);

  const handleWorkingClose = useCallback(() => {
    onSave(ticketChecklistTemplate);
  }, [ticketChecklistTemplate, onSave]);
  const handleDestructiveClose = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <TableProvider
      key="catalogue-types"
      initialState={{
        sorting: [
          {
            desc: false,
            id: 'internalCode',
          },
        ],
      }}
    >
      {isCloseConfirmationDialogOpen ? (
        <CloseDialog
          canSave={canSave}
          onCancel={closeCloseConfirmationDialog}
          onSave={handleWorkingClose}
          onClose={handleDestructiveClose}
        />
      ) : (
        <Dialog
          fullScreen
          open
          title="ticket_checklist_template.dialog.create.title"
          onClose={openCloseConfirmationDialog}
        >
          <Stepper
            activeStep={activeStep}
            error={error}
            steps={[
              {
                label: 'ticket_checklist_template.tab.general_data',
                children: (
                  <TicketChecklistTemplateGeneralDataStep
                    canUseInternalCode={canUseInternalCode}
                    ticketChecklistTemplate={ticketChecklistTemplate}
                    onChange={setTicketChecklistTemplate}
                    onError={handleError}
                    onNext={handleNext}
                  />
                ),
              },
              {
                label: 'ticket_checklist_template.tab.costs',
                children: (
                  <TicketChecklistTemplateCostsStep
                    ticketChecklistTemplate={ticketChecklistTemplate}
                    onBack={handleBack}
                    onChange={setTicketChecklistTemplate}
                    onError={handleError}
                    onNext={handleNext}
                  />
                ),
              },
              ...(([
                TicketChecklistTemplateType.Preventative,
                TicketChecklistTemplateType.PreventativeAndOnTriggerCondition,
              ].includes(ticketChecklistTemplateType)
                ? [
                    {
                      label: 'ticket_checklist_template.tab.preventative_maintenance',
                      children: (
                        <TicketChecklistTemplatePreventativeMaintenanceStep
                          ticketChecklistTemplate={ticketChecklistTemplate}
                          onBack={handleBack}
                          onChange={setTicketChecklistTemplate}
                          onError={handleError}
                          onNext={handleNext}
                        />
                      ),
                    },
                  ]
                : []) as Tab[]),
              ...(([
                TicketChecklistTemplateType.OnTriggerCondition,
                TicketChecklistTemplateType.PreventativeAndOnTriggerCondition,
              ].includes(ticketChecklistTemplateType)
                ? [
                    {
                      label: 'ticket_checklist_template.tab.on_condition_maintenance',
                      children: (
                        <TicketChecklistTemplateOnConditionMaintenanceStep
                          ticketChecklistTemplate={ticketChecklistTemplate}
                          onBack={handleBack}
                          onChange={setTicketChecklistTemplate}
                          onError={handleError}
                          onNext={handleNext}
                        />
                      ),
                    },
                  ]
                : []) as Tab[]),
              {
                label: 'ticket_checklist_template.tab.recap',
                children: (
                  <TicketChecklistTemplateRecapStep
                    ticketChecklistTemplate={ticketChecklistTemplate}
                    onBack={handleBack}
                    onEdit={handleEdit}
                    onSave={onSave}
                  />
                ),
              },
            ]}
          />
        </Dialog>
      )}
    </TableProvider>
  );
};
