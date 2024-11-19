import { CalendarFormInput } from '../../../interfaces/FormInputs/Calendar';

export interface CalendarDialogProps {
  input?: CalendarFormInput;
  readonly?: boolean;
  onClose: () => void;
  onSave: (value: CalendarFormInput) => void;
}
