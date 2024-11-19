import { TicketFormInput } from '../../../../interfaces/FormInputs/Ticket';

export interface TicketCatalogueItemsStepProps {
  ticket: TicketFormInput;
  onBack: () => void;
  onChange: (ticket: TicketFormInput) => void;
  onError: (message?: string) => void;
  onNext: () => void;
}
