import { TicketChecklistsFormInput } from '../../../../interfaces/FormInputs/TicketChecklist';

export interface TicketChecklistsTicketChecklistTemplatesStepProps {
  ticketChecklists: TicketChecklistsFormInput;
  onBack: () => void;
  onChange: (ticketChecklists: TicketChecklistsFormInput) => void;
  onError: (error?: boolean | string) => void;
  onNext: () => void;
}
