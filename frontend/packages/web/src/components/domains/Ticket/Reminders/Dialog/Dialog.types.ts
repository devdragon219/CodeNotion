import { TicketReminderFormInput } from '../../../../../interfaces/FormInputs/Ticket';

export interface ReminderDialogInput {
  reminder: TicketReminderFormInput;
  index: number;
}

export interface ReminderDialogProps {
  input?: ReminderDialogInput;
  onClose: () => void;
  onSave: (value: TicketReminderFormInput | ReminderDialogInput) => void;
}
