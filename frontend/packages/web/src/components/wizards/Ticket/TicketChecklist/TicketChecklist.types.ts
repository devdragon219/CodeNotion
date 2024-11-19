import { TicketFormInput } from '../../../../interfaces/FormInputs/Ticket';

export interface TicketTicketChecklistStepProps {
  ticket: TicketFormInput;
  onBack: () => void;
  onChange: (ticket: TicketFormInput) => void;
  onError: (message?: string) => void;
  onNext: () => void;
}
