import { TicketChecklistsFormInput } from '../../../../interfaces/FormInputs/TicketChecklist';

export interface TicketChecklistsRecapStepProps {
  ticketChecklists: TicketChecklistsFormInput;
  onBack: () => void;
  onSave: (ticketChecklists: TicketChecklistsFormInput) => void;
}
