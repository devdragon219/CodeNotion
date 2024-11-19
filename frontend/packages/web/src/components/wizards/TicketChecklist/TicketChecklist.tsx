import { CloseDialog, Dialog, Stepper } from '@realgimm5/frontend-common/components';
import { useStepper } from '@realgimm5/frontend-common/hooks';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { getEmptyTicketChecklistsFormInput } from '../../../utils/ticketChecklist/initialValues';
import { getTicketChecklistsSchema } from '../../../utils/ticketChecklist/schemas/ticketChecklists';
import { TicketChecklistsEstateUnitsStep } from './EstateUnits/EstateUnits';
import { TicketChecklistsRecapStep } from './Recap/Recap';
import { TicketChecklistCreateDialogProps } from './TicketChecklist.types';
import { TicketChecklistsTicketChecklistTemplatesStep } from './TicketChecklistTemplates/TicketChecklistTemplates';

export const TicketChecklistCreateDialog = ({ estateUnits, onClose, onSave }: TicketChecklistCreateDialogProps) => {
  const { t } = useTranslation();
  const { activeStep, error, handleBack, handleError, handleNext } = useStepper();
  const [isCloseConfirmationDialogOpen, setCloseConfirmationDialogOpen] = useState(false);
  const [ticketChecklists, setTicketChecklists] = useState(getEmptyTicketChecklistsFormInput());

  const canSave = useMemo(() => getTicketChecklistsSchema(t).isValidSync(ticketChecklists), [t, ticketChecklists]);

  const openCloseConfirmationDialog = useCallback(() => {
    setCloseConfirmationDialogOpen(true);
  }, []);
  const closeCloseConfirmationDialog = useCallback(() => {
    setCloseConfirmationDialogOpen(false);
  }, []);

  const handleWorkingClose = useCallback(() => {
    onSave(ticketChecklists);
  }, [ticketChecklists, onSave]);
  const handleDestructiveClose = useCallback(() => {
    onClose();
  }, [onClose]);

  return isCloseConfirmationDialogOpen ? (
    <CloseDialog
      canSave={canSave}
      onCancel={closeCloseConfirmationDialog}
      onSave={handleWorkingClose}
      onClose={handleDestructiveClose}
    />
  ) : (
    <Dialog fullScreen open title="ticket_checklist.dialog.create.title" onClose={openCloseConfirmationDialog}>
      <Stepper
        activeStep={activeStep}
        error={error}
        steps={[
          {
            label: 'ticket_checklist.tab.estate_units',
            children: (
              <TicketChecklistsEstateUnitsStep
                estateUnits={estateUnits}
                ticketChecklists={ticketChecklists}
                onChange={setTicketChecklists}
                onError={handleError}
                onNext={handleNext}
              />
            ),
          },
          {
            label: 'ticket_checklist.tab.ticket_checklist_templates',
            children: (
              <TicketChecklistsTicketChecklistTemplatesStep
                ticketChecklists={ticketChecklists}
                onBack={handleBack}
                onChange={setTicketChecklists}
                onError={handleError}
                onNext={handleNext}
              />
            ),
          },
          {
            label: 'ticket_checklist.tab.recap',
            children: (
              <TicketChecklistsRecapStep ticketChecklists={ticketChecklists} onBack={handleBack} onSave={onSave} />
            ),
          },
        ]}
      />
    </Dialog>
  );
};
