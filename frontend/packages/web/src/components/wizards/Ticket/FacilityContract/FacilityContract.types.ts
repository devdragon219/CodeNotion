import { TicketFormInput } from '../../../../interfaces/FormInputs/Ticket';

export interface TicketFacilityContractStepProps {
  ticket: TicketFormInput;
  onChange: (ticket: TicketFormInput) => void;
  onError: (message?: string) => void;
  onNext: () => void;
}
