import { TicketFormInput } from '../../../../interfaces/FormInputs/Ticket';

export interface TicketRecapStepProps {
  ticket: TicketFormInput;
  onBack: () => void;
  onEdit: (step: number) => void;
  onSave: (ticket: TicketFormInput) => void;
}
