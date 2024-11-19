import { Control, FieldErrors } from 'react-hook-form';

import { CalendarFormInput } from '../../../../interfaces/FormInputs/Calendar';

export interface HolidayFieldProps {
  control: Control<CalendarFormInput>;
  errors: FieldErrors<CalendarFormInput>;
  index: number;
  readonly?: boolean;
}
