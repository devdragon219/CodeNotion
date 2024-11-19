import { DayOfWeek } from '@realgimm5/frontend-common/gql/types';
import { Control, FieldErrors } from 'react-hook-form';

import { CalendarFormInput } from '../../../../interfaces/FormInputs/Calendar';

export interface DayFieldProps {
  control: Control<CalendarFormInput>;
  dayOfWeek: DayOfWeek;
  errors: FieldErrors<CalendarFormInput>;
  readonly?: boolean;
}
