import { TicketTypeFormInput } from '../../../interfaces/FormInputs/TicketType';

export interface TicketTypeDialogProps {
  input?: TicketTypeFormInput;
  readonly?: boolean;
  onClose: () => void;
  onSave: (value: TicketTypeFormInput) => void;
}
