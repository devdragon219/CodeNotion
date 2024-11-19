import { CloseDialog, Dialog, Stepper, Tab } from '@realgimm5/frontend-common/components';
import { TableProvider } from '@realgimm5/frontend-common/contexts';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { TicketMainType } from '@realgimm5/frontend-common/gql/types';
import { useDebounce, useStepper } from '@realgimm5/frontend-common/hooks';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useTicket } from '../../../hooks/useTicket';
import { getEmptyTicketFormInput } from '../../../utils/ticket/initialValues';
import { getTicketSchema } from '../../../utils/ticket/schemas/ticket';
import { TicketCatalogueItemsStep } from './CatalogueItems/CatalogueItems';
import { TicketDocumentsStep } from './Documents/Documents';
import { TicketEstateUnitStep } from './EstateUnit/EstateUnit';
import { TicketFacilityContractStep } from './FacilityContract/FacilityContract';
import { TicketGeneralDataStep } from './GeneralData/GeneralData';
import { TicketRecapStep } from './Recap/Recap';
import { TicketCreateDialogProps } from './Ticket.types';
import { TicketTicketChecklistStep } from './TicketChecklist/TicketChecklist';

export const TicketCreateDialog = ({ mainType, onClose, onSave }: TicketCreateDialogProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const { activeStep, error, handleBack, handleEdit, handleError, handleNext } = useStepper();
  const { checkCanUseInternalCode } = useTicket();
  const [isCloseConfirmationDialogOpen, setCloseConfirmationDialogOpen] = useState(false);
  const [ticket, setTicket] = useState(getEmptyTicketFormInput(mainType));
  const debouncedTicket = useDebounce(ticket);
  const [canUseInternalCode, setCanUseInternalCode] = useState(true);

  useEffect(() => {
    checkCanUseInternalCode(debouncedTicket.internalCode, debouncedTicket.ticketId, setCanUseInternalCode);
    // eslint-disable-next-line
  }, [debouncedTicket.internalCode, debouncedTicket.ticketId]);

  const canSave = useMemo(
    () => getTicketSchema(canUseInternalCode, language, FormMode.Create, t).isValidSync(ticket),
    [canUseInternalCode, ticket, language, t],
  );

  const openCloseConfirmationDialog = useCallback(() => {
    setCloseConfirmationDialogOpen(true);
  }, []);
  const closeCloseConfirmationDialog = useCallback(() => {
    setCloseConfirmationDialogOpen(false);
  }, []);

  const handleWorkingClose = useCallback(() => {
    onSave(ticket);
  }, [ticket, onSave]);
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
    <Dialog fullScreen open title={`ticket.dialog.create.title.${mainType}`} onClose={openCloseConfirmationDialog}>
      <Stepper
        activeStep={activeStep}
        error={error}
        steps={[
          ...((mainType === TicketMainType.ChecklistOnTriggerCondition
            ? [
                {
                  label: 'ticket.tab.facility_contract',
                  children: (
                    <TableProvider
                      key="facility-contracts"
                      initialState={{
                        sorting: [
                          {
                            desc: false,
                            id: 'internalCode',
                          },
                        ],
                      }}
                    >
                      <TicketFacilityContractStep
                        ticket={ticket}
                        onChange={setTicket}
                        onError={handleError}
                        onNext={handleNext}
                      />
                    </TableProvider>
                  ),
                },
              ]
            : []) as Tab[]),
          {
            label: 'ticket.tab.estate_unit',
            children: (
              <TableProvider
                key="estate-units"
                initialState={{
                  sorting: [
                    {
                      desc: false,
                      id: 'internalCode',
                    },
                  ],
                }}
              >
                <TicketEstateUnitStep
                  ticket={ticket}
                  onBack={mainType === TicketMainType.ChecklistOnTriggerCondition ? handleBack : undefined}
                  onChange={setTicket}
                  onError={handleError}
                  onNext={handleNext}
                />
              </TableProvider>
            ),
          },
          ...((mainType === TicketMainType.ChecklistOnTriggerCondition
            ? [
                {
                  label: 'ticket.tab.ticket_checklist',
                  children: (
                    <TableProvider
                      key="ticket-checklists"
                      initialState={{
                        sorting: [
                          {
                            desc: false,
                            id: 'internalCode',
                          },
                        ],
                      }}
                    >
                      <TicketTicketChecklistStep
                        ticket={ticket}
                        onBack={handleBack}
                        onChange={setTicket}
                        onError={handleError}
                        onNext={handleNext}
                      />
                    </TableProvider>
                  ),
                },
                {
                  label: 'ticket.tab.catalogue_items',
                  children: (
                    <TicketCatalogueItemsStep
                      ticket={ticket}
                      onBack={handleBack}
                      onChange={setTicket}
                      onError={handleError}
                      onNext={handleNext}
                    />
                  ),
                },
              ]
            : [
                {
                  label: 'ticket.tab.general_data',
                  children: (
                    <TicketGeneralDataStep
                      canUseInternalCode={canUseInternalCode}
                      ticket={ticket}
                      onBack={handleBack}
                      onChange={setTicket}
                      onError={handleError}
                      onNext={handleNext}
                    />
                  ),
                },
              ]) as Tab[]),
          {
            label: 'ticket.tab.documents',
            children: (
              <TicketDocumentsStep
                ticket={ticket}
                onBack={handleBack}
                onChange={setTicket}
                onError={handleError}
                onNext={handleNext}
              />
            ),
          },
          {
            label: 'ticket.tab.recap',
            children: <TicketRecapStep ticket={ticket} onBack={handleBack} onEdit={handleEdit} onSave={onSave} />,
          },
        ]}
      />
    </Dialog>
  );
};
