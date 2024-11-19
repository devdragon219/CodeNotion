import { TicketFormInput } from '../../../../interfaces/FormInputs/Ticket';

export interface TicketDocumentsStepProps {
  ticket: TicketFormInput;
  onBack: () => void;
  onChange: (ticket: TicketFormInput) => void;
  onError: () => void;
  onNext: () => void;
}
