import { TicketFormInput } from '../../../../interfaces/FormInputs/Ticket';

export interface TicketGeneralDataStepProps {
  canUseInternalCode: boolean;
  ticket: TicketFormInput;
  onBack: () => void;
  onChange: (estate: TicketFormInput) => void;
  onError: () => void;
  onNext: () => void;
}
