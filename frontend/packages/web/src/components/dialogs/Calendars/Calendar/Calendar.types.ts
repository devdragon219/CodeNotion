import { CalendarFragment } from '../../../../gql/RealGimm.Web.Calendar.fragment';

export interface CalendarAccordionProps {
  calendar: CalendarFragment;
  readonly?: boolean;
  onDuplicate: (calendar: CalendarFragment) => void;
  onEdit: (calendar: CalendarFragment) => void;
}
